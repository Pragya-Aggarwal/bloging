import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blogs from '../components/Blogs';
import UsersTable from '../components/UsersTable';
import BlogsAddForm from '../components/BlogsAddForm';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blogs />} />  {/* Default route to Blogs */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/addBlogs" element={<BlogsAddForm />} />
        <Route path="/users" element={<UsersTable />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
