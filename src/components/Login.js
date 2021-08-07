import React from "react";
import PropTypes from "prop-types";

const Login = props => (
     <nav className="login">
      <h2>INVENTORY LOGIN</h2>
      <em>Sign In to manage your store inventory</em>
      <button className="github" onClick={()=> props.authenticate("Github")}>Log In With Github</button>
      <button className="yahoo" onClick={()=> props.authenticate("yahoo.com")}>Log In With Yahoo</button>
      <button className="facebook" onClick={()=> props.authenticate("Facebook")}>Log In With Facebook</button>
     </nav>
      )

Login.propTypes = {
	authenticate: PropTypes.func.isRequired
}

export default Login;