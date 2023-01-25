class reducer{
	//the aim of such an entity is to create an entry in the './template/src/reducer/${fileName}.js' file
	//each new reducer from the same family creates an entry in the family file
	//xReducers.js and yReducers.js per example :
	//xReducers.js =
	//
	//function user(state='', action){
	// 	switch(action.type){
	// 		default:
	// 			return state
	// 	}
	//}
	//
	// 	const xReducer={
	// 		user,
	// 	}
	//export default xReducer
	//
	//the blueprint for such a file is :
	//function ${}
	//
	//
	//const xReducers={
	//       //'''''append here ${}
	//       user,
	//       a,
	//       b,
	//}
	//
	//export default xReducer
	//
	//there are two states : creating a family, and creating an entry
	//a 'reducer' is a family
	//an entry is another type of object
	//_____________________________________
	//content =['user', 'a', 'b'] 
	content
	//______________________________________
	//name = 'xReducer'
	name
	state
	//reducers are always imported by index, thus index.jsx should always update its import 1 : when a new family is written
	//index should also update its combineReducers section when a family gets a new entry
	//these are the side effects that should be included with changes made on reducer object.
	//but that's out of the discussion for now on : scenario will in the end act as a way to centralize everything, and rootComponent will implement the necessary methods
	//what should be done HERE, is just a way to push content 
	constructor(name){
		this.name = name
		this.location='reducer'
		this.type='reducer'
		this.state=[]
	}

}
