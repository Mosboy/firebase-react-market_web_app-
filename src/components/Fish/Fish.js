import React from "react";
import PropTypes from "prop-types"
import {formatPrice} from "../Helper"
import "./Fish.css"
class Fish extends React.Component{
    static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  }
	render(){
		const {image,name,price,desc,status}=this.props.details;
    const isavailable=status==="available"//that is if the status is available, the "isavailable will be set to true else will be set to false"
		return <li className="fish" role="img">
                <img 
                src={image} 
                alt={name}
                />
                <div className="name-desc-but">
                <h3 className="fish-name">
                   <em>{name}</em>
                   <span className="price">{formatPrice(price)}</span>
                </h3>
              <p className="desc">{desc}</p>
              <button 
                  disabled={!isavailable/* if isavailable is not avaliable, the disabled will be set to true which make the button disabled*/}
                  onClick={()=>this.props.addToOrder(this.props.index)}
                  >
                     {isavailable ? "Add To Cart" : "Sold Out"}
                  </button>
            </div>
		</li>
	}
}

export default Fish;