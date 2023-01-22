const view=require('./view')
const {translateToComponent}=require('../generators/generateComponent')
const {refreshImports}=require('../generators/refreshers')
const {Route}=require('./view')

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

	addLocalDependency(parent,child){
		parent.addLocalDependency(child)
		this.updateImports(parent,child, {flags : 'u'})
	}

	removeNode(nodeId){
		const target = this.findNode(nodeId)
		this.#eraseFile(target)
		const tempContent=[...this.content]
		this.content=[]
		for(let i=0;i<tempContent.length;i++){
			if(tempContent[i].getNodeId()!==nodeId){
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

	//Specific to applicationComponent:
	app(){
		return this.findNode('App')
	}

	addRouterTree(newTree){
		this.app().addTree(newTree)
		this.addLocalDependency(this.app(), newTree.component)
	}

	addChildRoute(parent,newBorn){
		this.app().addChildRoute(parent,newBorn)
		this.addLocalDependency(this.app(), newBorn.component)
	}

	displayRouter(){
		this.app().generateJsxRouting()
	}

	createRoute(component, location){
		return new Route(component,location)
	}

	be(){
		console.log(this)
	}
}

module.exports=Scenario
