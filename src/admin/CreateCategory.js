import React, {useState} from "react";
import Layout from '../core/Layout';
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name })
      .then(data => {
      if (data.status === 422) {
        setError('Category name should be unique.')
        setLoading(false)
      } else {
        setError('')
        setSuccess(true);
        setLoading(false);
      }
    });
  };

  // Category form
  const categoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputCategoryName">Name</label>
        <input
          type="text"
          onChange={handleChange}
          className="form-control"
          id="exampleInputCategoryName"
          placeholder="Enter category name"
        />
        <span className="text-danger">{error}</span>
      </div>
      <button type="submit" className="btn btn-primary">{loading ? "Loading..." : "Create Category"}</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Category successfully created.</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">Go Back</Link>
    </div>
  );

  return (
    <Layout title="Add New Category" description={`G'Day ${isAuthenticated().name}, ready to add new category.`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
