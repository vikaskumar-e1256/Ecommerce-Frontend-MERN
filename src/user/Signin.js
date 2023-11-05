import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: 'bugokokydo@mailinator.com',
    password: 'Pa$$w0rd!',
    errors: {
      email: '',
      password: '',
    },
    success: false,
    loading: false,
    redirectToReferrer: false,
  });

  // Grab the value for sending to the api
  const { email, password, success, errors, loading, redirectToReferrer } = values;

  // Higher order function
  const handleChange = formInputName => event => {
    setValues({
      ...values, error: false,
      errors: { ...values.errors, [formInputName]: '' },
      [formInputName]: event.target.value
    });
  }

  // Submit the form
  const formSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          const errorResponse = data.error;
          setValues({
            ...values,
            errors: {
              email: errorResponse.email || '',
              password: errorResponse.password || '',
            },
            success: false,
            loading: false,
          });
        } else if (!data.success) {
          const errorResponse = data.message;
          setValues({
            ...values,
            email: '',
            password: '',
            errors: {
              email: errorResponse,
            },
            success: false,
            loading: false,
          });
        } else {
          const token = data.token;
          authenticate(token, () => {
            setValues({
              ...values,
              email: '',
              password: '',
              errors: {
                email: '',
                password: '',
              },
              success: true,
              loading: false,
              redirectToReferrer: true,
            });
          });
        }
      })
    .catch(error => {
      console.error(error);
      setValues({ ...values, loading: false });
    });
  }

  // Form
  const signinForm = () => (
    <form>
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
        <span className="text-danger">{errors.email}</span>
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
        <span className="text-danger">{errors.password}</span>
      </div>

      <button type="submit" onClick={formSubmit} className="btn btn-primary">{loading ? "Loading..." : "Submit"}</button>
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
  if (redirectToReferrer) {
    return <Redirect to="/" />;
  }
  return (
    <Layout title="Signin Page" description="Signin to Laravel React E-commerce App" className="container col-md-8 offset-md-2">
      {showSuccess()}
      {signinForm()}
    </Layout>
  );
};

export default Signin;
