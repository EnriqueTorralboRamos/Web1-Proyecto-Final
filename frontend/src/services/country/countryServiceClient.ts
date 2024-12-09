import axiosInstance from "../axiosInstance";




export const getCountries= async ()=> {
  const response = await axiosInstance.get('/country');
  return response.data;
}
export const deleteCountry= async (id: string)=> {
  const response = await axiosInstance.delete(`/country/${id}`);
  return response.data;
}