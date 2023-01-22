const {log}=require('../tools/tools')
const fs = require('fs')
const path = require('path')
const os= require('os')
const fileHelpers=require('../tools/fileHelpers')

function generateHtmlRoot(projectName,description){
	const content=`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<meta name="description" content="${description}"/>
		<title>${projectName}</title>
	</head>
	<body>
		<noscript>You need to enable JS to run this app.</noscript>
		<div id="application"></div>
	</body>
</html>`
	createPublicFiles('index.html', path.join(process.cwd(), './template/public/'),content)

}

function generateRobots(){
	const content=`# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:`
	createPublicFiles('robots.txt', path.join(process.cwd(),'./template/public/'), content)
}

function createPublicFiles(fileName, pathName, content){
	if(!fs.existsSync(pathName)){
		fs.mkdirSync(pathName)
	}
	if(!fs.existsSync(path.join(pathName,fileName))){
		fs.writeFileSync(path.join(pathName,fileName),content)
		return console.log('Public file created')
	}
	return console.log('Public file already exists')
}

module.exports={
	generateHtmlRoot,
	generateRobots
}
