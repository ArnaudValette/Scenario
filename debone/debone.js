
	const text=`
	blabla{{
	bla}bla{
	function ok(){
		const string='{{{{'
		const well="{}{}{{}"
		return (
		function(){}{}{}
		}}}}{{{{{
		)
	}

	blabla{
	blabla`


function parseFunctionBody(expression,data){

}

function findLineOfExpression(expression, data){
	let arrOfIndexes=[]
	let stackIndex=0
	const d=data.split('\n')
	for(let j=0; j<d.length && stackIndex < expression.length; j++){
		const line=d[j]
		for(let i = 0; i<line.length && stackIndex < expression.length; i++){
			if(line[i]!==expression[stackIndex]){
				arrOfIndexes=[]
				stackIndex=0
			}

			else if(line[i]===expression[stackIndex]){
				if(stackIndex+1===expression.length){
					arrOfIndexes.push([j,i])
					return arrOfIndexes
				}
				arrOfIndexes.push([j,i])
				stackIndex++
			}
			
		}
	}

	return -1
}

console.log(findLineOfExpression(`(){`,text))


