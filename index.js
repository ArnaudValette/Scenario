const generatePublic=require('./generators/generatePublic')
const {generateSrc}=require('./generators/generateSrc')
const Scenario=require('./virtual/Scenario')
const {Route}=require('./virtual/view')


generatePublic.generateHtmlRoot('frontend', 'this is a frontend')
generatePublic.generateRobots()

const s = new Scenario()

const {index, app} = generateSrc(s)

const test1=s.createComponent('test1', {type:'genericComponent', dependencies:[]})
const test2=s.createComponent('test2', {type:'genericComponent', dependencies:[]})
const test3=s.createComponent('test3', {type:'genericComponent', dependencies:[]})

s.addLocalDependency(test1, app)
//
//////////////////////////////////////////////////////
//how do you kill local dependencies ?
//s.removeNode('app') OR s.removeNode(app.getNodeId())
//_________________________________________________

////////////////////////////////////////////////////
//test : Routes handling

//<Route path='/' element={<Test1/>}/>
//const rootRoute= new Route(test1)
const rootRoute= s.createRoute(test1)
//<Route path='about' element={<Test2/>}/>
//const levelOneChild=new Route(test2, 'about')
const levelOneChild= s.createRoute(test2, 'about')

//app.addTree(rootRoute)
//app.addChildRoute(rootRoute, levelOneChild)
s.addRouterTree(rootRoute)
s.addChildRoute(rootRoute,levelOneChild)

//const levelTwoChild = new Route(test3, 'this')
const levelTwoChild = s.createRoute(test3, 'this')

//app.addChildRoute(levelOneChild, levelTwoChild)
s.addChildRoute(rootRoute, levelTwoChild)

//app.generateJsxRouting()
s.displayRouter()




