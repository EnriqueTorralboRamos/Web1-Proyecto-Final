import axiosInstance from "../axiosInstance";




export const getCountries= async ()=> {
  const response = await axiosInstance.get('/country');
  return response.data;
}
