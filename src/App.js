import { useQuery, useSubscription } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import "./styles.css";

const CURRENT_TIME_SUBSCRIPTION = gql`
  subscription OnCurrentTime {
    timePassed
  }
`;

const CURRENT_NUMBER_SUBSCRIPTION = gql`
  subscription OnCurrentNumber {
    numberIncremented
  }
`;

const CURRENT_NUMBER_QUERY = gql`
  query Query {
    currentNumber
  }
`;

const Clock = function () {
  const { data, loading, error } = useSubscription(CURRENT_TIME_SUBSCRIPTION);
  if (loading) {
    return "loding...";
  }
  if (error) {
    return "Error!";
  }
  return <p>{data.timePassed}</p>;
};

const NumberIncremented = function () {
  const { data, loading, error } = useSubscription(CURRENT_NUMBER_SUBSCRIPTION);
  if (loading) {
    return "loding...";
  }
  if (error) {
    return "Error!";
  }
  return <p>{data.numberIncremented}</p>;
};

const CurrentNumber = function () {
  const { data, loading, error } = useQuery(CURRENT_NUMBER_QUERY);
  if (loading) {
    return "loding...";
  }
  if (error) {
    return "Error!";
  }
  return <p>{data.currentNumber}</p>;
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Clock />
      <CurrentNumber />
      <NumberIncremented />
    </div>
  );
}
