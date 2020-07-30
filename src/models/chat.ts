// type TMessageMediaType = 'IMAGE' | 'TEXT' | 'VIDEO' | 'AUDIO'


export default {
    namespace: 'chat',
    state: {
        simpleList: [],
        detailList: []
    },
    effects: {
        //断开连接
        * dissconecting() {},

        //消息详情
        * getMessageDetail(data: Array<any>, { call, put }) {
            yield put({ type: 'addData', payload: { detailList: data } })
        },

        //消息列表
        * getMessageList({data}, { call, put }) {
            yield put({ type: 'setData', payload: { simpleList: data } })
        },

        // //加入房间 | 创建房间
        // * joinOrCreateRoom(data: { type: keyof typeof RoomType, id: string, members: Array<string> }, { call }) {
        //     const token = getToken()
        // },

        // //退出房间
        // * leaveRoom({ id }, { call }) {
        //     const token = getToken()
        // },

        // //删除消息
        // * deleteMessage({ id }: { id: string }, { call }) {
        //     const token = getToken()
        // },

        // //读取消息
        // * readMessage({ id }: { id: string }, { call }) {
        //     const token = getToken()
        // },

        // //发送消息
        // * postMessage({ id, content, type, point_to }: { id: string, content: string, type: keyof typeof mediaType, point_to?: string }, { call }) {
        //     const token = getToken()
        //     if(!token) return
        //     socket.emit()
        // },

        // //删除聊天室
        // * deleteRoom({ _ }, { call, put }){
        //     yield put({ type: 'setData', payload: { detailList: [] } })
        // },

        // //退出聊天室
        // * quitRoom({ _ }, { call, put }){
        //     yield put({ type: 'setData', payload: { detailList: [] } })
        // }
    },
    reducers: {
        addData(state, { payload, data }) {
            return { ...state, [data] : [ ...state[data], ...payload[data] ] }
        },
        editData(state, { data, callback }) {
            const _data = callback(state[data])
            return { ...state, [data]: [ ..._data ] }
        },
        setData(state, { payload }) {
            return { ...state, ...payload }
        }
    }
}