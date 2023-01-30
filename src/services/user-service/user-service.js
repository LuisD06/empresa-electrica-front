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
  const response = await axios.post('/usuario/operator', user);
  return response.data;
}

export const validateUser = async(cedula) => {
  const data = {
    cedula : cedula
  }
  const response = await axios.post('/usuario/verify', data);
  return response.data;
}

export const getByCedula = async(cedula) => {
  const response = await axios.get(`/usuario/${cedula}`);
  return response.data;
}

export const addMedidor = async(data) => {
  const response = await axios.post('/usuario/medidor',data);
  return response.data;
}
