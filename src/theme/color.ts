import Taro from '@tarojs/taro';
import { styleChange, supportAndDeal } from '~utils';
import { createSystemInfo } from '~config';

const systemInfo = createSystemInfo();

const DAY = Symbol('day');
const NIGHT = Symbol('night');

export type TTypeColor = {
  primary: string
  secondary: string 
  disabled: string 
  thirdly: string 
  bgColor: string 
}

const color = {
  [DAY]: {
    //薄暮
    '#f5222d': {
      primary: '#f5222d',
      secondary: '#ff4d4f',
      disabled: '#ffccc7',
      thirdly: '#ff7875',
      bgColor: '#fff1f0',
    },

    //火山
    '#fa541c': {
      primary: '#fa541c',
      secondary: '#ff7a45',
      thirdly: '#ff9c6e',
      disabled: '#ffbb96',
      bgColor: '#fff2e8',
    },

    //日暮
    '#fa8c16': {
      primary: '#fa8c16',
      secondary: '#ffa940',
      thirdly: '#ffc069',
      disabled: '#ffe7ba',
      bgColor: '#fff7e6',
    },

    //金盏花
    '#faad14': {
      primary: '#faad14',
      secondary: '#ffc53d',
      thirdly: '#ffd666',
      disabled: '#fff1b8',
      bgColor: '#fffbe6',
    },

    //日出
    '#fadb14': {
      primary: '#fadb14',
      secondary: '#ffec3d',
      thirdly: '#fff566',
      disabled: '#ffffb8',
      bgColor: '#feffe6',
    },

    //青柠
    '#a0d911': {
      primary: '#a0d911',
      secondary: '#bae637',
      thirdly: '#d3f261',
      disabled: '#f4ffb8',
      bgColor: '#fcffe6',
    },

    //极光绿
    '#52c41a': {
      primary: '#52c41a',
      secondary: '#73d13d',
      thirdly: '#95de64',
      disabled: '#d9f7be',
      bgColor: '#f6ffed',
    },

    //明青
    '#13c2c2': {
      primary: '#13c2c2',
      secondary: '#36cfc9',
      thirdly: '#5cdbd3',
      disabled: '#b5f5ec',
      bgColor: '#e6fffb',
    },

    //拂晓蓝
    '#1890ff': {
      primary: '#1890ff',
      secondary: '#40a9ff',
      thirdly: '#69c0ff',
      disabled: '#bae7ff',
      bgColor: '#e6f7ff',
    },

    //极客蓝
    '#2f54eb': {
      primary: '#2f54eb',
      secondary: '#597ef7',
      thirdly: '#85a5ff',
      disabled: '#d6e4ff',
      bgColor: '#f0f5ff',
    },

    //酱紫
    '#722ed1': {
      primary: '#722ed1',
      secondary: '#9254de',
      thirdly: '#b37feb',
      disabled: '#efdbff',
      bgColor: '#f9f0ff',
    },

    //法式洋红
    '#eb2f96': {
      primary: '#eb2f96',
      secondary: '#f759ab',
      thirdly: '#ff85c0',
      disabled: '#ffd6e7',
      bgColor: '#fff0f6',
    },

    //中性
    '#262626': {
      primary: '#262626',
      secondary: '#8c8c8c',
      thirdly: '#bfbfbf',
      disabled: '#d9d9d9',
      bgColor: '#f5f5f5',
    },
  },
  [NIGHT]: {
    //薄暮
    '#f5222d': {
      primary: '#2a1215',
      secondary: '#431418',
      thirdly: '#58181c',
      disabled: '#791a1f',
      bgColor: '#a61d24',
    },

    //火山
    '#fa541c': {
      primary: '#2b1611',
      secondary: '#441d12',
      thirdly: '#592716',
      disabled: '#7c3118',
      bgColor: '#aa3e19',
    },

    //日暮
    '#fa8c16': {
      primary: '#2b1d11',
      secondary: '#442a11',
      thirdly: '#593815',
      disabled: '#7c4a15',
      bgColor: '#aa6215',
    },

    //金盏花
    '#faad14': {
      primary: '#2b2111',
      secondary: '#443111',
      thirdly: '#594214',
      disabled: '#7c5914',
      bgColor: '#aa7714',
    },

    //日出
    '#fadb14': {
      primary: '#2b2611',
      secondary: '#443b11',
      thirdly: '#595014',
      disabled: '#7c6e14',
      bgColor: '#aa9514',
    },

    //青柠
    '#a0d911': {
      primary: '#1f2611',
      secondary: '#2e3c10',
      thirdly: '#3e4f13',
      disabled: '#536d13',
      bgColor: '#6f9412',
    },

    //极光绿
    '#52c41a': {
      primary: '#162312',
      secondary: '#1d3712',
      thirdly: '#274916',
      disabled: '#306317',
      bgColor: '#3c8618',
    },

    //明青
    '#13c2c2': {
      primary: '#112123',
      secondary: '#113536',
      thirdly: '#144848',
      disabled: '#146262',
      bgColor: '#138585',
    },

    //拂晓蓝
    '#1890ff': {
      primary: '#111d2c',
      secondary: '#112a45',
      thirdly: '#15395b',
      disabled: '#164c7e',
      bgColor: '#1765ad',
    },

    //极客蓝
    '#2f54eb': {
      primary: '#131629',
      secondary: '#161d40',
      thirdly: '#1c2755',
      disabled: '#203175',
      bgColor: '#263ea0',
    },

    //酱紫
    '#722ed1': {
      primary: '#1a1325',
      secondary: '#24163a',
      thirdly: '#301c4d',
      disabled: '#3e2069',
      bgColor: '#51258f',
    },

    //法式洋红
    '#eb2f96': {
      primary: '#291321',
      secondary: '#40162f',
      thirdly: '#551c3b',
      disabled: '#75204f',
      bgColor: '#a02669',
    },

    //中性
    '#262626': {
      primary: '#262626',
      secondary: '#434343',
      thirdly: '#595959',
      disabled: '#bfbfbf',
      bgColor: '#d9d9d9',
    },
  },
};

/**
 * 色调类型
 * 薄暮 dust red
 * 火山 volcano
 * 日暮 sunset orange
 * 金盏花 calendula gold
 * 日出 sunrise yellow
 * 青柠 lime
 * 极光绿 polar green
 * 明青 cyan
 * 拂晓蓝 daybreak blue
 * 极客蓝 geek blue
 * 酱紫 golden purple
 * 法式洋红 magenta
 */
export const Color = Object.keys(color[DAY]);

//默认颜色
export const defaultColor = Object.keys(color[DAY])[0];

//小程序色调
let _TypeColor = color[DAY]['#f5222d'];

export function TypeColor() {
  return _TypeColor
}

//色调修改
export const colorChange = (
  status: boolean,
  styleColor: string,
  needUpdateStorage: boolean = false,
) => {
  if (needUpdateStorage) {
    if (status) {
      //色调开启
      let date = styleChange();
      if (date) {
        //日
        _TypeColor = { ..._TypeColor, ...color[DAY][styleColor] };
      } else {
        //夜
        _TypeColor = { ..._TypeColor, ...color[NIGHT][styleColor] };
      }
    } else {
      //色调关闭
      _TypeColor = { ..._TypeColor, ...color[DAY][styleColor] };
    }
    systemInfo.setColorStyle({
      style: !!status,
      color: styleColor,
    });
  }
  supportAndDeal("setBackgroundColor", {
    backgroundColor: _TypeColor['bgColor'],
    backgroundColorTop: _TypeColor['bgColor'],
    backgroundColorBottom: _TypeColor['bgColor'],
  })
  supportAndDeal("setNavigationBarColor", {
    frontColor: '#000000',
    backgroundColor: _TypeColor['bgColor'],
    animation: {
      duration: 400,
      timingFunc: 'easeIn',
    },
  })
  return _TypeColor;
};

//样式修改
export const colorStyleChange = (isTab = false) => {
  //查看缓存
  const value = systemInfo.getColorStyle();
  const { style, color: styleColor } = value;
  colorChange(style, styleColor, true);
  if (isTab) {
    Taro.setTabBarStyle({
      color: '#000000',
      selectedColor: '#ff6600',
      backgroundColor: _TypeColor['bgColor'],
      borderStyle: 'white',
    });
  }
};
