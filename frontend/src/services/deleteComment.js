import axios from "axios";
const remove = (commentId) => {
    return axios.delete(`http://localhost:6060/api/v1/deleteComment/${commentId}`);
}

const deleteComment={remove};
export default deleteComment;