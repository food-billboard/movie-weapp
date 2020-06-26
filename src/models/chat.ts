        //临时获取新消息
        * _getnews({data}, {call, put}) {
          yield put({type: 'editData', data: 'news', callback: (news) => {
              return editNews(news, data)
          }})
      }, 


      //获取历史记录通知
      * getNews({id}, {call, put}) {
          
          yield put({type: 'editData', data: 'news', callback: (news) => {
              return editNews(news, d.data.data)
          }})
          return

          const news = yield call(getNews, id)
          yield put({type: 'setData', payload: {news: news}})
      },

      //发送消息
      * sendNews({data}, {call, put}) {
          //data可能是数组也可能是单个值

          const res = yield call(sendNews, data)
          return res
      },

      //删除通知
      * deleteNews({id, date}, {call, put}) {

          const res = yield call(deleteNews, id, date)
          return res
      },

      //阅读通知
      * readNews({id, date}, {call, put}) {
          let d = {
              success: true,
              data: {
                  res: 'success',
                  id: '消息id'
              }
          }
          yield put({type: 'editData', data: 'news', callback: (news) => {
              const list = [...news]
              const index = findIndex(list, (val: any) => {
                  const { id: user } = val
                  return id === user
              })
              if(index < 0) return news
              
              list[index]['list'].map((val: any) => {
                  const { time } = val
                  // if(time < date) {
                      val.read = true
                  // }
              })
              return list
          }})
          return d.data

          const res = yield call(readNews, id, date)
          return res
      },

      //通知详情
      * getNewsDetail({query}, {call, put}) {
          const response = yield call(getNewsDetail, query)
          return response
      },

      addData(state, { payload, data }) {
        return { ...state, [data] : [ ...state[data], ...payload[data] ] }
    },

    editData(state, { data, callback }) {
        const _data = callback(state[data])
        return { ...state, [data]: [ ..._data ] }
    }