const view=require('./view')
const {translateToReducer}=require('../generators/generateReducer')
const {translateToComponent}=require('../generators/generateComponent')
const {refreshImports,refreshReducersImports}=require('../generators/refreshers')
const {Route}=require('./view')
const {parseAndAdd, parseStartEndAndAppendBetweenInFile}=require('../tools/parseHelpers')

class Scenario{
	content=[]

	push(component){
		translateToComponent(component)
		this.content=[...this.content,component]
	}

	updateImports(parent, newBorn, options){
		refreshImports(parent, newBorn, options)
	}

	#eraseFile(targetComp){
		targetComp.removeSelf(this)
	}

	createRootComponent(name,options){
		const root= new view.rootComponent(name,options)
		this.push(root)
		return root
	}

	createAppComponent(name,options){
		const app= new view.appComponent(name,options)
		this.push(app)
		return app
	}

	createComponent(name,options){
		const component= new view.component(name,options)
		this.push(component)
		return component
	}

	createRoute(component, location){
		return new Route(component,location)
	}

	createRouteComponent(name,options){
		const route= new view.routeComponent(name,options)
		this.push(route)
		return route
	}

	addLocalDependency(parent,child){
		parent.addLocalDependency(child)
		this.updateImports(parent,child, {flags : 'u'})
	}

	removeNode(component){
		this.#eraseFile(component)
		const tempContent=[...this.content]
		this.content=[]
		for(let i=0;i<tempContent.length;i++){
			if(tempContent[i].getNodeId()!==component.getNodeId()){
				this.push(tempContent[i])
			}
		}
	}

	findNode(nodeId){
		for(let i = 0; i<this.content.length; i++){
			if(this.content[i].getNodeId() === nodeId){
				return this.content[i]
			}
		}
	}

	createReducer(name){
		const reducer = new Reducer(name)
		this.index().addReducer(reducer)
		refreshReducersImports(this.index(),reducer.getImport())
		translateToReducer(reducer)
		return reducer
	}

	feedReducer(reducer, name){
		reducer.push(name)
		parseStartEndAndAppendBetweenInFile(this.index(), `combineReducers({`, `})`,reducer.getEntries())
	}

	//Specific to applicationComponent:
	app(){
		return this.findNode('App')
	}

	index(){
		return this.findNode('index')
	}

	addRouterTree(component){
		this.app().addTree(component.getRoute())
		this.addLocalDependency(this.app(), component)
		parseAndAdd(this.app())
	}

	addChildRoute(parent,newBorn){
		this.app().addChildRoute(parent.getRoute(),newBorn.getRoute())
		this.addLocalDependency(this.app(), newBorn)
		parseAndAdd(this.app())
	}

	buildRoutes(){
		this.app().generateJsxRouting()
	}


	be(){
		console.log(this)
	}
}

class Reducer{
	name
	location
	content=[]
	nodeId
	type
	constructor(name){
		this.name=name
		this.nodeId=name
		this.location='reducer'
		this.type='reducerComponent'
	}

	getType(){
		return this.type
	}
	push(name){
		this.content.push(name)
	}

	getName(){
		return this.name
	}

	getImport(){
		return `import ${this.name} from './reducer/${this.name}/${this.name}.js'`
	}

	getEntries(){
		return this.content.map((el)=>`\t${el}:${this.name}.${el},`)
	}
	
	getNodeId(){
		return this.nodeId
	}

	getLocation(){
		return this.location
	}
}

module.exports=Scenario
