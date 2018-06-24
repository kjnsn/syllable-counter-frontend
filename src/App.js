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
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  analyzeText() {
    if (this.state.loading) {
      return;
    }

    this.setState({
      loading: true
    });
    fetch(API_URI + "?text=" + this.state.text)
      .then(response => response.json())
      .then(results => this.setState({ loading: false, results: results }));
  }

  onKeyPressed(e) {
    if (e.key === "Enter") {
      this.analyzeText();
    }
  }

  updateText(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <h5>
            Syllable Counter: counts the number of syllables in a sentence
          </h5>
        </div>
        <div className="row">
          <input
            placeholder="Enter text here"
            value={this.state.text}
            onChange={this.updateText}
            onKeyPress={this.onKeyPressed}
          />
        </div>
        <div className="row">
          <span>
            Syllables: <Analyzer results={this.state.results} />
          </span>
        </div>
        <div className="row">
          {this.state.loading ? (
            <Spinner />
          ) : (
            <button onClick={this.analyzeText}>Analyze</button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
