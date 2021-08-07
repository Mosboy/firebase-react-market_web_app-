import React from "react";
import PropTypes from "prop-types"
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sample_fishes from "../sample-fishes"
import Fish from "./Fish/Fish"
import base from "../base"
class App extends React.Component{
	state={
       fishes:{},
       order:{},
       user:{name:null,image:null}
	}
	static propTypes = {
		match: PropTypes.object
	}
	componentDidMount(){
		const {params} = this.props.match;
		const localStorageRef=localStorage.getItem(params.storeId)
	
		if(localStorageRef) {
			//this will set the order state to the values of the localStorage when component is mounted
			this.setState({order: JSON.parse(localStorageRef)})/*JSON.parse will pass the localStorage string to actual object before setting it to order State*/
		};
		//referencing firebase to db
		
		this.ref = base.syncState(`${params.storeId}/fishes`,{
			context:this,
			state:"fishes"//sync the react state(fishes) with the firebase db
		});
	}
	componentDidUpdate(){
	    const {params} = this.props.match;
		localStorage.setItem(params.storeId, JSON.stringify(this.state.order))
	}
	addFish=(fish)=>{
		//taking a copy of an existing state::we take this copy to make the the object of fishes to be added to the previous fishes and not to replace the previous fishes
		const fishy={...this.state.fishes}
		//2.Add our new fish object to that fishes variable
		fishy[`fish ${Date.now()}`]=fish
		//3.set the new fishes object to state to update the fishes when the form is updated
		this.setState({fishes:fishy})
	}
	updateFishes = (key, updateFishes)=>{
		  const updateAllFishes = {
		  	...this.state.fishes,/*this will get all the fish object(data) */
		  	[key]: updateFishes /* the key here will get the specified fish object that was changed and pass the new change fishes in the new constant updateFishes*/
		  }/*   the below comment code will work exactly as the one above*/
			        /* const updateAllFishes={...this.state.fishes}
			           updateAllFishes[key] = updateFishes */

          this.setState({fishes:updateAllFishes})
	}
	deleteFish = (key) =>{
		//1. take a copy of state
		const fishes = {...this.state.fishes};
		//2. update the state
		fishes[key] = null;//we set the fish to be deleted to null so that firebase will be able recognise it as deleted fish;
		delete fishes[key]//I pass this code because am not connected to firebase yet
 		//3. update state
 		this.setState({fishes})
	}
	loadSampleFishes=()=>{ 
		//passing the fish object in sample-fishes to fishes
	     this.setState({fishes:sample_fishes})//setting the state to update when this function is called by onclick on inventory component
	} 

	addToOrder=(key)=>{
		//1 take a copy of state of order
		const neworder={...this.state.order};
		//2.either add to the order, or update the number in our order
		neworder[key]=neworder[key] + 1 || 1;
		console.log(neworder[key])
		//3 call setState to update our state object
		this.setState({order:neworder})
	}
	removeFromOrder = key =>{
		//1. take a copy of state
  		const order = {...this.state.order};
		//2. remove that item from order
		delete order[key]
		//3. call setState to update our state object
		this.setState({order})
	}
	getUserInfo = (name,image) =>{
		console.log("getting user information")
		this.setState({user:{name,image}})
	}
	render(){
		const {name,image} = this.state.user
		return(
			<div className="catch-of-the-day">
				  <div className="menu">
					 <Header tagline="Fresh seaFood Market"/>
					 {
					 	name && image
					 		? <div className="userInfo"><img src={image} alt="userimage"/> <strong>{name} </strong> </div>
					 		: null
					}
					 <ul className="fishes">
					   {
					   	Object.keys(this.state.fishes).map((key,i)=>{
					   	return <Fish 
					                 key={key/*this pass a key to each of the looped array which will help react to locate each of the array quicky*/} 
					                 index={key}
					                 addToOrder={this.addToOrder} 
					                 details={this.state.fishes[key]}
					            />
					         }
					       )
					   }
                      </ul>
				  </div>
				 <Order 
				     fishes={this.state.fishes} 
				     order={this.state.order} 
				     removeFromOrder={this.removeFromOrder}
				     /*{...this.state} this helps us to pass every object in the state down to the componenent*/
				 />
				 <Inventory 
				   addFish={this.addFish} 
				   loadSampleFishes={this.loadSampleFishes}
				   fishes={this.state.fishes}
				   updateFishes={this.updateFishes}
				   deleteFish={this.deleteFish}
				   storeId={this.props.match.params.storeId}
				   getUserInfo={this.getUserInfo}
				   />
			</div>
	);
  }
}
export default App; 