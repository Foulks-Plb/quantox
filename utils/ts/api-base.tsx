import axios from "axios";
import { Token } from "../types/wallet";
import { IPagination } from "../types/backend";

export async function getCall(url: string) {
  console.log('call');
    try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
      }
}

export async function getCallPagination(url: string, pagination: IPagination) {
  console.log('call pagination');
    try {
        const response = await axios.get(url, {params: pagination});
        return response.data;
      } catch (error) {
        console.error(error);
      }
}

export async function postCall(url: string, data: any) {
    try {
        const response = await axios.post(url, data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
}

export async function deleteToken(url: string, token: Token) {
  try {
      const data = {
        params : {
          ...token
        }
      };
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}