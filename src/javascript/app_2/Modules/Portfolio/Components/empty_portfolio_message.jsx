import React         from 'react';
import { localize }  from '../../../../_common/localize';

const EmptyPortfolioMessage = () => (
    // TODO: combine with statement component, once design is final
    <div className='portfolio-empty'>
        <span className='portfolio-empty__icon' />
        <span className='portfolio-empty__title'>{localize('No Portfolio')}</span>
        <span className='portfolio-empty__text'>{localize('No open positions.')}</span>
    </div>
);

export default EmptyPortfolioMessage;
