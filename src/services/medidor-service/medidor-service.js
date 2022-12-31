import axios from '../../components/api/axios'

export const createMedidor = async (medidor) => {
  const response = await axios.post('/medidor', medidor);
  return response.data;
}

export const getMedidorList = async () => {
  const response = await axios.get('/medidor');
  return response.data;
}