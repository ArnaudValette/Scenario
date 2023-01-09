const fileHelpers=require('../tools/fileHelpers')
const {component, rootComponent, appComponent} = require('../virtual/view')
const deps=require('../dependencies/index')


function generateSrc(scenario){
	const index = scenario.createRootComponent('index', {type:'rootComponent', dependencies:[]})
	const app = scenario.createAppComponent('App',{type:'application', dependencies:[]})
	scenario.addLocalDependency(index, app)
	return {index, app}
}


module.exports={
	generateSrc,
}
