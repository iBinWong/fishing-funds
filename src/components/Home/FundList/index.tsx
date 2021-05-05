import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import FundRow from '@/components/Home/FundList/FundRow';
import Empty from '@/components/Empty';
import LoadingBar from '@/components/LoadingBar';
import { loadFundsWithoutLoading, loadFixFunds } from '@/actions/fund';
import { getSystemSetting } from '@/actions/setting';
import { StoreState } from '@/reducers/types';
import { useWorkDayTimeToDo, useFixTimeToDo } from '@/utils/hooks';
import { useActions } from '@/utils/hooks';
import * as Adapter from '@/utils/adpters';
import styles from './index.scss';

const FundList: React.FC<{}> = () => {
  const { freshDelaySetting, autoFreshSetting } = getSystemSetting();
  const funds = useSelector((state: StoreState) => state.fund.funds);
  const fundsLoading = useSelector(
    (state: StoreState) => state.fund.fundsLoading
  );
  const runLoadFunds = useActions(loadFundsWithoutLoading);
  const runLoadFixFunds = useActions(loadFixFunds);

  // 间隔时间刷新基金
  useWorkDayTimeToDo(
    () => autoFreshSetting && runLoadFunds(),
    freshDelaySetting * 1000 * 60
  );

  // 每3分钟自动检查最新净值
  useFixTimeToDo(runLoadFixFunds, 1000 * 60 * 3);

  useEffect(() => {
    Adapter.ChokeAllAdapter([runLoadFunds, runLoadFixFunds]);
  }, []);

  return (
    <div className={styles.container}>
      <LoadingBar show={fundsLoading} />
      {funds.length ? (
        funds.map((fund) => <FundRow key={fund.fundcode} fund={fund} />)
      ) : (
        <Empty text="暂无基金数据~" />
      )}
    </div>
  );
};
export default FundList;
