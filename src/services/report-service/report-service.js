import axios from '../../components/api/axios'

export const createReport = async (data) => {
  const response = await axios.post('/reporte', data);
  return response.data
}

export const getReports = async () => {
  const response = await axios.get('/reporte');
  return response.data;
}