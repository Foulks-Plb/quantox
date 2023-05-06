import { StoreWalletProps } from '@/utils/types/wallet';
import styles from './ReloadCard.module.scss';
import { connect } from 'react-redux';
import { getWallet } from '@/utils/store/wallet';

function ReloadCard({ wallet, getWallet }: StoreWalletProps) {

    function refresh() {
        if (getWallet) getWallet(true);
    }

    return (
        <div className={styles.infoCard}>
            <div className={styles.body}>
                <div onClick={refresh} className={styles.boutonRefresh}>refresh</div>
            </div>
        </div>     
    )
} 

const mapWallet = (state: StoreWalletProps) => ({
    wallet: state.wallet,
    isLoading: state.isLoading,
    error: state.error,
  });
  
  export default connect(mapWallet, { getWallet })(ReloadCard);