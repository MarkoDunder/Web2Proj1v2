import axios from "axios";
const remove = (commentId) => {
    return axios.delete(`https://project1-backend2.onrender.com/api/v1/deleteComment/${commentId}`);
}

const deleteComment={remove};
export default deleteComment;