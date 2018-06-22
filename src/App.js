import React, { Component } from "react";

import "./normalize.css";
import "./skeleton.css";
import "./App.css";

import Spinner from "./Spinner/Spinner";
import Analyzer from "./Analyzer";

const API_URI = process.env["REACT_APP_LAMBDA_URI"];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      results: [],
      loading: false
    };

    this.analyzeText = this.analyzeText.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  analyzeText() {
    this.setState({
      loading: true
    });
    fetch(API_URI + "?text=" + this.state.text)
      .then(response => response.json())
      .then(results => this.setState({ loading: false, results: results }));
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
        <Analyzer results={this.state.results} />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <button onClick={this.analyzeText}>Analyze</button>
        )}
      </div>
    );
  }
}

export default App;
