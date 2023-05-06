import axios from "axios";

export async function getCall(url: string) {
  console.log('call');
    try {
        const response = await axios.get(url);
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

export async function deleteId(url: string, id: string) {
  try {
      const data = {
        params : {
          id: id
        }
      };
      const response = await axios.delete(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}