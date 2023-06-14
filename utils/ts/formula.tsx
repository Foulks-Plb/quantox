import { IImpermanentLoss } from "../types/formula";

export function impermLoss(amountEnterA: number, amountEnterB: number, priceEnterA: number, priceEnterB: number, priceNowA: number, priceNowB: number): IImpermanentLoss {
    const ratioEnter = priceEnterA / priceEnterB;
    const ratioNow = priceNowA / priceNowB;
  
    const ratioEnterA = Math.sqrt(ratioEnter / ratioEnter);
    const ratioEnterB = Math.sqrt(ratioEnter * ratioEnter);
  
    const changeNowRatioA = Math.sqrt(ratioEnter / ratioNow);
    const changeNowRatioB = Math.sqrt(ratioEnter * ratioNow);
  
    return {
      impermanentLoss: -1 * (((changeNowRatioA * priceNowA + changeNowRatioB * priceNowB) / (1 * priceNowA + ratioEnter * priceNowB)) * 100 - 100),
      amountNowA: amountEnterA * (changeNowRatioA / ratioEnterA),
      amountNowB: amountEnterB * (changeNowRatioB / ratioEnterB),
    };
  }