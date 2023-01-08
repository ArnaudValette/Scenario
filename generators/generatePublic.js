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
	fileHelpers.createFile('index.html', path.join(process.cwd(), './template/public/'),content)

}

function generateRobots(){
	const content=`# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:`
	fileHelpers.createFile('robots.txt', path.join(process.cwd(),'./template/public/'), content)

}

module.exports={
	generateHtmlRoot,
	generateRobots
}
