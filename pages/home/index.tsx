import { useEffect, useState } from 'react';
import PieChart from '../../utils/components/chart/pieChart/PieChart';
import { StoreWalletProps, Token } from '@/utils/types/wallet';
import { getWallet } from '@/utils/store/wallet';
import { connect } from 'react-redux';
import { OptionPieChart } from '@/utils/types/chart';
import styles from './home.module.scss';
import InfoCard from '@/utils/components/infoCard/InfoCard';
import AllToken from '@/utils/components/allToken/AllToken';

const Page = ({ wallet, isLoading, error, getWallet }: StoreWalletProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const [chartsIsLoaded, setChartsIsLoaded] = useState(false);

  const [seriesWallet, setSeriesWallet] = useState<number[]>([]);
  const [optionsWallet, setOptionsWallet] = useState<OptionPieChart>({
    labels: [],
    colors: [],
  });
  const [optionsLocationType, setOptionsLocationType] =
    useState<OptionPieChart>({ labels: [], colors: [] });
  const [optionsLocationApp, setOptionsLocationApp] = useState<OptionPieChart>({
    labels: [],
    colors: [],
  });
  const [optionsLocationBlockchain, setOptionsLocationBlockchain] =
    useState<OptionPieChart>({ labels: [], colors: [] });

  useEffect(() => {
    if (isMounted) {
      if (getWallet) getWallet();
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    if (wallet && isMounted) {
      initCharts();
    }
  }, [wallet, isMounted]);

  async function initCharts() {
    let _seriesWallet: number[] = [];
    let _labelsToken: string[] = [];
    let _labelsLocationType: string[] = [];
    let _labelsLocationApp: string[] = [];
    let _labelsLocationBlockchain: string[] = [];
    wallet?.tokens.map((item: Token) => {
      _seriesWallet.push(item.value);
      _labelsLocationType.push(item.locationType);
      _labelsToken.push(item.token);
      _labelsLocationApp.push(
        item.locationApp +
          (item.locationType === 'centralised'
            ? ' (' + item.locationType + ') '
            : ''),
      );
      _labelsLocationBlockchain.push(
        item.locationBlockchain ? item.locationBlockchain : 'centralised',
      );
    });

    setSeriesWallet(_seriesWallet);
    setOptionsWallet({
      labels: _labelsToken,
      colors: ['#C6D0BC', '#F6D78B', '#A3A7FC', '#8CA473', '#F8F7F1'],
    });
    setOptionsLocationType({
      labels: _labelsLocationType,
      colors: ['#C6D0BC', '#F6D78B', '#A3A7FC', '#8CA473', '#F8F7F1'],
    });
    setOptionsLocationApp({
      labels: _labelsLocationApp,
      colors: ['#C6D0BC', '#F6D78B', '#A3A7FC', '#8CA473', '#F8F7F1'],
    });
    setOptionsLocationBlockchain({
      labels: _labelsLocationBlockchain,
      colors: ['#C6D0BC', '#F6D78B', '#A3A7FC', '#8CA473', '#F8F7F1'],
    });

    setChartsIsLoaded(true);
  }

  return (
    <div className={styles.home}>
      {chartsIsLoaded ? (
        <div className={styles.dashboard}>
          <div className={styles.main}>
            <div className="d-flex justify-content-center">
              <InfoCard title="Balance" value={wallet?.total} />
              <InfoCard title="Balance" value={wallet?.total} />
            </div>
            <div className="d-flex">
              <PieChart
                title="Blockchain"
                series={seriesWallet}
                options={optionsLocationBlockchain}
                type="pie"
                width='100%'
              />
              <PieChart
                title="Application"
                series={seriesWallet}
                options={optionsLocationApp}
                type="pie"
                width='100%'
              />
              <PieChart
                title="Location type"
                series={seriesWallet}
                options={optionsLocationType}
                type="pie"
                width='100%'
              />
            </div>
          </div>
          <div className={styles.side}>
            <div className={styles.sideChart}>
            <PieChart
              title="Tokens"
              series={seriesWallet}
              options={optionsWallet}
              type="donut"
              width='100%'
            />
            </div>
            
            <AllToken tokens={wallet?.tokens} />
          </div>
        </div>
      ) : (
        <div className="spinner-border text-light" role="status"></div>
      )}
    </div>
  );
};

const mapWallet = (state: StoreWalletProps) => ({
  wallet: state.wallet,
  isLoading: state.isLoading,
  error: state.error,
});

export default connect(mapWallet, { getWallet })(Page);
