import axios from '../../components/api/axios';

export const getMedicion = async (type, data) => {
  const response = await axios.post(`/medicion/${type}`, data);
  return response.data;
}