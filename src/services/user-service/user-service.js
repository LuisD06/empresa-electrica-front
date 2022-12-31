import axios from '../../components/api/axios'

export const Login = async(usuario) => {
  const response = axios.post('/usuario/login', usuario);
  return (await response).data;
}

export const registerUser = async(usuario) => {
  const response = await axios.post('/usuario', usuario);
  console.log(response);
  return response.data;
}

export const registerOperator = async (user) => {
  const respnse = await axios.post('/usuario/operator', user);
  return respnse.data;
}