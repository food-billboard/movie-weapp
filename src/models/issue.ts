import { pick } from 'lodash'
import {
  getActorList,
  getDirectorList,
  getDistrictList,
} from '~services'

export default {
  namespace: 'issue',
  state: {
    actor: [],
    director: [],
    district: [],
    selectActor: [],
    selectDirector: [],
    selectDistrict: []
  },
  effects: {

    //获取数据
    * fetchData(_, { call, put }) {
      const actor = yield call(getActorList)
      const director = yield call(getDirectorList)
      const district = yield call(getDistrictList)

      yield put({ type: "setData", payload: { actor, director, district } })
      
      return {
        actor,
        director,
        district,
      }

    },

    //获取导演
    * fetchActor(_, { call, put }) {
      const actor = yield call(getActorList)

      yield put({ type: "setData", payload: { actor } })
      return actor 
    },

    //获取导演
    * fetchDirector(_, { call, put }) {
      const director = yield call(getDirectorList)

      yield put({ type: "setData", payload: { director } })
      return director
    },

    //获取导演
    * fetchDistrict(_, { call, put }) {
      const district = yield call(getDistrictList)

      yield put({ type: "setData", payload: { district } })
      return district
    },

    * editDirector({ data }, { put }) {
      yield put({ type: 'setData', payload: { selectDirector: data } })
    },

    * editDistrict({ data }, { put }) {
      yield put({ type: 'setData', payload: { selectDistrict: data } })
    },

    * editActor({ data }, { put }) {
      yield put({ type: 'setData', payload: { selectActor: data } })
    },

    * initData({ actor=[], director=[], district=[] }={}, { put, select }) {
      const { actor: originActor, director: originDirector, district: originDistrict } = yield select(state => {
        return pick(state.issue, ["actor", "director", "district"])
      }) 
      let payload: any = {}
      if(actor) {
        const newActor = (actor as any).reduce((acc, cur) => {
          if(typeof cur === 'string') {
            const target = originActor.find(item => item._id == cur)
            if(target) acc.push(target)
          }else {
            const target = originActor.find(item => item._id == cur._id)
            acc.push({
              ...cur || {},
              ...target || {}
            })
          }
          return acc 
        }, [])
        payload.selectActor = newActor
      }
      if(director) {
        const newDirector = (director as any).reduce((acc, cur) => {
          if(typeof cur === 'string') {
            const target = originDirector.find(item => item._id == cur)
            if(target) acc.push(target)
          }else {
            const target = originDirector.find(item => item._id == cur._id)
            acc.push({
              ...cur || {},
              ...target || {}
            })
          }
          return acc 
        }, [])
        payload.selectDirector = newDirector
      }
      if(district) {
        const newDistrict = (district as any).reduce((acc, cur) => {
          if(typeof cur === 'string') {
            const target = originDistrict.find(item => item._id == cur)
            if(target) acc.push(target)
          }else {
            const target = originDistrict.find(item => item._id == cur._id)
            acc.push({
              ...cur || {},
              ...target || {}
            })
          }
          return acc 
        }, [])
        payload.selectDistrict = newDistrict
      }

      yield put({ type: 'setData', payload })
      return {
        actor: [],
        director: [],
        district: [],
        ...payload
      }
    },

  },
  reducers: {
    setData(state, { payload }) {
      return {...state, ...payload}
    }
  }
}