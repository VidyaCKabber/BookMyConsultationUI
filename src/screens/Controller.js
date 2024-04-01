import React, { useEffect } from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../common/header/Header";

// const Controller = () => {
//   const baseUrl = "/api/v1/";
//   return (
//     <Router>
//       <div className="main-container">
//         {/* <Route
//           exact
//           path="/"
//           render={(props) => <Home {...props} baseUrl={baseUrl} />}
//         /> */}
//         <Header/>
//       </div>
//     </Router>
//   );
// };

const Controller = () => {
  useEffect(() => {
    document.title = "Doctor Finder"; // Change the title here
  }, []);

  return (
    <Router>
      <div className="main-container">
        <Header />
        <Home />
        {/* <Route exact path="/" component={Header} />
        <Route exact path="/home" component={Home} />
        <Route path="/login" component={Login} /> */}

        {/* <Route path="/register" component={Register} /> */}
        {/* Add more routes as needed */}
      </div>
    </Router>
  );
}
export default Controller;
