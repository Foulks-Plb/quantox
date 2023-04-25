import { useEffect, useState } from 'react';
import PieChart from './PieChart';
import axios from 'axios';
import { Token } from '@/types/token';
import { getCall } from '@/utils/ts/api';

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  const [chartsIsLoaded, setChartsIsLoaded] = useState(false);

  const [totalValue, setTotalValue] = useState<number>(0);

  const [seriesWallet, setSeriesWallet] = useState<number[]>([]);
  const [optionsWallet, setOptionsWallet] = useState<any>({});
  const [optionsLocationType, setOptionsLocationType] = useState<any>({});
  const [optionsLocationApp, setOptionsLocationApp] = useState<any>({});
  const [optionsLocationBlockchain, setOptionsLocationBlockchain] =
    useState<any>({});

  useEffect(() => {
    if (isMounted) {
      initCharts();
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  async function fetchFile() {
    return await getCall('/api/tokens');
  }

  async function initCharts() {
    const data = await fetchFile();
    console.log(data);

    let _seriesWallet: number[] = [];
    let _labelsToken: string[] = [];
    let _labelsLocationType: string[] = [];
    let _labelsLocationApp: string[] = [];
    let _labelsLocationBlockchain: string[] = [];
    data.tokens.map((item: Token) => {
      console.log(item)
      _seriesWallet.push(item.value);
      _labelsLocationType.push(item.locationType);
      _labelsToken.push(item.token);
      _labelsLocationApp.push(item.locationApp + (item.locationType === 'centralised' ? ' ('+ item.locationType +') ' : ''));
      _labelsLocationBlockchain.push(
        item.locationBlockchain ? item.locationBlockchain : 'centralised',
      );
    });
    setTotalValue(data.total);

    setSeriesWallet(_seriesWallet);
    setOptionsWallet({
      labels: _labelsToken,
      colors: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'],
    });
    setOptionsLocationType({
      labels: _labelsLocationType,
      colors: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'],
    });
    setOptionsLocationApp({
      labels: _labelsLocationApp,
      colors: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'],
    });
    setOptionsLocationBlockchain({
      labels: _labelsLocationBlockchain,
      colors: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'],
    });

    setChartsIsLoaded(true);
  }

  return (
    <div>
      {chartsIsLoaded ? (
        <div>
          <div className="d-flex h2">
            <p>{totalValue}</p>
            <p>$</p>
          </div>
          <div className="d-flex">
            <PieChart
              title="Tokens"
              series={seriesWallet}
              options={optionsWallet}
            />
            <PieChart
              title="Blockchain"
              series={seriesWallet}
              options={optionsLocationBlockchain}
            />
          </div>
          <div className="d-flex">
            <PieChart
              title="Location type"
              series={seriesWallet}
              options={optionsLocationType}
            />
            <PieChart
              title="Application"
              series={seriesWallet}
              options={optionsLocationApp}
            />
          </div>
        </div>
      ) : (
        <div className="spinner-border text-light" role="status">
        </div>
      )}
    </div>
  );
}
