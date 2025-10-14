import React from 'react';
import PaymentAgentTransferReceipt from '../payment-agent-transfer-receipt';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserHistory, createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { routes } from '@deriv/shared';
import CashierProviders from '../../../../cashier-providers';
import { mockStore } from '@deriv/stores';

describe('<PaymentAgentTransferReceipt />', () => {
    let history: BrowserHistory, mockRootStore: ReturnType<typeof mockStore>;

    beforeEach(() => {
        mockRootStore = mockStore({
            client: {
                currency: 'USD',
            },
            common: {
                is_from_derivgo: false,
            },
            modules: {
                cashier: {
                    payment_agent_transfer: {
                        receipt: { amount_transferred: '1', client_id: 'CR9000000' },
                        resetPaymentAgentTransfer: jest.fn(),
                    },
                },
            },
        });

        history = createBrowserHistory();
    });

    const renderPaymentAgentTransferReceipt = () => {
        return render(
            <Router history={history}>
                <CashierProviders store={mockRootStore}>
                    <PaymentAgentTransferReceipt />
                </CashierProviders>
            </Router>
        );
    };

    it('component should render', () => {
        renderPaymentAgentTransferReceipt();

        expect(screen.getByTestId('dt_payment_agent_transfer_receipt_wrapper')).toBeInTheDocument();
    });

    it(`should redirect to statement page when click on 'View in statement' button`, () => {
        renderPaymentAgentTransferReceipt();

        const btn = screen.getByText('View transactions');
        fireEvent.click(btn);

        expect(history.location.pathname).toBe(routes.statement);
    });

    it(`resetPaymentAgentTransfer func should be triggered when click on 'Make a new transfer' button`, () => {
        renderPaymentAgentTransferReceipt();

        const btn = screen.getByText('Make a new transfer');
        fireEvent.click(btn);

        expect(mockRootStore.modules.cashier.payment_agent_transfer.resetPaymentAgentTransfer).toBeCalledTimes(1);
    });
});
