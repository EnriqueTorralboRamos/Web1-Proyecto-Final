import axiosServerInstance from '../axiosServerInstance';

export const getCountries = async (filters: Record<string, string | undefined>) => {
  const response = await axiosServerInstance.get('/country/search', { params: filters });
  console.log('response.data',response.data);
  
  return response.data;
};

export const getCountryById = async (countryId: string) => {
  const response = await axiosServerInstance.get(`/country/${countryId}`);
  return response.data;
}