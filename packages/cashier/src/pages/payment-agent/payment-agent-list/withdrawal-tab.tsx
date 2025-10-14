import React from 'react';
import { Loading } from '@deriv/components';
import { useVerifyEmail } from '@deriv/hooks';
import { useStore, observer } from '@deriv/stores';
import EmailVerificationEmptyState from '../../../components/email-verification-empty-state';
import PaymentAgentContainer from '../payment-agent-container';
import PaymentAgentWithdrawalLocked from '../payment-agent-withdrawal-locked';
import { useCashierStore } from '../../../stores/useCashierStores';

const WithdrawalTab = observer(() => {
    const verify = useVerifyEmail('paymentagent_withdraw');
    const { client } = useStore();
    const { payment_agent } = useCashierStore();
    const verification_code = client.verification_code.payment_agent_withdraw;

    React.useEffect(() => {
        if (payment_agent.active_tab_index && !verification_code && client.is_authorize) {
            verify.send();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payment_agent.active_tab_index, verification_code, client.is_authorize]);
    // TODO: `verify` should not be a dependency of the `useEffect` hook as it will cause a loop,
    // We shouldn't call `verify.send()` inside the `useEffect` and we should improve the UX to
    // match the behavior of the `Withdrawal` page and first inform the user.

    if (verify.is_loading) {
        return <Loading is_fullscreen={false} />;
    }

    if (verify.error && 'code' in verify.error) return <PaymentAgentWithdrawalLocked error={verify.error} />;
    if (verify.has_been_sent) return <EmailVerificationEmptyState type={'paymentagent_withdraw'} />;
    if (verification_code || payment_agent.is_withdraw) return <PaymentAgentContainer />;

    return null;
});

export default WithdrawalTab;
