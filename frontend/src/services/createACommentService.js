import axios from "axios";

const create = (commentArray) => {
    return axios.post(`https://project1-backend3.onrender.com/api/v1/comment`, commentArray);
}

const CreateACommentService = { create };

export default CreateACommentService