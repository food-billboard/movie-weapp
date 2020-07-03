//引入model
const models = [
    require('./chat.ts').default,
    require('./customer').default,
    require('./upload').default,
    require('./global').default
]

export default (app, others = []) => {
    const _models = Object.assign([], models, others)
    _models.forEach(model => {
        //model挂载
        app.model(model)
    })
}