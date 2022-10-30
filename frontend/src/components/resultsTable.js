import React,{useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import resultsService from '../services/resultsService';
import {round1} from '../results';
function ResultsTable() {

  const [results, setResults]=useState([]);
  const roundNumber=1;
  useEffect(() =>{
    /*const fetchResults = async () =>{
      try {
        let response= await resultsService.get(`/${roundNumber}`).then(response => {
          console.log(response);
          setResults(response.data.data);
        });
        

      } catch (error) {
        console.log(error);
      }
    }
    fetchResults();*/
   
    let r1=JSON.parse(localStorage.getItem("Runda1MD"));
    console.log(round1);
    if(!r1){
      localStorage.setItem("Runda1MD",JSON.stringify(round1));
      r1=JSON.parse(localStorage.getItem("Runda1MD"));
    }
    
    setResults(r1.games1);
  }, []);


  return (
    <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Team</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Draws</th>
              <th>Goal Difference</th>
              <th>Total points</th>
            </tr>
          </thead>
          <tbody>
          {results && results.map((result) =>
                <tr key={result.round_id}>
                    <td>{result.Team}</td>
                    <td>{result.wins}</td>
                    <td>{result.losses}</td>
                    <td>{result.draws}</td>
                    <td>{result.goal_difference}</td>
                    <td>{result.total_points}</td>
                </tr>
            )}
          </tbody>
      </Table>
    </div>
  )
}

export default ResultsTable