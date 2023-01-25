const fileHelpers=require('../tools/fileHelpers') 
const contents=require('../components/content')
function generateContent(reducer){
	return contents[reducer.getType()](reducer.getNodeId())
}
function translateToReducer(reducer){
	const content=generateContent(reducer)
	fileHelpers.createFile(reducer, `${content}`, '.js')
}


module.exports={
	translateToReducer,
}
