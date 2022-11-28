import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {UserContextProvider} from './state-management/store/UserContext';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import UsersPage from "./pages/UsersPage";
import AddProjectPage from "./pages/AddProjectPage";
import Protected from "./components/Protected"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContextProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/admin-register" element={<Protected><RegisterPage/></Protected>}/>
          <Route path="/project/:projectId" element={<ProjectPage/>}/>
          <Route path="/admin/users" element={<Protected><UsersPage/></Protected>}/>
          <Route path="/inspector/add-project" element={<Protected><AddProjectPage/></Protected>}/>
        </Routes>
      </Router>
    </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
