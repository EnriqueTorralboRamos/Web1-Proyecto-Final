import axiosServerInstance from '../axiosServerInstance';

export const getCountries = async () => {
  const response = await axiosServerInstance.get('/country');
  return response.data;
};

export const getCountryById = async (countryId: string) => {
  const response = await axiosServerInstance.get(`/country/${countryId}`);
  return response.data;
}