import { useEffect, useState } from 'react';
import PieChart from '../../utils/components/chart/pieChart/PieChart';
import { StoreWalletProps, Token } from '@/utils/types/wallet';
import { getWallet } from '@/utils/store/wallet';
import { connect } from 'react-redux';
import { OptionPieChart } from '@/utils/types/chart';
import styles from './home.module.scss';
import InfoCard from '@/utils/components/card/infoCard/InfoCard';
import ReloadCard from '@/utils/components/card/reloadCard/ReloadCard';
import AllToken from '@/utils/components/allToken/AllToken';
import { colorsPieChart } from '@/utils/constant';
import { useSession } from 'next-auth/react';

const Page = ({ wallet, getWallet }: StoreWalletProps) => {
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
    setChartsIsLoaded(false);
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
      colors: colorsPieChart,
    });
    setOptionsLocationType({
      labels: _labelsLocationType,
      colors: ['#C6D0BC', '#A3A7FC'],
    });
    setOptionsLocationApp({
      labels: _labelsLocationApp,
      colors: colorsPieChart,
    });
    setOptionsLocationBlockchain({
      labels: _labelsLocationBlockchain,
      colors: colorsPieChart,
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
              <ReloadCard />
            </div>
            <div className="d-flex justify-content-center">
              <PieChart
                title="Blockchain"
                series={seriesWallet}
                options={optionsLocationBlockchain}
                type="pie"
                width='250px'
                height='250px'
              />
              <PieChart
                title="Application"
                series={seriesWallet}
                options={optionsLocationApp}
                type="pie"
                width='250px'
                height='250px'
              />
              <PieChart
                title="Location type"
                series={seriesWallet}
                options={optionsLocationType}
                type="pie"
                width='250px'
                height='250px'
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
              height='300px'
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
