import React, {useState, useEffect} from 'react';
import { useAuth0} from "@auth0/auth0-react";
import { Button, Table, Form } from 'react-bootstrap';
//import commentServiceR1 from './services/commentServiceR2'
import CreateACommentService from '../services/createACommentService';
import deleteComment from '../services/deleteComment';
import axios from 'axios';
import uuid from 'react-uuid';

function Comments1st() {
  const {user, isAuthenticated}=useAuth0();
  let usersId="2a7";
  const userName=user!=null ? user.name : "";
  const adminName="admin@admin.com";
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
  let roundId= Math.floor(Math.random() * (18 - 1 + 1)) + 1;
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
        let response= await commentServiceR1.get().then(response => {
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

  /*const handleEditInput=(e)=>{
    
  }*/

  let{comment_id,comment_text, username, timecreated, commRoundId, userId}=comments;
  const addComment=()=>{
    /*CreateACommentService.create(comments).then(response =>{
      setCommentArray(response.data);*/
      axios.post('https://project1-backend3.onrender.com/api/v1/comment',{
      comment_id:uuid(),
      user_id:comments.userId,
      username:comments.username,
      timeCreated:dateFormated,
      comment_text:comments.comment_text,
      commRoundId:comments.commRoundId
    }).then(()=>{
      console.log("success");
    })
    }

  function handleChange(){
  setCommentArray([...commentArray, {comment_text,comment_id, username, timecreated, commRoundId, userId}]);
  console.log(commentArray);
  addComment();
}
  
  const removeComment= async(comment_id, usersName)=>{
    
    if((usersName===(userName))|| user.name==adminName){
    /*let response= await deleteComment.remove(props).then(()=>{
      console.log("deleted");
    })*/
      console.log(usersName);
      const response= await axios.delete(`https://project1-backend3.onrender.com/api/v1/deleteComment/${comment_id}`).then(
        ()=>{console.log("success");}
      )
      
  }
   else{
    console.log("You don't have permission");
    alert("You don't have permission");
   }
  
}
  const editComment=async(text, usersName, comment_id)=>{
    if((usersName===(userName))|| user.name==adminName){
        const response = await axios.put(`https://project1-backend3.onrender.com/api/v1/updateComment/${comment_id}`, {
          comment_text: text
        }).then(
          ()=>{console.log("comment altered");}
        )
    }
    setIsClicked(false);
  }
  const handleButtonClick=()=>{
    setIsClicked(true);
  }
  
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
          commentArray.map((comment)=>{
            return(<tr key={comment.comment_id}>
              <td>{comment.username}</td>
              <td>{comment.timecreated}</td>
              <td>{comment.comment_text}</td>
              <td><Button variant='primary' onClick={handleButtonClick}>Edit</Button></td>
              <td><Button variant='primary' onClick={()=>removeComment(comment.comment_id, comment.username)} >Delete</Button></td>
            </tr>)
          })
        }
        </tbody>
      </Table>
      {isClicked &&
      <div>
      <input type="text" value={comments.comment_text} id="text" name="text" placeholder='edit your comment' onChange={handleInputChange} ></input>
      <br/>
      <Button variant='primary' onClick={()=>editComment(comments.comment_text, comments.username, comments.comment_id)}> Edit your comment</Button>
      </div>
      }
    </div>
  )
}
export default Comments1st;