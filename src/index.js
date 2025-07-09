import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating />
    <StarRating size={24} color={"red"} />
    <StarRating size={34} color={"blue"} className={""} />
    <StarRating
      size={34}
      color={"orange"}
      messages={["Terrible", "Bad", "Okay", "Good", "Excellent!"]}
    />
  </React.StrictMode>
);
