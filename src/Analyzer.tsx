import React from "react";

const countSyllables = (results: string[]): number => {
  return results
    .map((word: string) => {
      return word.split("-").length;
    })
    .reduce((a: number, b: number) => a + b, 0);
};

const Analyzer = (props: Props) => <span>{countSyllables(props.results || [])}</span>;

export interface Props {
  results: string[];
}

export default Analyzer;
