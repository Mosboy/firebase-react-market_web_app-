import Rebase from "re-base"
import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
	apiKey:"AIzaSyCdAIyTJE0h5r5no-gKIBPDsINVFu6cqh8",
	authDomain:"moses-react-tutorial.firebaseapp.com",
	databaseURL:"https://moses-react-tutorial.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

//This is a named export
export {firebaseApp}

//this is a default export
export default base; 