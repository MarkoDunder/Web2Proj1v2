/**
 * Required External Modules
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db= require("../db/pool-Index");
const { clientOrigins, serverPort } = require("./config/env.dev");

const { messagesRouter } = require("./messages/messages.router");
const crypto = require("crypto");
const { application } = require("express");

/**
 * App Variables
 */

const app = express();
const apiRouter = express.Router();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors({ origin: clientOrigins }));
app.use(express.json());

app.use("/api", apiRouter);

apiRouter.use("/messages", messagesRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

/**
 * Server Activation
 */

app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);

// dodano
/*if(process.env.NODE_ENV === 'production'){
    app.use(express.static());
}*/
app.get("/api/v1/roundResults/:roundNumber", async(req,res)=>{
  try {
      let roundNumber=[req.params.roundNumber];
      const roundResults = await db.query(
  "Select r.round_id, r.wins, r.losses, r.draws, r.goal_difference, r.total_points,st.name From rounds as r Left join sport_teams as st On (r.sport_team_id=st.team_id) Where r.round_number=$1 Order by r.wins desc, r.goal_difference desc", roundNumber        
      );

      res.status(200).json({
          status: 'success',
          data:roundResults.rows
      })
  } catch (error) {
      console.log(error);
  }
});

app.get("/api/v1/commentsR1", async(req, res) =>{
    try {
      const comments= await db.query(
    "select username, timeCreated, comment_text,comment_id, round_id  from comments, rounds as r where commRoundId=r.round_id and r.round_number=1;"
      )

      res.status(200).json({
          status:'success',
          data:comments.rows
      })
    }
     catch (error) {
      console.log(error.message);
    }
});

app.get("/api/v1/commentsR2",async(req,res)=>{
  try {
    const comments= await db.query(
  "select username, timeCreated, comment_text, round_id, comment_id  from comments, rounds as r where commRoundId=r.round_id and r.round_number=2;"
    )

    res.status(200).json({
        status:'success',
        data:comments.rows
    })
  }
   catch (error) {
    console.log(error.message);
  }
});

app.get("/api/v1/commentsR3",async(req,res)=>{
  try {
    const comments= await db.query(
  "select username, timeCreated, comment_text,comment_id, round_id  from comments, rounds as r where commRoundId=r.round_id and r.round_number=3;"
    )

    res.status(200).json({
        status:'success',
        data:comments.rows
    })
  }
   catch (error) {
    console.log(error.message);
  }
});

app.post("/api/v1/comment", async(req,res)=>{
    try {
      //let commentId=crypto.randomUUID();
      let userId=req.body.user_id;
      let userName=req.body.username;
      let timeCreated=req.body.timeCreated;
      let commentText=req.body.comment_text;
      let roundId=req.body.commRoundId;
      const commentToPost= await db.query(
        "Insert into comments(comment_id,user_id, username, timeCreated, comment_text, commRoundId) values($1, $2, $3, $4, $5, $6) returning*", [req.body.comment_id, req.body.user_id, req.body.username, req.body.timeCreated, req.body.comment_text, roundId]
      );

      res.status(200).json({
        status: 'success',
        data:commentToPost.rows
      });
    } 
    catch (error) {
      console.log(error.message);
    }
});

app.put("/api/v1/updateComment/:id", async (req,res)=>{
    try {
      let updatedId=req.params;
      let {updatedText}=req.body.text;
      const response= await db.query(
        "Update comments set comment_text=$1 where comment_id=$2",[req.body.text, req.params.id ]
      );

      res.status(200).json({
        status: 'success',
        data:response.rows
      })
    } 
    catch (error) {
      console.log(error.message);  
    }
});

app.put("/api/v1/updateResult/teamId1", async (req, res) => {
  try {
    let roundId=req.params.roundId;
    let wins=req.body.wins;
    let losses=req.body.losses;
    let draws=req.body.draws;
    let goal_difference=req.body.goal_difference;
    let total_points=req.body.total_points;
    let sport_team_id=req.body.sport_team_id;
    const response= await db.query(
      "Update rounds Set wins=$1, losses=$2, draws=$3, goal_difference=$4, total_points=$5 where sport_team_id=$6 and round_number=1",[wins, losses, draws, goal_difference, total_points, sport_team_id]
    )
    res.status(200).json({
      status: 'success',
      data:response.rows
    }); 
  }
   catch (error) {
    console.log(error.message); 
  }
})

app.put("/api/v1/updateResult/teamId2", async (req, res) => {
  try {
    let roundId=req.params.roundId;
    let wins=req.body.wins;
    let losses=req.body.losses;
    let draws=req.body.draws;
    let goal_difference=req.body.goal_difference;
    let total_points=req.body.total_points;
    let sport_team_id=req.body.sport_team_id;
    const response= await db.query(
      "Update rounds Set wins=$1, losses=$2, draws=$3, goal_difference=$4, total_points=$5 where sport_team_id=$6 and round_number=2",[wins, losses, draws, goal_difference, total_points, sport_team_id]
    )
    res.status(200).json({
      status: 'success',
      data:response.rows
    }); 
  }
   catch (error) {
    console.log(error.message); 
  }
})

app.put("/api/v1/updateResult/teamId3", async (req, res) => {
  try {
    let roundId=req.params.roundId;
    let wins=req.body.wins;
    let losses=req.body.losses;
    let draws=req.body.draws;
    let goal_difference=req.body.goal_difference;
    let total_points=req.body.total_points;
    let sport_team_id=req.body.sport_team_id;
    const response= await db.query(
      "Update rounds Set wins=$1, losses=$2, draws=$3, goal_difference=$4, total_points=$5 where sport_team_id=$6 and round_number=3",[wins, losses, draws, goal_difference, total_points, sport_team_id]
    )
    res.status(200).json({
      status: 'success',
      data:response.rows
    }); 
  }
   catch (error) {
    console.log(error.message); 
  }
})
app.delete("/api/v1/deleteComment/:id", async(req, res)=>{
    
  try {
    let id=req.params.id;
    const deletion= await db.query("Delete from comments where comment_id=$1", [id]);

    res.status(200).json("Review was successfully deleted");
    res.status(404).json("Review with specified id was not found");
    
  } 
  catch (error) {
    console.log(error.message);  
  }
})