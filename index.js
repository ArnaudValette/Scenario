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
const rootRoute= new Route(test1)

//<Route path='about' element={<Test2/>}/>
const levelOneChild=new Route(test2, 'about')

app.addTree(rootRoute)
app.addChildRoute(rootRoute, levelOneChild)

const sibling = new Route(test3, '/otherRouter')
app.addTree(sibling)

app.logTrees()
app.generateJsxRouting()




