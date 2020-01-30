//引入model
const models = [
    require('./global').default,
    require('./movie').default,
    require('./user').default
]

export default (app, others = []) => {
    const _models = Object.assign([], models, others)
    _models.forEach(model => {
        //model挂载
        app.model(model)
    })
}