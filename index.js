const generatePublic=require('./generators/generatePublic')
const {generateSrc}=require('./generators/generateSrc')
const Scenario=require('./virtual/Scenario')

generatePublic.generateHtmlRoot('frontend', 'this is a frontend')
generatePublic.generateRobots()

const s = new Scenario()

const {index, app} = generateSrc(s)

const Layout=s.createRouteComponent('Layout', {type:'layoutComponent', dependencies:[]})
const test2=s.createRouteComponent('Test2', {type:'routeComponent', dependencies:[]})
const test3=s.createRouteComponent('Test3', {type:'routeComponent', dependencies:[]})

const test4=s.createComponent('Test4', {})
s.addLocalDependency(app,test4)

s.addRouterTree(Layout)
s.addChildRoute(Layout,test2)
s.addChildRoute(Layout, test3)

s.buildRoutes()

const reducerOne= s.createReducer('ReducerOne')

s.feedReducer(reducerOne, 'user')
s.feedReducer(reducerOne, 'token')

const dialog = s.createReducer('dialog')

s.feedReducer(dialog , 'one')

s.index().logReducers()


//TODO:
//add navbar creation via routes 
//
//TODO:
//allow reducer to change its content:
//when feedReducer is called,
//one should A) append 
//function ${name}(state='', action){
// 	switch(action.type){
// 		default:
// 			return state
// 	}
//}
//
//ANDDD B)
//
//parseBetween const ${name}={
//
//}
//
//to add a new entry in this list
