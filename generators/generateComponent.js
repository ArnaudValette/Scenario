const fileHelpers=require('../tools/fileHelpers')


function generateImport(parent,newBorn){
	const fullPath = findRelativeLocation(parent.location, newBorn.location)
	return `import ${newBorn.getNodeId()} from "${fullPath}${newBorn.getNodeId()}"`
}

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

function translateToComponent(component){
	//TODO:generateModuleExports
	const content= generateContent(component.getNodeId())
	const defaultExport = generateDefaultExport(component.getNodeId())
	fileHelpers.createFile(component, `${content}${defaultExport}`, '.jsx')
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
