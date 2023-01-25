const deps=require('../dependencies/index')

class component{
	moduleDependencies
	localDependencies={}
	parentDependencies={}
	nodeId
	location
	type
	constructor(name,options){
		this.moduleDependencies=deps[options.type]
		this.nodeId=name
		this.location='component'
		this.type='genericComponent'
	}

	#addParentDependency(component){
		this.parentDependencies={...this.parentDependencies,
			[component.getNodeId()]:{
				path:`${component.getLocation()}/${component.getNodeId()}`,
				name:component.getNodeId(),
				ref:component
			}
		}
	}

	#removeLocalDependency(nodeId){
		const newLocalDependencies={}
		for(const [key,value] of Object.entries(this.localDependencies)){
			if(value.name!==nodeId){
				newLocalDependencies[key]=value
			}
		}
		this.localDependencies=newLocalDependencies
	}

	removeSelf(scenario){
		for(const [key,value] of Object.entries(this.parentDependencies)){
			value.ref.#removeLocalDependency(this.nodeId)
			scenario.updateImports(value.ref, this, {flags : 'r'})
		}
	}

	addLocalDependency(component){
		this.localDependencies={...this.localDependencies,
			[component.getNodeId()]:{
				path:`${component.getLocation()}/${component.getNodeId()}`,
				name:component.getNodeId(),
				ref:component
			}}
		component.#addParentDependency(this)
	}

	getChildrenByNodeId(nodeId){
		for(const [key,value] of Object.entries(this.localDependencies)){
			if(value.name=nodeId){
				return value.ref
			}
		}
	}
	getChildrenByType(type){
		for(const [key,value] of Object.entries(this.localDependencies)){
			if(value.ref.getType()=type){
				return value.ref
			}
		}
	}

	be(){
		console.log(this)
	}
	getLocation(){
		return this.location
	}
	getNodeId(){
		return this.nodeId
	}
	getModuleDependencies(){
		return this.moduleDependencies
	}
	getType(){
		return this.type
	}
}

class rootComponent extends component{
	reducers={}
	constructor(name,options){
		super(name,options)
		this.location='root'
		this.type='rootComponent'
	}

	addReducer(reducer){
		this.reducers[reducer.getName()]=reducer
	}
	logReducers(){
		for(const [key,value] of Object.entries(this.reducers)){
			console.log(value.getName())
			console.log(value.getImport())
			console.log(value.getEntries())
		}
	}
	generateStore(){

	}
}

class appComponent extends component{
	trees={}
	constructor(name,options){
		super(name,options)
		this.location='root'
		this.type='applicationComponent'
	}
	addTree(newRoot){
		this.trees[newRoot.getName()]=newRoot
	}
	addChildRoute(parent, newBorn){
		parent.addChild(newBorn)
	}
	logTrees(){
		console.log(this.trees)
	}
	generateJsxRouting(){
		const result=[]
		for(const [key,value] of Object.entries(this.trees)){
			value.doRecursivePresentation(0, result)
		}

		return [`\t\t<Routes>`, ...result, `\t\t</Routes>`]
	}
}

class Route{
	childs={}
	component
	name
	location

	constructor(component,location){
		this.name=component.getNodeId()
		this.component=component
		this.location=location?location:'/'
	}

	addChild(child){
		this.childs[child.getName()]=child
	}

	getName(){
		return this.name
	}

	doRecursivePresentation(level, arr){
		if(this.childs && Object.keys(this.childs).length === 0){
			return arr.push(`${this.generateTabs(level)}<Route path='${this.location}' element={<${this.component.getNodeId()}/>}/>`)
		}
		arr.push(`${this.generateTabs(level)}<Route path='${this.location}' element={<${this.component.getNodeId()}/>}>`)
			for(const [key,value] of Object.entries(this.childs)){
				value.doRecursivePresentation(level+1,arr)
			}
		arr.push(`${this.generateTabs(level)}</Route>`)
		return arr
	}

	generateTabs(times){
		let result =`` 
		for(let i = 0; i < times+3; i++){
			result=result.concat('\t')
		}
		return result
	}
}


class routeComponent extends component{
	route
	constructor(name,options){
		super(name,options)
		this.location='route'
		this.type=options.type
		this.route=new Route(this, this.location)
	}
	
	getRoute(){
		return this.route
	}
}

module.exports={
	component,
	appComponent,
	rootComponent,
	routeComponent,
	Route,
}
