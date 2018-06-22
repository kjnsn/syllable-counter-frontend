import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("updates the text area", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);

  const textarea = div.querySelector("textarea");
  textarea.value = "hello world";
  ReactTestUtils.Simulate.change(textarea);

  expect(div.querySelector("textarea").innerHTML).toEqual("hello world");

  ReactDOM.unmountComponentAtNode(div);
});
