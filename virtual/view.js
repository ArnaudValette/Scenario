const deps=require('../dependencies/index')

class component{
	moduleDependencies
	localDependencies={}
	parentDependencies={}
	nodeId
	location
	constructor(name,options){
		this.moduleDependencies=deps[options.type]
		this.nodeId=name
		this.location='component'
	}

	addParentDependency(component){
		this.parentDependencies={...this.parentDependencies,
			[component.getNodeId()]:{
				path:`${component.getLocation()}/${component.getNodeId()}`,
				name:component.getNodeId(),
				ref:component
			}
		}
	}

	addLocalDependency(component){
		this.localDependencies={...this.localDependencies,
			[component.getNodeId()]:{
				path:`${component.getLocation()}/${component.getNodeId()}`,
				name:component.getNodeId(),
				ref:component
			}}
		component.addParentDependency(this)
	}

	getChildrenByNodeId(nodeId){
		for(const [key,value] of Object.entries(this.localDependencies)){
			if(value.name=nodeId){
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
	giveDependencies(){
	}
}

class rootComponent extends component{
	constructor(name,options){
		super(name,options)
		this.location='root'
	}
}

class appComponent extends component{
	constructor(name,options){
		super(name,options)
		this.location='root'
	}
}

module.exports={
	component,
	appComponent,
	rootComponent
}
