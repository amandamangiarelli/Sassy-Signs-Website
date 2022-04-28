import React from 'react';
import { Link } from 'react-router-dom';

const SignsNav = () => {
  return (
      <div>
          <h1>Admin UI - Signs</h1>
            <p>selector for different sub pages</p>
          <Link to="/Components/Signs-Add">Add</Link>
          <br></br>
          <Link to="/Components/Signs-Edit">Edit</Link>
          <br></br>
          <Link to="/Components/Signs-Delete">Delete</Link>
        </div>
  );
};

export default SignsNav;