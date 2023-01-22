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
	constructor(name,options){
		super(name,options)
		this.location='root'
		this.type='rootComponent'
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
		//this.trees[oneRoot.getName()].addChild(newBorn)
	}
	logTrees(){
		console.log(this.trees)
	}
	generateJsxRouting(){
		for(const [key,value] of Object.entries(this.trees)){
			value.doRecursivePresentation(0)
		}
	}
	//add routes
	//pass a component and an url
	//addRoute('root', child){
	//routes.push({location:root, childRoutes:none, display:child, innerAccess:child.nodeId()})
	//addRoute('child', anotherChild){
	//routes.push({location:child, 
	//'child' has to be interpreted as : '**parentName**'
	//each route should be an object because it allows for another easy tracking of the 
	//structure of the Router
	//you build a tree 
	//and when the tree is built you can call the method to rewrite the file in order to 
	//update it
	//then the tree should be saved as Routes in appComponent and can be reused to generate a 
	//navBar
	//})
	//}
	//}
}

class Route{
	childs={}
	component
	name
	location
	//<Route path='/' element={<NodeName/>}>
	//
	//     <Route path='about' element={<LevelOneChild/>}>
	//         <Route path='this' element={<LevelTwoChild/>}/>
	//     </Route>
	//
	//     <Route path='contact' element={<Sibling/>}>
	//</Route>
	//
	//root= new Route{location='root', component='NodeName'}
	//child = new Route{location='about' component='LevelOneChild'}
	//IMPORTANT:
	//appComponent.createRoot(root)
	//appComponent.addChild(root, child)
	//root{...root, childs : {LevelOneChild: {child{location:'about', component:'Levelxone'}}}}
	//
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

	doRecursivePresentation(level){
		if(this.childs && Object.keys(this.childs).length === 0){
			return console.log(`${this.generateTabs(level)}<Route path='${this.location}' element={<${this.component.getNodeId()}/>}/>`)
		}
		console.log(`${this.generateTabs(level)}<Route path='${this.location}' element={<${this.component.getNodeId()}/>}>`)
			for(const [key,value] of Object.entries(this.childs)){
				value.doRecursivePresentation(level+1)
			}
		console.log(`${this.generateTabs(level)}</Route>`)
	}

	generateTabs(times){
		let result =`` 
		for(let i = 0; i < times; i++){
			result=result.concat('-----')
		}
		return result
	}
}

module.exports={
	component,
	appComponent,
	rootComponent,
	Route,
}
