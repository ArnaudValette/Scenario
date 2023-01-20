const fs = require('fs')
const path = require('path')
const {log}=require('./tools')

function handlePath(fromSrc){
	return path.join(process.cwd(),'./template/src/',fromSrc==='root'?'.':'components/')
}

function handleFile(pathName, name){
	return path.join(handlePath(pathName), name)
}

function readJsx(pathName, name){
	return fs.readFileSync(handleFile(pathName, name), 'utf-8')
}

function deleteFromJsx(data, target, parent){
	const pathName= handlePath(parent.location)
	const writer=fs.createWriteStream(path.join(pathName , `${parent.getNodeId()}.jsx`),{
	flags: 'w'})
	let d= data
	d = d.split('\n')
	let s = target.substring(0, target.length-1)
	for(let i = 0 ; i< d.length; i++){
		if(d[i] !== s){
			console.log('deleting')
			writer.write(`${d[i]}\n`)
		}
	}
	writer.end()
}
function writeJsx(data, parent){
	
	const pathName = handlePath(parent.location)
	const writer = fs.createWriteStream(path.join(pathName, `${parent.getNodeId()}.jsx`),{
		flags: 'w'})
	for(let i = 0 ; i< data.length; i++){
		console.log('adding')
		writer.write(data[i])
	}
	writer.end()

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
		if(!fs.existsSync(path.join(pathName,name))){
			fs.writeFileSync(path.join(pathName, name),content)
			return log('file successfully created')
		}
		return log('File already exists')
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
	readJsx,
	writeJsx,
	deleteFromJsx,
}
