import React,{Fragment} from "react";
import PropTypes from "prop-types";
import {getFunName} from "../Helper"
import "./Store_picker.css";

class StorePicker extends React.Component{
    myInput=React.createRef();//this is creating a reference object that we can use to get the properties of a dom element
    static propTypes = {
    	history: PropTypes.object
    }
	goToStore= event =>{
		//1.Stop the form from submitting
            event.preventDefault();
		//2.get the text from that input
		    const storeName=this.myInput.current.value//this will get the value of the input tag
		//3.change the page to /store/whatever the user entered
		    this.props.history.push(`/store/${storeName}`)
	}
	render(){
		return(
			<Fragment>
		     {/*React can not return more than one parent element, that why we use fragment of react object to return more than one react object*/ }
				<p style={{background:"goldenrod",color:"silver",width:"35px"}}>Fish!</p>
			<form action=" " className='store-picker' onSubmit={this.goToStore}>
	           <h2>Please Enter A store</h2>
	           <input 
	             type="text"
	             ref={this.myInput/*we are calling the myInput object here to be able to get the properties of the element "input"*/}
	             required
	             placeholder="Store Name" 
	             defaultValue={getFunName()/*react does not use the keyword value in input,it only accept the keyword defaultValue*/}
	            />
	           <button type="submit">Visit Store </button>
			</form>
			 </Fragment>
		    )
	    }
    }
export default StorePicker;