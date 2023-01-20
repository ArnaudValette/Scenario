const view=require('./view')
const {translateToComponent}=require('../generators/generateSrc')
const {refreshImports}=require('../generators/refreshers')

class Scenario{
	content=[]

	push(component){
		this.writeChanges(component)
		this.content=[...this.content,component]
	}

	writeChanges(component){
		//need a translator for :
		//index 
		//app
		//generic component
		translateToComponent(component)
	}

	updateImports(parent, newBorn){
		refreshImports(parent, newBorn)
	}

	eraseFile(targetComp){
		//YOU HAVE TO PASS SCENARIO AS A PARAMATER IN ORDER FOR VIEW TO CALL WRITECHANGES
		//THIS IS GROSS BUT AT LEAST IT WORKS
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
		//you never need to write changes of child in this case:
		//a component is ALWAYS exported
		this.updateImports(parent,child)
	}

	removeNode(nodeId){
		const target = this.findNode(nodeId)
		this.eraseFile(target)
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


	be(){
		console.log(this)
	}
}

module.exports=Scenario
