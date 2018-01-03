import React from 'react';
import { Select } from '../../../_common/components/elements.jsx';

const LastDigit = () => (
    <div className='gr-parent'>
        <div id='last_digit_histo_form' className='gr-12 gr-12-m gr-centered'>
            <div className='smallfont gr-row'>
                <div className='gr-6 gr-12-m center-text'>
                    <label className='gr-padding-10' htmlFor='digit_underlying'>{it.L('Select market:')}</label>
                    <br />
                    <select className='smallfont' id='digit_underlying'></select>
                </div>
                <div className='gr-6 gr-12-m center-text'>
                    <label className='gr-padding-10' htmlFor='tick_count'>{it.L('Number of ticks:')}</label>
                    <br />
                    <Select
                        className='smallfont'
                        id='tick_count'
                        options={[
                            { text: '25',   value: '25' },
                            { text: '50',   value: '50' },
                            { text: '100',  value: '100', selected: true },
                            { text: '500',  value: '500' },
                            { text: '1000', value: '1000' },
                        ]}
                    />
                </div>
            </div>
        </div>
        <div id='last_digit_histo' className='gr-12 gr-12-m gr-centered'></div>
        <div id='last_digit_title' className='gr-hide'><span id='digit_domain'></span> - {it.L('Last digit stats for the latest [_1] ticks on [_2]', '<span id="digit_info_count">100</span>', '<span id="digit_info_underlying"></span>')}</div>
    </div>
);

export default LastDigit;