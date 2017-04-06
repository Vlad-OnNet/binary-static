const MBContract                = require('./mb_contract');
const MBDefaults                = require('./mb_defaults');
const MBNotifications           = require('./mb_notifications');
const MBPrice                   = require('./mb_price');
const MBSymbols                 = require('./mb_symbols');
const MBTick                    = require('./mb_tick');
const TradingAnalysis           = require('../trade/analysis');
const commonTrading             = require('../trade/common');
const processForgetTicks        = require('../trade/process').processForgetTicks;
const Client                    = require('../../base/client');
const localize                  = require('../../base/localize').localize;
const jpClient                  = require('../../common_functions/country_base').jpClient;

const MBProcess = (() => {
    'use strict';

    let market_status = '',
        symbols_timeout;
    /*
     * This function processes the active symbols to get markets
     * and underlying list
     */
    const processActiveSymbols = (data) => {
        if (data.hasOwnProperty('error')) {
            MBNotifications.show({ text: data.error.message, uid: 'ACTIVE_SYMBOLS' });
            return;
        }

        // populate the Symbols object
        MBSymbols.details(data);

        const is_show_all  = Client.isLoggedIn() && !jpClient();
        const symbols_list = is_show_all ? MBSymbols.getAllSymbols() : MBSymbols.underlyings().major_pairs;
        const update_page  = MBSymbols.needPageUpdate();
        let symbol = MBDefaults.get('underlying');

        if (update_page && (!symbol || !symbols_list[symbol])) {
            symbol = undefined;
            MBDefaults.remove('underlying');
        }
        // check if all symbols are inactive
        let is_market_closed = true;
        Object.keys(symbols_list).forEach((s) => {
            if (symbols_list[s].is_active) {
                is_market_closed = false;
            }
        });
        clearSymbolTimeout();
        if (is_market_closed) {
            handleMarketClosed();
        } else {
            handleMarketOpen();
            if (is_show_all) populateUnderlyingGroups(symbol);
            else commonTrading.displayUnderlyings('underlying', symbols_list, symbol);

            if (symbol && !symbols_list[symbol].is_active) {
                MBNotifications.show({ text: localize('This symbol is not active. Please try another symbol.'), uid: 'SYMBOL_INACTIVE' });
            } else if (update_page) {
                MBProcess.processMarketUnderlying();
            }
        }
    };

    const populateUnderlyingGroups = (selected) => {
        const $underlyings = $('#underlying');
        const allSymbols = MBSymbols.underlyings();
        const markets    = MBSymbols.markets();

        $underlyings.empty();

        Object.keys(markets)
            .sort((a, b) => markets[a].name.localeCompare(markets[b].name))
            .forEach((market) => {
                $underlyings.append(
                    $('<optgroup/>', { label: markets[market].name })
                        .append($(commonTrading.generateUnderlyingOptions(allSymbols[market], selected))));
            });
    };

    const handleMarketClosed = () => {
        $('.japan-form, .japan-table, #trading_bottom_content').addClass('invisible');
        MBNotifications.show({ text: localize('Market is closed. Please try again later.'), uid: 'MARKET_CLOSED' });
        symbols_timeout = setTimeout(() => { MBSymbols.getSymbols(1); }, 30000);
    };

    const handleMarketOpen = () => {
        $('.japan-form, .japan-table, #trading_bottom_content').removeClass('invisible');
        MBNotifications.hide('MARKET_CLOSED');
    };

    const clearSymbolTimeout = () => {
        clearTimeout(symbols_timeout);
    };

    /*
     * Function to call when underlying has changed
     */
    const processMarketUnderlying = () => {
        const underlying_element = document.getElementById('underlying');
        if (!underlying_element) {
            return;
        }

        if (underlying_element.selectedIndex < 0) {
            underlying_element.selectedIndex = 0;
        }
        const underlying = underlying_element.value;
        MBDefaults.set('underlying', underlying);

        commonTrading.showFormOverlay();

        // forget the old tick id i.e. close the old tick stream
        processForgetTicks();
        // get ticks for current underlying
        MBTick.request(underlying);

        MBTick.clean();

        MBTick.updateWarmChart();

        BinarySocket.clearTimeouts();

        MBContract.getContracts(underlying);
    };

    /*
     * Function to process ticks stream
     */
    const processTick = (tick) => {
        if (tick.hasOwnProperty('error')) {
            MBNotifications.show({ text: tick.error.message, uid: 'TICK_ERROR' });
            return;
        }
        const symbol = MBDefaults.get('underlying');
        if (tick.echo_req.ticks === symbol || (tick.tick && tick.tick.symbol === symbol)) {
            MBTick.details(tick);
            MBTick.display();
            MBTick.updateWarmChart();
        }
    };

    /*
     * Function to display contract form for current underlying
     */
    const processContract = (contracts) => {
        if (contracts.hasOwnProperty('error')) {
            MBNotifications.show({ text: contracts.error.message, uid: contracts.error.code });
            return;
        }

        window.chartAllowed = !(contracts.contracts_for && contracts.contracts_for.feed_license && contracts.contracts_for.feed_license === 'chartonly');

        checkMarketStatus(contracts.contracts_for.close);

        const no_rebuild = contracts.hasOwnProperty('passthrough') &&
                        contracts.passthrough.hasOwnProperty('action') &&
                        contracts.passthrough.action === 'no-proposal';
        MBContract.populateOptions((no_rebuild ? null : 'rebuild'));
        if (no_rebuild) {
            processExpiredBarriers();
            return;
        }
        processPriceRequest();
        TradingAnalysis.request();
    };

    const checkMarketStatus = (close) => {
        const now = window.time.unix();

        // if market is closed, else if market is open
        if (now > close) {
            if (market_status === 'open') {
                handleMarketClosed();
            }
            market_status = 'closed';
        } else {
            if (market_status === 'closed') {
                MBSymbols.getSymbols(1);
                handleMarketOpen();
            }
            market_status = 'open';
        }
    };

    const processForgetProposals = () => {
        MBPrice.showPriceOverlay();
        BinarySocket.send({
            forget_all: 'proposal',
        });
        MBPrice.cleanup();
    };

    const processPriceRequest = () => {
        MBPrice.increaseReqId();
        processForgetProposals();
        MBPrice.showPriceOverlay();
        const available_contracts = MBContract.getCurrentContracts();
        const durations = MBDefaults.get('period').split('_');
        const req = {
            proposal   : 1,
            subscribe  : 1,
            basis      : 'payout',
            amount     : jpClient() ? (parseInt(MBDefaults.get('payout')) || 1) * 1000 : MBDefaults.get('payout'),
            currency   : MBContract.getCurrency(),
            symbol     : MBDefaults.get('underlying'),
            req_id     : MBPrice.getReqId(),
            date_expiry: durations[1],

            trading_period_start: durations[0],
        };
        let barriers_array,
            all_expired = true;
        for (let i = 0; i < available_contracts.length; i++) {
            req.contract_type = available_contracts[i].contract_type;
            barriers_array = available_contracts[i].available_barriers;
            for (let j = 0; j < barriers_array.length; j++) {
                if (+available_contracts[i].barriers === 2) {
                    req.barrier  = barriers_array[j][1];
                    req.barrier2 = barriers_array[j][0];
                } else {
                    req.barrier = barriers_array[j];
                }
                if (!barrierHasExpired(available_contracts[i].expired_barriers, req.barrier, req.barrier2)) {
                    all_expired = false;
                    MBPrice.addPriceObj(req);
                    BinarySocket.send(req);
                }
            }
        }
        if (all_expired) {
            MBNotifications.show({ text: localize('All barriers in this trading window are expired') + '.', uid: 'ALL_EXPIRED' });
            MBPrice.hidePriceOverlay();
        } else {
            MBNotifications.hide('ALL_EXPIRED');
        }
    };

    const processProposal = (response) => {
        const req_id = MBPrice.getReqId();
        if (response.req_id === req_id) {
            MBPrice.display(response);
            // MBPrice.hidePriceOverlay();
        }
    };

    const processExpiredBarriers = () => {
        const contracts = MBContract.getCurrentContracts();
        let expired_barrier,
            $expired_barrier_element;
        contracts.forEach((c) => {
            const expired_barriers = c.expired_barriers;
            for (let i = 0; i < expired_barriers.length; i++) {
                if (+c.barriers === 2) {
                    expired_barrier = expired_barriers[i][0] + '_' + expired_barriers[i][1];
                } else {
                    expired_barrier = expired_barriers[i];
                }
                $expired_barrier_element = $('div [data-barrier="' + expired_barrier + '"]');
                if ($expired_barrier_element.length > 0) {
                    processForgetProposal(expired_barrier);
                    $expired_barrier_element.remove();
                }
            }
        });
    };

    const barrierHasExpired = (expired_barriers, barrier, barrier2) => {
        if (barrier2) {
            return containsArray(expired_barriers, [[barrier2, barrier]]);
        }
        return (expired_barriers.indexOf((barrier).toString()) > -1);
    };

    const processForgetProposal = (expired_barrier) => {
        const prices = MBPrice.getPrices();
        Object.keys(prices[expired_barrier]).forEach((c) => {
            if (!prices[expired_barrier][c].hasOwnProperty('error')) {
                BinarySocket.send({ forget: prices[expired_barrier][c].proposal.id });
            }
        });
    };

    const containsArray = (array, val) => {
        const hash = {};
        for (let i = 0; i < array.length; i++) {
            hash[array[i]] = i;
        }
        return hash.hasOwnProperty(val);
    };

    return {
        processActiveSymbols   : processActiveSymbols,
        processMarketUnderlying: processMarketUnderlying,
        processTick            : processTick,
        processContract        : processContract,
        processPriceRequest    : processPriceRequest,
        processProposal        : processProposal,
        onUnload               : () => { clearSymbolTimeout(); MBSymbols.clearData(); },
    };
})();

module.exports = MBProcess;
