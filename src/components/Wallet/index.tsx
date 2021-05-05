import React, { useContext, useMemo } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ConsumptionIcon } from '@/assets/icons/consumption.svg';
import { ReactComponent as EyeIcon } from '@/assets/icons/eye.svg';
import { ReactComponent as EyeCloseIcon } from '@/assets/icons/eye-close.svg';
import { HeaderContext } from '@/components/Header';
import { StoreState } from '@/reducers/types';
import { toggleEyeStatus } from '@/actions/wallet';
import { calcFunds } from '@/actions/fund';
import { useCurrentWallet } from '@/utils/hooks';
import * as Enums from '@/utils/enums';
import * as Utils from '@/utils';
import styles from './index.scss';

export interface WalletProps {}

const Wallet: React.FC<WalletProps> = () => {
  const dispatch = useDispatch();
  const { miniMode } = useContext(HeaderContext);
  const funds = useSelector((state: StoreState) => state.fund.funds);
  const eyeStatus = useSelector((state: StoreState) => state.wallet.eyeStatus);
  const updateTime = useSelector(
    (state: StoreState) => state.wallet.updateTime
  );
  const { currentWallet } = useCurrentWallet();

  const WalletIcon = useMemo(() => {
    const { ReactComponent } = require(`@/assets/icons/wallet/${
      currentWallet.iconIndex || 0
    }.svg`);
    return ReactComponent;
  }, [currentWallet]);

  const { zje, sygz } = calcFunds(funds);
  const eyeOpen = eyeStatus === Enums.EyeStatus.Open;
  const display_zje = eyeOpen ? zje.toFixed(2) : Utils.Encrypt(zje.toFixed(2));
  const display_sygz = eyeOpen
    ? Utils.Yang(sygz.toFixed(2))
    : Utils.Encrypt(Utils.Yang(sygz.toFixed(2)));

  return (
    <div
      className={classnames(styles.content, { [styles.miniMode]: miniMode })}
    >
      <WalletIcon className={styles.walletIcon} />
      <div className={styles.info}>
        <div className={styles.timeBar}>
          <div className={styles.last}>刷新时间：{updateTime}</div>
        </div>
        <div className={styles.moneyBar}>
          <div>
            <ConsumptionIcon />
            <span>持有金额：</span>
            <span>{display_zje}</span>
          </div>
          <i></i>
          <div>
            <ConsumptionIcon />
            <span>收益估值：</span>
            <span>{display_sygz}</span>
          </div>
        </div>
      </div>
      <div className={styles.eye} onClick={() => dispatch(toggleEyeStatus())}>
        {eyeStatus === Enums.EyeStatus.Open ? <EyeIcon /> : <EyeCloseIcon />}
      </div>
    </div>
  );
};

export default Wallet;
