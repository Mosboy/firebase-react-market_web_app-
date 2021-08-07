import React from "react";
import PropTypes from "prop-types"
class Header extends React.Component{
	render(){
		return(
          <header className='top'>
           <h1>
               Catch 
	           <span className="of">of</span>
	           <span className="the">the</span>
	            Day 
            </h1>
            <h3 className="tagline">
            	<span>{this.props.tagline}</span>
           </h3> 
          </header>
	   )
	}
}

Header.propTypes={
  tagline: PropTypes.string.isRequired/*this will tell the react that a prop of type string is required to be passed in here */
}
export default Header;