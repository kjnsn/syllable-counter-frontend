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

  const textarea = div.querySelector("input");
  textarea!.value = "hello world";
  ReactTestUtils.Simulate.change(textarea!);

  expect(div.querySelector("input")!.value).toEqual("hello world");

  ReactDOM.unmountComponentAtNode(div);
});

it("Analyzes the text", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);

  (global as any).fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => ["he-llo", "world"],
    })
  );

  updateText(div, "hello world");
  const button = div.querySelector("button")!;
  ReactTestUtils.Simulate.click(button);

  // Give the fetch promise a chance to resolve before unmounting.
  return new Promise<void>((resolve) =>
    process.nextTick(() => {
      ReactDOM.unmountComponentAtNode(div);
      resolve();
    })
  );
});

function updateText(div: HTMLDivElement, text: string) {
  const textarea = div.querySelector("input")!;
  textarea.value = text;
  ReactTestUtils.Simulate.change(textarea);
}
