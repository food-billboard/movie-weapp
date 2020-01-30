import {
    getGoods,
    settleAccount,
    delGoods
} from '~services'

export default {
    namespace: 'cart',
    state: {
        goods: []
    },
    effects: {
        //获取购物车商品
        * getGoods({id}, {call, put}) {
            const goods = yield call(getGoods, id)
            yield put({type: 'setData', payload: {goods}})
        },

        //商品结算
        * settleAccount({list}, {call, put}) {
            yield call(settleAccount, list)
        },

        //删除商品
        * delGoods({query}, {call, put}) {
            yield call(delGoods, query)
        }
    }
}