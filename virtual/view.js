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
	constructor(name,options){
		super(name,options)
		this.location='root'
		this.type='applicationComponent'
	}
}

module.exports={
	component,
	appComponent,
	rootComponent
}
