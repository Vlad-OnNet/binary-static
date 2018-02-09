import React from 'react';
import Button from './form/button.jsx';
import { connect } from '../store/connect';
import { localize } from '../../../../_common/localize';

const Purchase = ({
    trade_types,
}) =>  (
    Object.keys(trade_types).map((type, idx) => (
        <Button
            key={idx}
            id={`purchase_${type}`}
            className='primary green'
            has_effect
            text={`${localize('Purchase')} ${trade_types[type]}`}
        />
    ))
);

export default connect(
    ({trade}) => ({
        trade_types: trade.trade_types,
    })
)(Purchase);
