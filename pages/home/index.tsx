import { useEffect, useState } from 'react';
import PieChart from './PieChart';
import { StoreWalletProps, Token } from '@/utils/types/wallet';
import { getWallet } from '@/utils/store/wallet';
import { connect } from 'react-redux';
import { OptionPieChart } from '@/utils/types/chart';

const Page = ({ wallet , isLoading, error, getWallet }: StoreWalletProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const [chartsIsLoaded, setChartsIsLoaded] = useState(false);

  const [totalValue, setTotalValue] = useState<number>(0);

  const [seriesWallet, setSeriesWallet] = useState<number[]>([]);
  const [optionsWallet, setOptionsWallet] = useState<OptionPieChart>({labels: [], colors: []});
  const [optionsLocationType, setOptionsLocationType] = useState<OptionPieChart>({labels: [], colors: []});
  const [optionsLocationApp, setOptionsLocationApp] = useState<OptionPieChart>({labels: [], colors: []});
  const [optionsLocationBlockchain, setOptionsLocationBlockchain] =
    useState<OptionPieChart>({labels: [], colors: []});

  useEffect(() => {
    if (isMounted) {
      if (getWallet) getWallet()
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    if (wallet && isMounted) {
      initCharts();
      console.log(wallet)
    }
  }, [wallet, isMounted]);

  async function initCharts() {
    let _seriesWallet: number[] = [];
    let _labelsToken: string[] = [];
    let _labelsLocationType: string[] = [];
    let _labelsLocationApp: string[] = [];
    let _labelsLocationBlockchain: string[] = [];
    wallet.tokens.map((item: Token) => {
      _seriesWallet.push(item.value);
      _labelsLocationType.push(item.locationType);
      _labelsToken.push(item.token);
      _labelsLocationApp.push(item.locationApp + (item.locationType === 'centralised' ? ' ('+ item.locationType +') ' : ''));
      _labelsLocationBlockchain.push(
        item.locationBlockchain ? item.locationBlockchain : 'centralised',
      );
    });
    setTotalValue(wallet.total);

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

const mapWallet = (state: StoreWalletProps) => ({
  wallet: state.wallet,
  isLoading: state.isLoading,
  error: state.error,
});

export default connect(mapWallet, { getWallet })(Page);
