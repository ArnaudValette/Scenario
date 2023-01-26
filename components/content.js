function head(component){
	return `function ${component.getNodeId()}(props){`
}


function rootComponent(component){
	return `
const reducers = combineReducers({
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
	return `${head(component)}
	return(
		<>
		</>
	)
}
`

}

function navComponent(component){
	return `${head(component)}
	return(
		<nav>
		</nav>
	)
}
`
}

function genericComponent(component){
	return `${head(component)}
	return(
		<div className='${component.getNodeId()}'>
		</div>
	)
}
`
}

function customHook(component){
	return `${head(component)}
	const [state,setState]=useState()
	useEffect(()=>{

	},[])
	return {
		state,
		setState
	}
}`
}

function routeComponent(component){
	return `${head(component)}
	return(
		<div className='${component.getNodeId()}'>
		</div>
	)
}
`

}

function layoutComponent(component){
	return `${head(component)}
	return(
	<div className='${component.getNodeId()}'>
		<header>
		</header>
		<main>
			<Outlet/>
		</main>
	</div>
	)
}
`

}

function reducerComponent(name){
	return `const ${name}={
}

export default ${name}`
}

function reducerStructure(name){
	return `function ${name}(state='',action){
	switch(action.type){
		default:
			return state
	}
}`
}

module.exports={
	rootComponent,
	applicationComponent,
	genericComponent,
	layoutComponent,
	routeComponent,
	reducerComponent,
	reducerStructure,
	navComponent,
	customHook,
}
