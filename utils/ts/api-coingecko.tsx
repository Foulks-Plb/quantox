import axios from "axios";

export async function getPrices(tokensArray: any[]) {
  if (tokensArray.length === 0) return {};
  return await getPricesCoingecko(tokensArray.join(','));
}

export async function getPricesCoingecko(tokens: string) {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+tokens+'&vs_currencies=usd');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function getResultsWithName(name: string) {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/search?query='+name);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }