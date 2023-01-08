function appendNode(obj, path,value){
	const p=path.shift()
	if(path.length===0){
		if(obj[p][value]){
			return log('folder already exists')
		}
		return obj[p][value]={}
	}
	return appendNode(obj[p], path, value)
}


function jsonCreateDir(name,path){
	const arrPath=path.split('/')
	arrPath.pop()
	arrPath[0]='root'
	appendNode(obj,arrPath,name )
	console.log(obj.root.first.second)
}

jsonCreateDir('ok', './first/second/third/')




function appendFileNode(obj,path,name,type){
	const p=path.shift()

	if(path.length===0){
		if(obj[p][`${name}${type}`]){
			return log('file already exists')
		}
		log('creating file')
		return obj[p][`${name}${type}`]=`${name}.${type}`
	}

	return appendFileNode(obj[p],path,name,type)
}



function jsonCreateFile(name,path,type){
	const arrPath=path.split('/')
	arrPath.pop()
	arrPath[0]='root'
	appendFileNode(obj,arrPath,name,type)
	log(obj.root.first.second.third)
}


