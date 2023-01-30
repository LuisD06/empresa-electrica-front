import axios from '../../components/api/axios'

export const createMedidor = async (medidor) => {
  const response = await axios.post('/medidor', medidor);
  return response.data;
}

export const getMedidorList = async () => {
  const response = await axios.get('/medidor');
  return response.data;
}

export const getMedidorListBySuministro = async (suministro) => {
  const response = await axios.get(`/medidor/${suministro}`);
  return response.data;
}

export const getInstancesByClient = async(usuario) => {
  const response = await axios.get(`/medidor/usuario/${usuario}`);
  return response.data;
}