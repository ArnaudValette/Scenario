const view=require('./view')

class Scenario{
	content=[]
	previousState={content:[]}
	nextState={content:[]}

	push(component){
		let prev= [...this.content]
		this.content=[...this.content,component]
		this.update({...this.previousState, content:prev},{content:this.content})
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

	findNode(nodeId){
		for(let i = 0; i<this.content.length; i++){
			if(content.getNodeId() === nodeId){
				return content[i]
			}
		}
	}

	update(prev,next){
		this.previousState=prev
		this.nextState=next
	}

	be(){
		console.log(this)
	}
}

module.exports=Scenario
