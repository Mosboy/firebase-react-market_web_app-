import React from "react";
import PropTypes from "prop-types"
import "./AddFishForm.css"
class AddFishForm extends React.Component{
	nameRef=React.createRef()
	priceRef=React.createRef()
    statusRef=React.createRef()
    descRef=React.createRef()
    imageRef=React.createRef()

    static propTypes = {
    	addFish: PropTypes.func 
    }

	createFish=event=>{
		event.preventDefault()
        const fish={
        	name:this.nameRef.current.value,
        	price:parseFloat(this.priceRef.current.value),
        	status:this.statusRef.current.value,
        	desc:this.descRef.current.value,
        	image:this.imageRef.current.value
        }
        	this.props.addFish(fish)//calling our function that was passed down from our parent componenet app.js,and passing our fish properties to it
	}
	render(){
		return(
				<form className="fish-edit" onSubmit={this.createFish}> 
					<input name="name" ref={this.nameRef}placeholder="Name" type="text"/>
					<input name="price" ref={this.priceRef} placeholder="Price" type="text"/>
					<select name="status" ref={this.statusRef}>
					  <option value="available">Fresh!</option>
					  <option value="unvavailable">Sold out</option>
					</select>
					<textarea name="desc" ref={this.descRef} placeholder="Desc"/>
					<input name="image" ref={this.imageRef}placeholder="Image" type="text"/>
					<button type="submit" style={{fontWeight:"bolder",fontStyle:"arial",backgroundColor:"lemmonchiffon"}}>+ Add fish</button>
				</form>
		)
	}
}
export default AddFishForm;