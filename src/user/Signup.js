import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    errors: {
      name: '',
      email: '',
      password: '',
    },
    success : false,
  });

  // Higher order function
  const handleChange = formInputName => event => {
    setValues({
      ...values, error: false,
      errors: { ...values.errors, [formInputName]: '' },
      [formInputName]: event.target.value
    });
  }

  // Grab the value for sending to the api
  const { name, email, password, success } = values;

  // Submit the form
  const formSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password })
      .then(data => {
        console.log(data);
        if (data.error) {
          const errorResponse = data.error;
          setValues({
            ...values,
            errors: {
              name: errorResponse.name || '',
              email: errorResponse.email || '',
              password: errorResponse.password || '',
            },
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            errors: {
              name: '',
              email: '',
              password: '',
            },
            success: true,
          });
        }
      })
    .catch(error => {
      console.error(error);
    });
  }


  // Form
  const signupForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputName">Name</label>
        <input
          type="text"
          onChange={handleChange('name')}
          value={name}
          className="form-control"
          id="exampleInputName"
          placeholder="Enter name"
        />
        <span className="text-danger">{values.errors.name}</span>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          onChange={handleChange('email')}
          value={email}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <span className="text-danger">{values.errors.email}</span>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          onChange={handleChange('password')}
          value={password}
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
        <span className="text-danger">{values.errors.password}</span>
      </div>

      <button type="submit" onClick={formSubmit} className="btn btn-primary">Submit</button>
    </form>
  );

  // Success
  const showSuccess = () => (
    <div className="alert alert-info alert-dismissible fade show" style={{ display: success ? '' : 'none' }} role="alert">
      New account is created. Please <Link to="/signin">Login</Link>.
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  return (
    <Layout title="Signup Page" description="Laravel React E-commerce App" className="container col-md-8 offset-md-2">
      {showSuccess()}
      {signupForm()}
    </Layout>
  );
};

export default Signup;
