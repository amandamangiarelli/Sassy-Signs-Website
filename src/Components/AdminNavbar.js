import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
      <div>
          <Link to="/admin/home">Home</Link>
          <br></br>
          <Link to="/admin/signs">Signs</Link>
          <br></br>
          <Link to="/admin/reviews">Reviews</Link>
          <br></br>
          <Link to="/admin/popup">Pop-Up</Link>
          <br></br>
          <Link to="/admin/imagegallery">Image Gallery</Link>
      </div>
  );
};

export default AdminNavbar;