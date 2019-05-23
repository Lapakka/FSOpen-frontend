import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newPost) => {
  const config = {
    headers: { 'Authorization': token }
};

  const response = await axios.post(baseUrl, newPost, config);
  return response.data;
};

const update = async (id, newData) => {
  const response = await axios.put(`${baseUrl}/${id}`, newData);
  return response.data;
};

export default { getAll, setToken, create, update };