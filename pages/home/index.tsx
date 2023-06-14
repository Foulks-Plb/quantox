import { useEffect, useState } from 'react';
import PieChart from '../../utils/components/chart/pieChart/PieChart';
import { StoreWalletProps, IToken } from '@/utils/types/wallet';
import { getWallet } from '@/utils/store/wallet';
import { connect } from 'react-redux';
import { OptionPieChart } from '@/utils/types/chart';
import styles from './home.module.scss';
import InfoCard from '@/utils/components/card/infoCard/InfoCard';
import ReloadCard from '@/utils/components/card/reloadCard/ReloadCard';
import AllToken from '@/utils/components/allToken/AllToken';
import { colorsPieChart } from '@/utils/constant';
import { storeReducer } from '@/utils/types/store';

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
    wallet?.tokens?.tokens?.map((item: IToken) => {
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
    <div className="flex">
      <div className="w-2/3">
        <div className="flex justify-center">
          <InfoCard title="Balance" value={wallet?.total} />
          <ReloadCard />
        </div>
        <div className="flex content-center">
          <PieChart
            title="Blockchain"
            series={seriesWallet}
            options={optionsLocationBlockchain}
            type="pie"
            width="100%"
            height="250px"
            legendDisplay={false}
          />
          <PieChart
            title="Application"
            series={seriesWallet}
            options={optionsLocationApp}
            type="pie"
            width="100%"
            height="250px"
            legendDisplay={false}
          />
          <PieChart
            title="Location type"
            series={seriesWallet}
            options={optionsLocationType}
            type="pie"
            width="100%"
            height="250px"
            legendDisplay={false}
          />
        </div>
      </div>
      <div className="w-1/3">
        <div className={styles.sideChart}>
          <PieChart
            title="Tokens"
            series={seriesWallet}
            options={optionsWallet}
            type="donut"
            width="100%"
            height="300px"
            legendPosition='left'
            legendDisplay={true}
          />
        </div>
        <AllToken tokens={wallet?.tokens} />
      </div>
    </div>
  );
};

const mapWallet = (state: storeReducer) => ({ ...state.walletReducer });

export default connect(mapWallet, { getWallet })(Page);
