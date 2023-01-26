const fileHelpers=require('../tools/fileHelpers')
const contents=require('../components/content')
const {dependencies}=require('../dependencies/index')

function generateImport(parent,newBorn){
	const fullPath = findRelativeLocation(parent, newBorn)
	return `import ${newBorn.getNodeId()} from "${fullPath}${newBorn.getNodeId()}"`
}

function generateMandatoryImports(component){
	if(component.needCss()==='customHook'){
		return `import './${component.getNodeId()}.css'\n`
	}
	return ''
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
	if(component.needCss()){
		fileHelpers.createFile(component, '', '.css')
	}
}


function findRelativeLocation(par,chi){
	const p = findLevel(par.getLocation())
	const c = findLevel(chi.getLocation())
	return p<c ? `./${chi.getLocation()}/${chi.getNodeId()}/` : p>c ? `../../` : par.getLocation() === chi.getLocation() ? `./` : `../../${chi.getLocation()}/${chi.getNodeId()}/`
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
