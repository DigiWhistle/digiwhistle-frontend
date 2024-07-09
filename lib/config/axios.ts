import axios from "axios";

interface AxiosClientConfig {
  baseURL: string;
  headers: {
    "Content-Type": string;
    Accept: string;
  };
  timeout: number;
  withCredentials: boolean;
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000,
  withCredentials: true,
} as AxiosClientConfig);

export async function getRequest(URL: string): Promise<any> {
  const response = await axiosClient.get(`/${URL}`);
  return response.data;
}

export async function postRequest(URL: string, payload: any): Promise<any> {
  const response = await axiosClient.post(`/${URL}`, payload);
  return response.data;
}

export async function patchRequest(URL: string, payload: any): Promise<any> {
  const response = await axiosClient.patch(`/${URL}`, payload);
  return response.data;
}

export async function deleteRequest(URL: string): Promise<any> {
  const response = await axiosClient.delete(`/${URL}`);
  return response;
}
