import axiosServerInstance from '../axiosServerInstance';

export const getCountries = async () => {
  const response = await axiosServerInstance.get('/country');
  return response.data;
};
