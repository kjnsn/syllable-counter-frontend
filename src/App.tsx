import React, { useState } from "react";

import "./normalize.css";
import "./skeleton.css";
import "./App.css";

import Spinner from "./Spinner/Spinner";
import Analyzer from "./Analyzer";

const API_URI = process.env["REACT_APP_LAMBDA_URI"];


function App() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onKeyPressed = (e: any) => {
    if (e.key === "Enter") {
      fetchResults();
    }
  };

  const fetchResults = () => {
    setLoading(true);

    fetch(API_URI + "?text=" + text)
      .then(response => response.json())
      .then(results => {
        setResults(results);
        setLoading(false);
      });
  }

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
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={onKeyPressed}
        />
      </div>
      <div className="row">
        <span>
          Syllables: <Analyzer results={results} />
        </span>
      </div>
      <div className="row">
        {loading ? (
          <Spinner />
        ) : (
            <button onClick={fetchResults}>Analyze</button>
          )}
      </div>
    </div>
  );
}


export default App;
