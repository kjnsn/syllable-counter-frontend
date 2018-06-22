import React from "react";

const countSyllables = results => {
  return results
    .map(word => {
      return word.split("-").length;
    })
    .reduce((a, b) => a + b, 0);
};

const Analyzer = props => <div>{countSyllables(props.results || [])}</div>;

export default Analyzer;
