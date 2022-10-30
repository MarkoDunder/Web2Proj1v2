import React, {useState, useEffect} from 'react';
import { useAuth0} from "@auth0/auth0-react";
import { Button, Table, Form } from 'react-bootstrap';
//import commentServiceR1 from './services/commentServiceR2'
import CreateACommentService from '../services/createACommentService';
import deleteComment from '../services/deleteComment';
import axios from 'axios';
import uuid from 'react-uuid';
import {comments1} from '../commentObj'

function Comments1st() {
  const {user, isAuthenticated}=useAuth0();
  let usersId="2a7";
  const userName=user!=null ? user.name : "";
  const adminName="admin@admin.com";
  const[text,setText]=useState("");
  const[index,setIndex]=useState();
  if(user!=null){
     usersId="272b79e0-564f-11ed-9b6a-0242ac120002";
      if(user.name === "user1@user1.com"){
        usersId="cc757c10-5650-11ed-9b6a-0242ac120002"
  }
      else if(user.name === "user2@user2.com"){
        usersId="e3a5ecf8-5650-11ed-9b6a-0242ac120002"
  }

  }
  
  let date=new Date();
  let dateFormated=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  let roundId= Math.floor(Math.random() * (218 - 200 + 1)) + 200;
  const [isClicked, setIsClicked]=useState(false);
  const [comments, setComments]=useState({
    comment_id:"",
    comment_text:"",
    username:user!=null ? user.name : "",
    timecreated:dateFormated,
    commRoundId:roundId,
    userId:user!=null ? usersId : ""
  });
  const [commentArray, setCommentArray] = useState([]);
  //const [hasPermission, setHasPermission] = useState("false");
  //const userName= user!=null ? user.name : "";
  
  /*useEffect(() =>{
    const fetchResults = async () =>{
      try {
        let response= await commentsServiceR2.get().then(response => {
          console.log(response);
          setCommentArray(response.data.data);
        });
        

      }
       catch (error) {
        console.log(error);
      }
    }
    fetchResults();
  }, []);*/
  
  const handleInputChange = (e) => {
    setComments({ ...comments,
      comment_text: e.target.value,
       
      });
};



  const handleEditChange=(e)=>{
    setText(e.target.value);

  }

  let{comment_id,comment_text, username, timecreated, commRoundId, userId}=comments;
  const addComment=()=>{
    
    }

  function handleChange(){
    const newComment={"content1":commentArray}
    newComment.content1.push({comment_text,comment_id, username, timecreated, commRoundId, userId})
    localStorage.setItem("Comments1",JSON.stringify(newComment));
    console.log(newComment);
    setCommentArray(newComment.content1);
  }

  
  
  const removeComment=(index)=>{
    const toDelete=localStorage.getItem("Comments1");
    let content=JSON.parse(toDelete);
    let content1=content.content1;
    content1.splice(index,1);
    const newComment={"content1":content1}
    localStorage.setItem("Comments1",JSON.stringify(newComment));
    setCommentArray(content1);
}
  const editComment=()=>{
    const toEdit=localStorage.getItem("Comments1");
    let content=JSON.parse(toEdit);
    let content1=content.content1;
    content1[index].comment_text=text;
    const newComment={"content1":content1}
    localStorage.setItem("Comments1",JSON.stringify(newComment));
    setCommentArray(content1);
  }
  const handleButtonClick=(index)=>{
    setIsClicked(true);
    setIndex(index);
  }

  useEffect(() =>{
   
    
    let comm1=JSON.parse(localStorage.getItem("Comments1"));

    if(!comm1){
      localStorage.setItem("Comments1",JSON.stringify(comments1));
      comm1=JSON.parse(localStorage.getItem("Comments1"));
    }
    console.log(comm1)
    setCommentArray(comm1.content1);
    
  }, []);
  
  return (
    <div>
      {isAuthenticated &&
        (<div>
            
            <input type="text" value={comments.comment_text} id="text" name="text" placeholder='enter your comment' onChange={handleInputChange} required={true}></input>
            <Button variant="primary" onClick={handleChange} > Add comment</Button>
            
        </div>)
        
        }


      <Table>
        <thead>
          <th scope="col">User Name</th>
          <th scope="col">Time created</th>
          <th scope="col">Comment</th>
        </thead>
        <tbody>
        {
          commentArray.map((comment,index)=>{
            return(<tr key={index}>
              <td>{comment.username}</td>
              <td>{comment.timecreated}</td>
              <td>{comment.comment_text}</td>
              <td><Button variant='primary' onClick={()=>handleButtonClick(index)}>Edit</Button></td>
              <td><Button variant='primary' onClick={()=>removeComment(comment.comment_id, comment.username)} >Delete</Button></td>
            </tr>)
          })
        }
        </tbody>
      </Table>
      {isClicked &&
      <div>
      <input type="text" value={text} id="text" name="text" placeholder='edit your comment' onChange={handleEditChange} ></input>
      <br/>
      <Button variant='primary' onClick={()=>editComment()}> Edit your comment</Button>
      </div>
      }
    </div>
  )
}

export default Comments1st;