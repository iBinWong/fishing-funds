import { AnyAction } from 'redux';

import {
  UPDATE_UPTATETIME,
  CHANGE_EYE_STATUS,
  CHANGE_CURRENT_WALLET_CODE,
  defaultWallet,
} from '@/actions/wallet';

import * as Enums from '@/utils/enums';
import * as CONST from '@/constants';
import * as Utils from '@/utils';

export interface WalletState {
  updateTime: string;
  eyeStatus: Enums.EyeStatus;
  walletIndex: number;
  wallets: Wallet.SettingItem[];
  currentWalletCode: string;
}

export default function wallet(
  state: WalletState = {
    updateTime: '还没有刷新过哦～',
    walletIndex: Utils.GetStorage(CONST.STORAGE.WALLET_INDEX, 0),
    eyeStatus: Utils.GetStorage(CONST.STORAGE.EYE_STATUS, Enums.EyeStatus.Open),
    currentWalletCode: Utils.GetStorage(
      CONST.STORAGE.CURRENT_WALLET_CODE,
      defaultWallet.code
    ),
    wallets: Utils.GetStorage(CONST.STORAGE.WALLET_SETTING, [defaultWallet]),
  },

  action: AnyAction
): WalletState {
  switch (action.type) {
    case UPDATE_UPTATETIME:
      return {
        ...state,
        updateTime: action.payload,
      };
    case CHANGE_EYE_STATUS:
      return {
        ...state,
        eyeStatus: action.payload,
      };
    case CHANGE_CURRENT_WALLET_CODE:
      return {
        ...state,
        currentWalletCode: action.payload,
      };
    default:
      return state;
  }
}
