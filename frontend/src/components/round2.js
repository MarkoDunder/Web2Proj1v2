import React,{useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import resultsService from '../services/resultsService';
import {round2} from "../results"
function Round2() {
  
  const [results, setResults]=useState([]);
  const roundNumber=2;
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
    }*/
    
    let r2=JSON.parse(localStorage.getItem("Runda2MD"));
    console.log(round2);
    if(!r2){
      localStorage.setItem("Runda2MD",JSON.stringify(round2));
      r2=JSON.parse(localStorage.getItem("Runda2MD"));
    }
    
    setResults(r2.games2);
    
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

export default Round2