import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Blog from "./user/Blog";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route exact path="/:blogId" element={<PrivateRoute />}>
          <Route path="/:blogId" element={<Blog />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
