const {readFile,writeJsx}=require('./fileHelpers')

function parseAndAdd(application){
	const content = readFile(application, '.jsx').split('\n')
	const line = parse(content,{getLineOf:'<Routes>'})
	if(line !== -1){
		const endLine=parse(content,{getLineOf:'</Routes>'})
		if(endLine !==-1){
			return addAtIndex({start:line, end:endLine+1}, content, application.generateJsxRouting(),application)

		}
	}
	
	const jsxReturn= parse(content,{getLineOf:'<>'})
	if(jsxReturn !== -1){
		return addAtIndex({start:jsxReturn+1, end:jsxReturn+1}, content, application.generateJsxRouting(),application)
	}
	
}

function addAtIndex(index, data, add,application){
	const result=[...data.slice(0,index.start),...add,...data.slice(index.end,data.length) ]
	writeJsx(application, result)

}


function parse(data, options){
	if(options.getLineOf){
		const line=options.getLineOf

		for(let i =0; i<data.length; i++){
			if(contains(data[i], line)){
				return i
			}
		}
		return -1
	}
}

function contains(readLine,target){
	let stackindex=0
	for(let i = 0; i<readLine.length;i++){
		if(stackindex===target.length-1 && readLine[i] === target[stackindex]){
			return true
		}
		if(readLine[i]===target[stackindex]){
			stackindex++
		}
		else{
			stackindex=0
		}
	}
	return false
}

module.exports={
	parseAndAdd,
}

