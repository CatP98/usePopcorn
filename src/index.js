import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";
// import { useState } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating />
    <StarRating size={24} color={"red"} />
    <StarRating size={34} color={"blue"} className={""} />
    <StarRating
      size={34}
      color={"orange"}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing!"]}
      defaultRating={3}
    />
    <Test /> */}
  </React.StrictMode>
);

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />

//       <p>Tihis movie ha a rate of {movieRating} stars.</p>
//     </div>
//   );
// }
