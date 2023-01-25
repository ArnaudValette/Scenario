const generatePublic=require('./generators/generatePublic')
const {generateSrc}=require('./generators/generateSrc')
const Scenario=require('./virtual/Scenario')
const {Route}=require('./virtual/view')


generatePublic.generateHtmlRoot('frontend', 'this is a frontend')
generatePublic.generateRobots()

const s = new Scenario()

const {index, app} = generateSrc(s)

const test1=s.createComponent('Test1', {type:'genericComponent', dependencies:[]})
const test2=s.createComponent('Test2', {type:'genericComponent', dependencies:[]})
const test3=s.createComponent('Test3', {type:'genericComponent', dependencies:[]})

s.addLocalDependency(test1, app)


const rootRoute= s.createRoute(test1)
const levelOneChild= s.createRoute(test2, 'about')
const levelTwoChild = s.createRoute(test3, 'this')

//                rootRoute === is layout component
//                 /     \
//                /       \
//      levelOneChild    levelTwoChild
//
//      you must be able to import .css automaticxcvxvd
//        
s.addRouterTree(rootRoute)
s.addChildRoute(rootRoute,levelOneChild)
s.addChildRoute(rootRoute, levelTwoChild)

s.displayRouter()




