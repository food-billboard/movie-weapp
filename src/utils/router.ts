import invariant from 'invariant';
import qs from 'qs';
import pathToRegexp from './lib/path-to-regexp';
import { isType, size } from './tool';

const TYPES = {
  'BACK': 'navigateBack',
  'NAVIGATE_TO': 'navigateTo',
  'REDIRECT_TO': 'redirectTo',
  'RE_LAUNCH': 'reLaunch',
  'SWITCH_TAB': 'switchTab',
}

const ROUTE_RUNTIME = {
  route: null, path: null, alias: '', params: {}, query: {}, type: null
}

class Router {

  public taro: any
  public routes: any[]
  public beforeEach: any
  public afterEach: any
  public routesMap: IDictionary
  public log: any

  constructor(){
    this.routes = [];
    this.beforeEach = function(){ return true };
    this.afterEach = function(){};
  }

  /* 两个必传参数 */
  init(config, taro, log=false){

    // 验证
    invariant(isType(config, 'Object'), 'RouterConfig should be `Object`.');
    invariant(isType(taro, 'Object'), 'Taro should be `Taro`.');
    const { routes, beforeEach, afterEach } = config;

    invariant(isType(routes, 'Array'), 'RouterConfig.routes should be `Array`.');
    this.taro = taro;

    // routes
    this.routes = routes.map((route)=>{
      const ret = Object.assign({}, route);
      if( route.alias ){
        ret.re = pathToRegexp(route.alias);
        ret.tokens = pathToRegexp.parse(route.alias);
      }
      return ret;
    });

    // routersMap
    this.routesMap = {};
    this.routes.forEach((route)=>{
      this.routesMap[route.path] = route;
    });

    // 是否打印log
    this.log = log;

    // Hooks
    beforeEach && (this.beforeEach = beforeEach);
    afterEach && (this.afterEach = afterEach);
    // if( this.log ){
    //   console.log(this.routesMap);
    // }
  }

  // 跳转前
  hookBeforeEach = (to, from)=>{
    const beforeEach = this.beforeEach;
    if( isType(beforeEach, 'Function') ){
      const before = beforeEach(to, from);
      if( before.then ){
        return before;
      }
      return Promise.resolve(before);
    }
    return Promise.resolve(true);
  }

  // 能跳转
  hookAfterEach = (to, from) => {
    return this.afterEach(to, from);
  }

  /* 路由跳转 */
  async navigate ( type, { path, send={}, delta }: any){
    const { taro } = this;
    const toRoute: any = Object.assign({}, ROUTE_RUNTIME);
    const fromRoute = Object.assign({}, ROUTE_RUNTIME);
    const options: IDictionary = {};
    // 获取原始路由
    toRoute.route = this.getOriginPath(path);

    // 赋值当前页面的运行时状态
    Object.assign(fromRoute, this.getOptions() );

    // 参数
    let { params={}, ...query } = send;

    if( toRoute.route ){ // 存在路由
      const route = this.routesMap[toRoute.route];
      Object.assign( params, getParams(route, path) || {} );
      if( route.type === 'tabBar' && type === 'NAVIGATE_TO' ){ type = 'SWITCH_TAB'; }
    }else if( /^\//.test(path) ){ //不存在路由
      const pathOptions = getFullPathOptions(path);
      if( !pathOptions.route ) { return false };
      Object.assign(params, pathOptions.params);
      Object.assign(query, pathOptions.query);
      toRoute.route = pathOptions.route;
    }else if( ['BACK'].indexOf(type)<0 ) {
      console.warn('Please input path `/{path}`.');
      return false;
    }

    // 获取跳转方法
    let navigate = taro[ TYPES[type] ];

    switch(type){
      case 'NAVIGATE_TO' :
        Object.assign(toRoute, this.getToOptions(toRoute.route, query, params));
        options.url = toRoute.path;
        break;
      case 'SWITCH_TAB':
        Object.assign(toRoute, this.getToOptions(toRoute.route, query, params));
        options.url = toRoute.path;
        break;
      case 'REDIRECT_TO':
        Object.assign(toRoute, this.getToOptions(toRoute.route, query, params));
        options.url = toRoute.path;
        break;
      case 'BACK':
        Object.assign(toRoute, this.getPrevOptions());
        options.delta = delta;
        break;
      case 'RE_LAUNCH':
        Object.assign(toRoute, this.getToOptions(toRoute.route, query, params));
        options.url = toRoute.path;
        break;
      default:
        return;
    }

    // 调用 前置钩子
    if( !await this.hookBeforeEach(toRoute, fromRoute) ){
      console.warn('This router be reject.');
      return false;
    }

    // 调用后置钩子
    this.hookAfterEach(toRoute, fromRoute);
    if( this.log ){
      console.log(TYPES[type], options);
    }
    return navigate(options);
  }

  /* 路由前进 */
  push = (path, send?) => {
    return this.navigate('NAVIGATE_TO', { path, send });
  }

  /* 路由替换 */
  replace = (path, send? ) => {
    return this.navigate('REDIRECT_TO', { path, send });
  }

  /* 返回 */
  back = (delta?) => {
    return this.navigate('BACK', { delta });
  }

  /* 打开到应用的某个页面 */
  reload = (path, send?) => {
    return this.navigate('RE_LAUNCH', { path, send });
  }

  /* 获取当前路径 */
  getOriginPath (path: string){
    let originPath = false;
    this.routes.some((route)=>{
      const { re } = route;
      if( path === `/${route.path}` ){
        originPath = route.path;
        return true;
      }
      if( re && re.exec(path) ){
        originPath = route.path;
        return true;
      }
      return false;
    });
    return originPath;
  }

  /* 获取当前页面的参数信息 */
  getOptions( n=0 ){
    let ret = { params: {}, query: {}, type: null, alias: '', route: '', path: '' };
    const { taro } = this;
    const navigates = taro.getCurrentPages();
    if( navigates.length<=n ) return ret;
    const navigate = navigates[navigates.length-(n+1)];
    const { params, ...query } = qs.parse( getNavigatesQueryString(navigate.options || {}) );
    ret.params = params || {};
    ret.query = query;

    // 获取 路由器其他信息
    const route = navigate.route;
    const routeConfig = getRouteConfig(this.routesMap[route], params || {});

    const path = `/${getQueryPath(route, query, params)}`;

    Object.assign(ret, routeConfig, { route, path});
    return ret;
  }

  /* 获取下一个路由参数 */
  getToOptions(route, query = {}, params = {}){
    let ret = { params, query, type: null, alias: '', route: '', path: '' };
    const routeConfig = getRouteConfig(this.routesMap[route], params);
    const path = `/${getQueryPath(route, query, params)}`;
    Object.assign(ret, routeConfig, { route, path});
    return ret;
  }

  /* 获取上个页面的信息 */
  getPrevOptions(){
    return this.getOptions(1);
  }
}

// 获取路由的 params
function getParams (route, path){
  if( !route || !route.alias ) return null;

  const { re, tokens } = route;
  const keys = re.exec(path);
  if( !keys ) return null;

  const params = {};
  tokens.forEach((token, i)=>{
    if( i<=0 ){ return };
    params[ token.name ] = keys[i];
  });
  return params;
}

// 拼接 query
function getQueryPath(path, query, params){
  let ret = path;
  let queryStering
  if( size(query) && size(params) ){
    queryStering = Object.assign({}, query, {params});
  }else if( size(query) ){
    queryStering = query;
  }else if( size(params) ){
    queryStering = { params };
  }else if( !size(query) && !size(params) ){
    return ret;
  }
  ret += `?${qs.stringify(queryStering)}`;
  return ret;
}

// 获取 alias & type
function getRouteConfig (route, params = {}){
  const ret = { alias: '', type: null };
  if( !route ){ return ret; }
  ret.type = route.type || null;
  if( !route.alias ){ return ret; }
  const compile = pathToRegexp.compile(route.alias);
  ret.alias = compile(params);
  return ret;
}

// 根据路径获取 query & params
function getFullPathOptions (path){
  const ret = { route: null, query: {}, params: {} };
  const paths = path.split('?');
  const route = paths[0];
  const query = paths[1];
  if( !route ){ return ret; };
  ret.route = route.replace(/^\//, '');
  if( !query ){ return ret; };
  const { params, ...otherQuery } = qs.parse(query);
  ret.query = otherQuery || {};
  ret.params = params || {};
  return ret;
}

// 根据小程序的 options 获取url拼接
function getNavigatesQueryString (options){
  const keys: any = Object.keys(options);
  if( keys <=0 ) return '';
  let ret: any = []
  keys.map((key)=>{
    ret.push(`${key}=${options[key]}`)
  })
  return ret.join('&');
}

export default new Router();
