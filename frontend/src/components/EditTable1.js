import React,{useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function EditTable1() {
    const {user, isAuthenticated}= useAuth0();
    const [ranking, setRanking]= useState({
        sport_team_id:0,
        wins:0,
        losses:0,
        draws:0,
        goal_difference:0,
        total_points:0
    });
    let userName= user!=null ? user.name : "";

    const handleWinChange = (e) => {
        setRanking({ ...ranking, wins: e.target.value });
        console.log(ranking);
    };
    const handleLossesChange = (e) => {
        setRanking({ ...ranking, losses: e.target.value });
        console.log(ranking);
    };
    const handleDrawsChange = (e) => {
        setRanking({ ...ranking, draws: e.target.value });
        console.log(ranking);
    };
    const handleGDChange = (e) => {
        setRanking({ ...ranking, goal_difference: e.target.value });
        console.log(ranking);
    };
    const handleTPChange = (e) => {
        setRanking({ ...ranking, total_points: e.target.value });
        console.log(ranking);
    };
    const handleStIdChange = (e) => {
        setRanking({ ...ranking, sport_team_id: e.target.value });
        console.log(ranking);
    };

    const editResult=()=>{
        const editted=axios.put("/api/v1/updateResult/teamId1").then(()=>{
            console.log("result eddited")
        })
    }

  return (
    <div>
        {( isAuthenticated && user.name==="admin@admin.com")&&(
            <div>
                <Form>
                <label htmlFor="Order">Team Alphabetic order:</label>
                <Form.Control id="Order" required={true} type="number" placeholder="Enter Team's position in alphabetical order" name="sport_team_id" onChange={handleStIdChange}/>
                </Form>

                <Form>
                <label htmlFor="wins">Wins</label>
                <Form.Control id="wins" required={true} type="number" placeholder="Enter team's number of wins" name="wins" onChange={handleWinChange}/> 
                </Form>

                <Form>
                <label htmlFor="losses">Losses</label>
                <Form.Control id="losses" required={true} type="number" placeholder="Enter team's number of losses" name="losses" onChange={handleLossesChange}/> 
                </Form>

                <Form>
                <label htmlFor="draws">Draws</label>
                <Form.Control id="draws" required={true} type="number" placeholder="Enter team's number of draws" name="wins" onChange={handleDrawsChange}/> 
                </Form>

                <Form>
                <label htmlFor="goal_difference">Goal difference</label>
                <Form.Control id="goal_difference" required={true} type="number" placeholder="Enter team's goal difference" name="goal_difference" onChange={handleGDChange}/> 
                </Form>

                <Form>
                <label htmlFor="total_points">Total points</label>
                <Form.Control id="total_points" required={true} type="number" placeholder="Enter team's number of total points" name="total_points" onChange={handleTPChange}/> 
                </Form>
                <Button variant="outline-dark" onClick={editResult}>Confirm</Button>
            </div>
        )}
    </div>
  )
}

export default EditTable1