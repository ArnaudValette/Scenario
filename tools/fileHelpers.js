const fs = require('fs')
const path = require('path')
const {log}=require('./tools')

function handlePath(fromSrc){
	return path.join(process.cwd(),'./template/src/',fromSrc==='root'?'.':'components/')
}

function createDir(name,path){
	if(!fs.existsSync(`${path}${name?name:''}`)){
		return fs.mkdirSync(`${path}${name}`)
	}
	return log('directory already exists')
}

function createJsx(name,pathName,content){
		createFile(`${name}.jsx`, handlePath(pathName), content)
}

function createCss(name,pathName){
	createFile(`${name}.css`, handlePath(pathName),'')
}
function createFile(name,pathName,content){
	try{
		if(!fs.existsSync(pathName)){
			createDir('',pathName)
		}
		fs.writeFileSync(path.join(pathName, name),content)
		return log('file successfully created')
	}
	catch(err){
		console.log(err)
		return log('file not created')
	}
}

module.exports={
	createFile,
	createDir,
	createCss,
	createJsx,
}
