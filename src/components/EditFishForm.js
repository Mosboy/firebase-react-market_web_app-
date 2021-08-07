import React from "react";
import PropTypes from "prop-types"
class EditFishForm extends React.Component {
	static propTypes = {
		fish: PropTypes.shape({
			image: PropTypes.string,
			name: PropTypes.string,
			desc: PropTypes.string,
			status: PropTypes.string,
			price: PropTypes.number
		}),
		index: PropTypes.string,
		updateFish: PropTypes.func
	}
	handleChange = (event) =>{
		console.log(event.currentTarget);
		//update that fish
		//1. Take a copy of the current fish
		const updatedFish = {
			...this.props.fish,
			[event.currentTarget.name]: event.currentTarget.value//this line of code will get the name value of the above spread object and change it to the value that event.currentTarget.value produces
		}
		console.log(event.currentTarget.name)
		console.log(event.currentTarget.value)
		console.log(updatedFish)
		this.props.updateFishes(this.props.index, updatedFish)
	}
	render() {
		return (
			<div className="editFish fish-edit">
				<input
					type="text"
					name="name"
					onChange={this.handleChange}
					value={this.props.fish.name}
				/>
				<input
					type="text"
					name="price"
					onChange={this.handleChange}
					value={this.props.fish.price}
				/>
				<select
					type="text"
					name="status"
					onChange={this.handleChange}
					value={this.props.fish.status}
				>
					<option onChange={this.handleChange} value="available">
						Fresh!
					</option>
					<option onChange={this.handleChange} value="unavailable">
						Sold Out!
					</option>
				</select>
				<textarea
					name="desc"
					onChange={this.handleChange}
					value={this.props.fish.desc}
				/>
				<input
					type="text"
					name="image"
					onChange={this.handleChange}
					value={this.props.fish.image}
				/>
				<button className="removeFish" onClick={() => this.props.deleteFish(this.props.index)} >Remove fish</button>
			</div>
		);
	}
}

export default EditFishForm;
