const {readFile, writeJsx, deleteFromJsx}=require('../tools/fileHelpers')
const {generateImport} = require('./generateComponent')


function refreshReducersImports(parent, importStr){
	const data= readFile(parent, '.jsx')
	if(!importAlreadyThere(data,importStr)){
		return writeJsx(parent,[importStr,data])
	}
}

function refreshImports(parent, newBorn, options){
	const data = readFile(parent,'.jsx')
	const importStr = generateImport(parent,newBorn)
	switch(options.flags){

		case 'u':
		if(!importAlreadyThere(data, importStr)){
			return writeJsx(parent ,[importStr, data])
		}
			break;

		case 'r':
			if(importAlreadyThere(data,importStr,true)){
				return deleteFromJsx(parent , data, importStr)
			}
				break;
		default:
			return
	}
}

function importAlreadyThere(data,str,test){
	if(test)console.log(str)
	let d = data
	d = d.split('\n')
	for(let i = 0; i < d.length; i++){
		if(d[i] === str){
			if(test)console.log('found')
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
	refreshReducersImports,
}
