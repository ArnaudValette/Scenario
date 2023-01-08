const fs = require('fs')
const path = require('path')
const {log}=require('./tools')

function createDir(name,path){
	if(!fs.existsSync(`${path}${name}`)){
		return fs.mkdirSync(`${path}${name}`)
	}
	return log('directory already exists')
}

function createFile(name,pathName,content){
	try{
		fs.writeFileSync(path.join(pathName, name),content)
		return log('file successfully created')
	}
	catch(err){
		return log('file not created')
	}
}

module.exports={
	createFile,
	createDir
}
