const fileHelpers=require('../tools/fileHelpers')
const {component, rootComponent, appComponent} = require('../virtual/view')
const deps=require('../dependencies/index')

function generateContent(name){
	return `function ${name}(){
	return(
		<div className='${name}'>
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
	const content= generateContent(component.getNodeId())
	const defaultExport = generateDefaultExport(component.getNodeId())
	fileHelpers.createJsx(component.getNodeId(), component.location, `${content}${defaultExport}`)
	fileHelpers.createCss(component.getNodeId(), component.location)
}

function generateImport(parent,newBorn){
	//parent.location
	//newBorn.location
	const fullPath = findRelativeLocation(parent.location, newBorn.location)
	return `import ${newBorn.getNodeId()} from "${fullPath}${newBorn.getNodeId()}"\n`
}

function findRelativeLocation(pLoc,cLoc){
	//root component 
	//root = level 0 
	//component = level 1
	//if(cLoc < pLoc) --> ../ cLoc is root and pLoc is comp
	//if(pLoc < cLoc) --> ./${location}/ pLoc is root and cLoc is comp
	//if(cLoc === pLoc) --> ./ 
	const p = findLevel(pLoc)
	const c = findLevel(cLoc)
	return p<c ? `./${cLoc}/` : p>c ? `../` : pLoc === cLoc ? `./` : `../${cLoc}/`
}

function findLevel(loc){
	return loc === 'root' ? 0 : 1
}

module.exports={
	generateSrc,
	translateToComponent,
	generateImport,
}
