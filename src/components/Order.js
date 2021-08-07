import React from "react";
import PropTypes from "prop-types"
import {formatPrice} from "./Helper";
class Order extends React.Component{
	static propTypes = {
		fishes: PropTypes.func,
		order: PropTypes.func,
		removeFromOrder: PropTypes.func
	}
	renderOrder=key=>{
		const fish=this.props.fishes[key];/*this get all the properties of the fishes(name,price "ETC")
		console.log(fish)*/
		const count=this.props.order[key];/*this get the value of how many times the fish is clicked*/
		const isAvailable=fish && fish.status==="available"/*isAvailable will be equal to available, if fish and fish.status is present */
		if(!isAvailable){
			return <li>Sorry {fish ? fish.name : "fish"} is no longer available</li>
		}
	    return( 
	         
	    	<li>
		        {count} lbs {fish.name}
		        {formatPrice(count * fish.price)}
		        <button className="removeFromOrder" onClick={()=> this.props.removeFromOrder(key)}>&times;</button>
	        </li>

	        );
	}

	render(){
					const orderIds=Object.keys(this.props.order)//converting it to an array to be able to loop through it and get all the keys in the order
					const total=orderIds.reduce((prevTotal,key)=>{
						/*Note:prevTotal is the argument that get all the total of the reduce function which is given below a default value of 0;*/
									console.log(key)
									const fish=this.props.fishes[key];/*this get all the properties of the fishes(name,price "ETC")
									console.log(fish)*/
									const count=this.props.order[key];/*this get the value of how many times the fish is clicked*/
									console.log(count)
									const isAvailable=fish && fish.status === "available";/* this check maybe the fish to be ordered is availble or not*/
							if(isAvailable){
									return prevTotal + (count * fish.price);
								}
							return prevTotal;
					},0);
					return (
								<div className="order">
							          <h2>Order</h2>
							          <ul className="order_items">{orderIds.map(this.renderOrder)}</ul>
							           <div className="total">
							            Total:
							           <strong>{formatPrice(total)/* this imported function convert the total to US DOLLARS*/}</strong>
							           </div>
							    </div>
							)
				}
}
export default Order;