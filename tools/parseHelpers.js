const {readFile,writeJsx}=require('./fileHelpers')

function parseAndAdd(application,startSearch,endSearch,dataLines){
	const content = readFile(application, '.jsx').split('\n')
	const line = parse(content,{getLineOf:startSearch})
	if(line !== -1){
		const endLine=parse(content,{getLineOf:endSearch})
		if(endLine !==-1){
			return addAtIndex({start:line, end:endLine+1}, content, dataLines,application)

		}
	}
	
	const jsxReturn= parse(content,{getLineOf:'<>'})
	if(jsxReturn !== -1){
		return addAtIndex({start:jsxReturn+1, end:jsxReturn+1}, content, dataLines,application)
	}
	
}

function parseStartEndAndAppendBetweenInFile(indexComponent, startStr,endStr, arrOfData,extension){
	const content= readFile(indexComponent,extension?extension:'.jsx').split('\n')
	if(extension==='.js'){
		console.log('reducer : ')
		console.log(content)
		console.log('____________________')
	}
	const [start,end] = parse(content,{getInRange:{start:startStr, end:endStr}})
	if(start === -1 || end === -1 ) return
	const innerData=content.slice(start+1,end)
	const newData=innerData.concat(arrOfData)
	let result= [... new Set(newData.flat())]
	return addAtIndex({start:start+1,end}, content, result,indexComponent, extension)
}


function addAtIndex(index, data, add,application,extension){
	const result=[...data.slice(0,index.start),...add,...data.slice(index.end,data.length) ]
	writeJsx(application, result,extension)

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
	if(options.getInRange){
		const start = options.getInRange.start
		const end = options.getInRange.end
		let startIndex=undefined
		let endIndex=undefined
		for(let i=0; i<data.length; i++){
			if(contains(data[i],start)){
				startIndex=i
			}
		}

		if(startIndex === undefined) return [-1,-1]
		for(let j = startIndex; j<data.length; j++){
			if(contains(data[j], end)){
				endIndex=j
			}
		}

		if(endIndex === undefined) return [-1,-1]
		return [startIndex, endIndex]
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
	parseStartEndAndAppendBetweenInFile,
}

