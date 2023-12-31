import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated  } from "../auth";

const isActive = (history, path) => {
  if(history.location.pathname === path) {
    return {color: '#ff9900'}
  } else {
    return {color: '#ffffff'}
  }
}

const Menu = (props) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(props.history, '/')} to="/">Home</Link>
      </li>
      {isAuthenticated() && isAuthenticated().role === "user" && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive(props.history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().role === "admin" && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive(props.history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
        </li>
      )}
      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link className="nav-link" style={isActive(props.history, '/signin')} to="/signin">Signin</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" style={isActive(props.history, '/signup')} to="/signup">Signup</Link>
          </li>
        </>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span className="nav-link" style={{ cursor: 'pointer', color: '#ffffff' }} onClick={() => signout(() => {
            props.history.push('/')
          })}>Signout</span>
        </li>
        )
      }
    </ul>
  </div>
);

export default withRouter(Menu);
