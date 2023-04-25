import axios from "axios";

export async function getCall(url: string) {
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

export async function getPricesCoingecko(tokens: string) {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+tokens+'&vs_currencies=usd');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}