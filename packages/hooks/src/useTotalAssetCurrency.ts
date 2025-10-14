import { useStore } from '@deriv/stores';
import usePlatformAccounts from './usePlatformAccounts';

const useRealTotalAssetCurrency = () => {
    const { client, traders_hub } = useStore();
    const { current_fiat_currency, is_crypto, currency, default_currency } = client;
    const { is_eu_user } = traders_hub;
    const { real: platform_real_accounts } = usePlatformAccounts();

    if (!platform_real_accounts.length) return default_currency;

    const non_crypto_accounts = platform_real_accounts.find(account => !is_crypto(account.currency || 'USD'));

    if (non_crypto_accounts) return non_crypto_accounts?.currency || '';

    const currency_if_is_crypto = is_eu_user
        ? current_fiat_currency || default_currency
        : platform_real_accounts[0].currency;

    return is_crypto() ? currency_if_is_crypto : currency;
};

export default useRealTotalAssetCurrency;
