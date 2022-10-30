import axios from "axios";

const create = (commentArray) => {
    return axios.post(`http://localhost:6060/api/v1/comment`, commentArray);
}

const CreateACommentService = { create };

export default CreateACommentService