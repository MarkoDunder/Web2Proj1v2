import axios from "axios";
const remove = (commentId) => {
    return axios.delete(`https://project1-backend3.onrender.com/api/v1/deleteComment/${commentId}`);
}

const deleteComment={remove};
export default deleteComment;