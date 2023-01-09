const fileHelpers=require('../tools/fileHelpers')
const {component, rootComponent, appComponent} = require('../virtual/view')
const deps=require('../dependencies/index')

function generateContent(name){
	return `function ${name}(){
	return(
		<div className='App'>
	</div>
	)
}
`
}

function generateDefaultExport(name){
	return `export default ${name}`
}

function generateSrc(scenario){
	const index = scenario.createRootComponent('index', {type:'rootComponent', dependencies:[]})
	const app = scenario.createAppComponent('App',{type:'application', dependencies:[]})
	scenario.addLocalDependency(index, app)
	return {index, app}
}

function translateToComponent(component){
	switch(component.getType()){
		case 'genericComponent':
			translateToGeneric(component)
			break;
		case 'rootComponent':
			translateToRoot(component)
			break;
		case 'applicationComponent':
			translateToApp(component)
			break;
		default:
			break;
	}
}

function translateToApp(app){
	const content= generateContent(app.nodeId)
	const defaultExport = generateDefaultExport(app.nodeId)
	fileHelpers.createJsx(app.nodeId ,app.location, `${content}${defaultExport}`)
	fileHelpers.createCss(app.nodeId, app.location)

}
function translateToGeneric(component){

	const content= generateContent(component.nodeId)
	const defaultExport = generateDefaultExport(component.nodeId)
	fileHelpers.createJsx(component.nodeId ,component.location, `${content}${defaultExport}`)
	fileHelpers.createCss(component.nodeId, component.location)
}

function translateToRoot(root){
	const content= generateContent(root.nodeId)
	const defaultExport = generateDefaultExport(root.nodeId)
	fileHelpers.createJsx(root.nodeId ,root.location, `${content}${defaultExport}`)
	fileHelpers.createCss(root.nodeId, root.location)
}


module.exports={
	generateSrc,
	translateToComponent,
}
