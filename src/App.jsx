import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ScrollToTop from "./Components/Elements/ScrollToTop";
import Main from "./Pages/Main";
import ProjectDetails from "./Pages/ProjectsPage/ProjectDetails";


const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Main />} />
        <Route path="Main" element={<Main />} />
        <Route path="project-details" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
