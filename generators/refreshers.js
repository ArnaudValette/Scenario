const {readJsx, writeJsx, deleteFromJsx}=require('../tools/fileHelpers')
const {generateImport} = require('./generateSrc')

function refreshImports(parent, newBorn, options){
	const data = readJsx(parent.location, `${parent.getNodeId()}.jsx`)
	const importStr = generateImport(parent,newBorn)
	switch(options.flags){
		case 'u':
		if(!importAlreadyThere(data, importStr)){
			return writeJsx([importStr, data], parent)
		}
			break;
		case 'r':
			if(importAlreadyThere(data,importStr, parent)){
				return deleteFromJsx(data, importStr, parent)
			}
				break;
		default:
			return
	}

}

function importAlreadyThere(data,str){
	let d = data
	d = d.split('\n')
	let s = str.substring(0, str.length-1)
	for(let i = 0; i < d.length; i++){
		if(d[i] === s){
			return true
		}
	}
	return false
}
/*
TODO: use this to delete unwanted imports
	for(let line = 0; line < data.length && indexes.length < parent.localDependencies.length; line++){
		for(let dep = 0; dep < parent.localDependencies.length; dep++){
			if(line === generateImport(parent, dep)){
				indexes.push(line)
			}
		}
	}

	for(let i = 0; i < indexes.length; i++){
		data.splice(indexes[i],1)
	}
*/
module.exports={
	refreshImports,
}
