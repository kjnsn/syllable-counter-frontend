import React from "react";
import ReactDOM from "react-dom";
import Analyzer from "./Analyzer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Analyzer results={["he-llo", "world"]} />, div);

  expect(div.querySelector("div").innerHTML).toEqual("3");

  ReactDOM.unmountComponentAtNode(div);
});
