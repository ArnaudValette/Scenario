const generatePublic=require('./generators/generatePublic')
const {generateSrc}=require('./generators/generateSrc')
const Scenario=require('./virtual/Scenario')


generatePublic.generateHtmlRoot('frontend', 'this is a frontend')
generatePublic.generateRobots()
const s = new Scenario()
const {index, app} = generateSrc(s)
s.be()


