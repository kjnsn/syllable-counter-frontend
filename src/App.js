import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

    this.analyzeText = this.analyzeText.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  analyzeText() {
    console.log(this.state.text);
  }

  updateText(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <textarea value={this.state.text} onChange={this.updateText} />
        <button onClick={this.analyzeText} value="Analyze" />
      </div>
    );
  }
}

export default App;
