import axiosInstance from "../axiosInstance";

export interface CountryPayload {
  name: string;
  code: string;
  population: number;
  language: string;
}


export const getCountries= async ()=> {
  const response = await axiosInstance.get('/country');
  return response.data;
}
export const deleteCountry= async (id: string)=> {
  const response = await axiosInstance.delete(`/country/${id}`);
  return response.data;
}
export const createCountry= async (payload: CountryPayload)=> {
  const response = await axiosInstance.post('/country', payload);
  return response.data;
}