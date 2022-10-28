
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import './index.css';
import Layout from './pages/layout';
import Login from './pages/login';
import MentorGuided from './pages/mentorGuided';
import SelfStudyMenu from './pages/selfStudyMenu';

export default function Content() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MentorGuided />} />
          <Route path='SelfStudyMenu' element={<SelfStudyMenu />} />
          <Route path='MentorGuided' element={<MentorGuided />} />
         <Route path="*" element={<MentorGuided />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// const menu = ReactDOM.createRoot(document.getElementById('menu'));
// menu.render(<Layout />);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Content />);
