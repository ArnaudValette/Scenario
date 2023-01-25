const fileHelpers=require('../tools/fileHelpers')
const contents=require('../components/content')
const {dependencies}=require('../dependencies/index')

function generateImport(parent,newBorn){
	const fullPath = findRelativeLocation(parent.location, newBorn.location)
	return `import ${newBorn.getNodeId()} from "${fullPath}${newBorn.getNodeId()}"`
}

function generateMandatoryImports(component){
	return `import './${component.getNodeId()}.css'\n`
}

function generateModuleImports(component){
	const modules=component.getModuleDependencies()
	if(!modules) return ''
	const results=[]
	for(let i = 0; i< modules.length; i++){
		results.push(dependencies[modules[i]])
	}
	results.push('')
	return results.join('\n')
}

function generateContent(component){
	return contents[component.getType()](component)
}

function generateDefaultExport(name){
	return `export default ${name}`
}

function translateToComponent(component){
	//TODO:generateModuleExports
	const content= generateContent(component)
	const defaultExport = generateDefaultExport(component.getNodeId())
	const moduleImports = generateModuleImports(component)
	const mandatoryImports= generateMandatoryImports(component)
	fileHelpers.createFile(component, `${mandatoryImports}${moduleImports}${content}${defaultExport}`, '.jsx')
	fileHelpers.createFile(component, '', '.css')
}


function findRelativeLocation(pLoc,cLoc){
	const p = findLevel(pLoc)
	const c = findLevel(cLoc)
	return p<c ? `./${cLoc}/` : p>c ? `../` : pLoc === cLoc ? `./` : `../${cLoc}/`
}

function findLevel(loc){
	return loc === 'root' ? 0 : 1
}

module.exports={
	translateToComponent,
	generateContent,
	generateDefaultExport,
	generateImport,
}
