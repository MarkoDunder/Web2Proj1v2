import React, { Fragment } from "react";
import ResultsTable from "../components/resultsTable";
import { Hero, HomeContent } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, BrowserRouter, Route } from "react-router-dom";
import Round2 from "../components/round2";
import Round3 from "../components/round3";
import SecondRound from "../views/SecondRound";
import Comments1st from "../components/comments1st";
import Comments2nd from "../components/comments2nd";
import Schedule from "../components/Schedule";
import EditTable1 from "../components/EditTable1";

const Home = () => (
  
  <Fragment>
    <Hero />
    <hr />
    <h1>Round 1</h1>
    <ResultsTable/>
    <br/>
    <EditTable1/>
    <h3>Comments</h3>
    <Comments1st/>
    <br/>
    <h1>Round 2</h1>
    <Round2/>
    <br/>
    <h3>Comments</h3>
    <Comments2nd/>
    <br/>
    <h1>Round 3</h1>
    <Round3/>
    <h3>Comments</h3>
    <br/>
    <h2>Upcoming matches :</h2>
    <Schedule/>
  </Fragment>
);

export default Home;
