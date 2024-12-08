import axiosInstance from "./axiosInstance";



export interface Country {
  _id: string;
  name: string;
}

export async function getCountries(): Promise<Country[]> {
  const response = await axiosInstance.get('/country');
  return response.data;
}
