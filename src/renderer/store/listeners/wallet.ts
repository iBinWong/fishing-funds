import listenerMiddleware from '@/store/listeners';
import { syncEyeStatusAction, changeCurrentWalletCodeAction, syncWalletsConfigAction } from '@/store/features/wallet';
import * as Enhancement from '@/utils/enhancement';
import * as CONST from '@/constants';

export default () => {
  listenerMiddleware.startListening({
    actionCreator: syncEyeStatusAction,
    effect: async (action) => {
      Enhancement.SetStorage(CONST.STORAGE.EYE_STATUS, action.payload);
    },
  });
  listenerMiddleware.startListening({
    actionCreator: changeCurrentWalletCodeAction,
    effect: async (action) => {
      Enhancement.SetStorage(CONST.STORAGE.CURRENT_WALLET_CODE, action.payload);
    },
  });
  listenerMiddleware.startListening({
    actionCreator: syncWalletsConfigAction,
    effect: async (action) => {
      Enhancement.SetStorage(CONST.STORAGE.WALLET_SETTING, action.payload.walletConfig);
    },
  });
};