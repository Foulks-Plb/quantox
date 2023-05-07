import { StoreWalletProps } from '@/utils/types/wallet';
import styles from './ReloadCard.module.scss';
import { connect } from 'react-redux';
import { getWallet } from '@/utils/store/wallet';

function ReloadCard({ getWallet }: StoreWalletProps) {

    function refresh() {
        if (getWallet) getWallet(true);
    }

    return (
        <div className={styles.infoCard}>
            <div className={styles.body}>
                <button onClick={refresh} type="button" className="btn btn-primary">refresh</button>
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