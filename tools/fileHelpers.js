const fs = require('fs')
const path = require('path')
const {log}=require('./tools')

function handlePath(component){
	return path.join(process.cwd(),'./template/src/',component.getLocation()==='root'
		?'.'
		: `${component.getLocation()}/${component.getNodeId()}`
			)
}

function handleFile(component,extension){
	return path.join(handlePath(component), `${component.getNodeId()}${extension}`)
}

function readFile(component, extension){
	return fs.readFileSync(handleFile(component,extension), 'utf-8')
}

function deleteFromJsx(component , data, target){
	const newData=data.split('\n')
	let result=[]
	for(let i = 0; i < newData.length; i++){
		if(newData[i] !== target){
			result.push(newData[i])
		}
	}
	
	fs.writeFileSync(handleFile(component, '.jsx'), result.join('\n'))
	/*
	return new Promise((resolve,reject)=>{
		const writer=fs.createWriteStream(handleFile(component, '.jsx'),{
		flags: 'w'})
			.on('close',resolve)
			.on('error', reject)
		let d= data
		d = d.split('\n')
		let s = target.substring(0, target.length-1)
		for(let i = 0 ; i< d.length; i++){
			if(d[i] !== s){
				writer.write(`${d[i]}\n`)
			}
		}
		writer.end()
	})
	*/
}

function writeJsx(component, data){
	fs.writeFileSync(handleFile(component, '.jsx'), data.join('\n'))
		/*
	return new Promise((resolve,reject)=>{
		const writer = fs.createWriteStream(handleFile(component,'.jsx'),{
			flags: 'w'})
				.on('close', resolve)
				.on('error',reject)
		for(let i = 0 ; i< data.length ; i++){
			writer.write(data[i])
		}
		writer.end()
	})
		*/

}

function createDir(path){
	if(!fs.existsSync(path)){
		return fs.mkdirSync(path,{recursive:true})
	}
	return log('directory already exists')
}


function createFile(component, content, extension){
	try{
		if(!fs.existsSync(handlePath(component))){
			createDir(handlePath(component))
			//createDir('',handlePath(component))
		}
		if(!fs.existsSync(handleFile(component,extension))){
			fs.writeFileSync(handleFile(component,extension),content)
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
	readFile,
	writeJsx,
	deleteFromJsx,
}
