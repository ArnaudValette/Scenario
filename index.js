const generatePublic=require('./generators/generatePublic')
const {generateSrc}=require('./generators/generateSrc')
const Scenario=require('./virtual/Scenario')

//********************************************************************
//_____this generates template public files in react public folder
//
generatePublic.generateHtmlRoot('frontend', 'this is a frontend')
generatePublic.generateRobots()

//********************************************************************
//_____initializes a Scenario instance
//
const s = new Scenario()

//*******************************************************************
//_____this is really a wrapper : it creates a rootComponent (index.js)
//_____along with an applicationComponent (App.jsx) and performs the necessary
//____steps to bind the two and creates the appropriate files 
//
const {index, app} = generateSrc(s)

//*******************************************************************
//____Here is a demonstration of how you can generate a ROUTER (react-router-dom)
//____You can use LayoutComps to nest routes or use RouteComps as siblings from the same 'level' of nesting
//____Files are created when you call the createXComponent, but they are edited if you decide to change something
//____Their dependencies, for example (addLocalDependency method)
const Cover=s.createRouteComponent('Cover',{type:'layoutComponent', to:'/'})
const Layout=s.createRouteComponent('Layout', {type:'layoutComponent', to:'menu'})
const test2=s.createRouteComponent('Test2', {type:'routeComponent', to:'about'})
const test3=s.createRouteComponent('Test3', {type:'routeComponent',to:'contact'})
const Layout2=s.createRouteComponent('Layout2',{type:'layoutComponent',to:'home'})
const test5=s.createRouteComponent('Test5', {type:'routeComponent',to:'hello'})

//******************************************************************
//____Here is how you create a generic Component, a file is created directly when you call this method
//
const test4=s.createComponent('Test4', {})

//*****************************************************************
//____adding test4 as a dependency to App.jsx
//____it will directly edit the file to generate the good import
s.addLocalDependency(app,test4)

//****************************************************
//____Here is how you create a 'map' of your app,
//____You can build several trees of Routes, to add one:
s.addRouterTree(Cover)
//____Another:
s.addRouterTree(Layout)

//***************************************************
//____Then you can nest some route under a layoutComponent:
s.addChildRoute(Layout,test2)
//___another one:
s.addChildRoute(Layout, test3)

//**********************************************
//____Creates a new tree, then nest test5 under it
//____it results in :
//      <Route path='home' element={<Layout2/>}>
//      	<Route path='hello' element={<Test5/>}/>
s.addRouterTree(Layout2)
s.addChildRoute(Layout2, test5)

//*********************************************
//___Deprecated:
s.buildRoutes()


//*********************************************
//____Here is how you create reducersFiles
//____The reducersFile can store several reducers
const reducerOne= s.createReducer('ReducerOne')
s.feedReducer(reducerOne, 'user')
s.feedReducer(reducerOne, 'token')

const dialog = s.createReducer('dialog')
s.feedReducer(dialog , 'one')

//*******************************************
//____Here is how you generate a 'Menu' from the routes
//____declared in the ROUTER section
//____no need to specify anything, the nav component can find the 
//____application routing on his own
s.createNavComponent('Menu', {type:'navComponent', dependencies:[]})

//*********************************************
//_____You need to call this in order to tell nav component
//_____To write a file with the correct routes
s.createLinksNavbar()





