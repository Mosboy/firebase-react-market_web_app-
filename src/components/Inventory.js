import React from "react";
import PropTypes from "prop-types";
import firebase from  "firebase"
import AddFishForm from "./AddFishForm/AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login"
import base, {firebaseApp} from "../base"

class Inventory extends React.Component{
	static propTypes = {
			fishes:PropTypes.object,
			updateFishes:PropTypes.func,
			deleteFish:PropTypes.func,
			loadSampleFishes:PropTypes.func,
			getUserInfo:PropTypes.func
	};

	state = {
		uid: null,
		owner: null
	}

	componentDidMount(){
		//when the page is reloaded or remounted, firebase will help me check if the user is already logged in by passing the user object of all the information of the loggedIn user to the authHandler function
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				this.authHandler({user})
			}
		})
	}

    authHandler = async authData =>{
    //1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, {context: this});//fetching the store state in  firebase
      this.props.getUserInfo(authData.user.displayName,authData.user.photoURL)
    //2. Check it has a owner
    if(!store.owner){
    	//save it as our own
    	await base.post(`${this.props.storeId}/owner`,{
    		data: authData.user.uid
    	})
    	if(this.state.uid === this.state.owner) this.props.getUserInfo(authData.user.displayName,authData.user.photoURL)//it will prevent another person who sign in to another acct from displaying their name and pics
    }
    //3. Set the state of the inventory component to reflect the current user
      this.setState({
      	uid: authData.user.uid,
      	owner: store.owner || authData.user.uid
      })
    	console.log(authData)
    }

	authenticate=provider=>{
     const authProvider =/yahoo.com/.test(provider) ?  new firebase.auth.OAuthProvider(provider) : new firebase.auth[`${provider}AuthProvider`]();
     console.log(authProvider)
     firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler)//if the sign in is successful, it should return the authHandler function with a argument of the user account
	}

	logout = async ()=>{
		console.log("Logging out");
		await firebase.auth().signOut();
		this.setState({uid: null})
		this.props.getUserInfo(null, null)//passing the image to null 
	}
	render(){
		const logout = <button className="user_logout" onClick={this.logout}>Log Out!</button>

		//1. Check if they are logged in
		if(!this.state.uid) {
			return <Login authenticate={this.authenticate}/>
		}
		//2. check if they are not the owner of the store
		if(this.state.uid !== this.state.owner){
			//this will run only if another user with a different auth sign in email address try to log In.
			return (
			        <div>
			          <p><em>Sorry your are not the owner</em></p>
			          {logout}
			        </div>
			        )
		}
		//3. They must be the owner, just render the inventory
		return(
				<div className="Inventory">
				  <h2 style={{textAlign:"center",margin:"7px",fontFamily:"cursive"}}>INVENTORY!!!</h2>
				  {logout}
				   {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} updateFishes={this.props.updateFishes} deleteFish={this.props.deleteFish} fish={this.props.fishes[key]}/>)}
				  <AddFishForm addFish={this.props.addFish/* passing the function from app.js to AddFishFormObject.keys component*/}/>
				  <button onClick={this.props.loadSampleFishes} className="loadSampleFishesButton">Load Sample Fishes</button>
				</div>
		)
	}
}
export default Inventory;