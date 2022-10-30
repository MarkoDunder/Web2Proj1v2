import React, { Fragment } from "react";
import ResultsTable from "../components/resultsTable";
import { Hero, HomeContent } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Round2 from "../components/round2";
const SecondRound = () => (
  <Fragment>
    <Hero />
    <hr />
    <h1>Round 2</h1>
    <Round2/>
  </Fragment>
);

export default SecondRound;