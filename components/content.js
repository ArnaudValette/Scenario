function rootComponent(component){
	return `const reducers = combineReducers({
	user:reducer.user,
})

const store=createStore(reducers)
const container=document.getElementById('application')
const root=ReactDOMClient.createRoot(container)

root.render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>
)
`
}

function applicationComponent(component){
	return `function ${component.getNodeId()}(){
	return(
		<>
			<div className='${component.getNodeId()}'>
			</div>
		</>
	)
}
`

}

function genericComponent(component){
	return `function ${component.getNodeId()}(){
	return(
	<div className='${component.getNodeId()}'>
	</div>
	)
}
`

}

module.exports={
	rootComponent,
	applicationComponent,
	genericComponent,
}
