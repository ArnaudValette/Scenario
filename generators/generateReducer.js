const fileHelpers=require('../tools/fileHelpers') 
const contents=require('../components/content')
function generateContent(reducer){
	return contents[reducer.getType()](reducer.getNodeId())
}
function translateToReducer(reducer){
	const content=generateContent(reducer)
	fileHelpers.createFile(reducer, `${content}`, '.js')
}

function pushReducer(name,reducer){
	const newData=contents['reducerStructure'](name).split('\n')
	const oldData=fileHelpers.readFile(reducer,'.js')
	if(!functionAlreadyThere(oldData,newData[0])){
		return fileHelpers.writeJsx(reducer, [newData.join('\n'),oldData],'.js')
	}
}


function functionAlreadyThere(data,str,test){
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
module.exports={
	translateToReducer,
	pushReducer,
}
