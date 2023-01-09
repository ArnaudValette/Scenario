const generatePublic=require('./generators/generatePublic')
const {generateSrc}=require('./generators/generateSrc')
const Scenario=require('./virtual/Scenario')


generatePublic.generateHtmlRoot('frontend', 'this is a frontend')
generatePublic.generateRobots()
const s = new Scenario()
const {index, app} = generateSrc(s)

const test1=s.createComponent('test1', {type:'component', dependencies:[]})
const test2=s.createComponent('test2', {type:'component', dependencies:[]})
const test3=s.createComponent('test3', {type:'component', dependencies:[]})

s.be()

