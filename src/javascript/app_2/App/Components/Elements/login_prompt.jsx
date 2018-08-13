import PropTypes    from 'prop-types';
import React        from 'react';
import Localize     from './localize.jsx';

const LoginPrompt = ({ onLogin, onSignup, children }) => (
    <div className='login-prompt'>
        <div className='login-prompt__icon'>
            {children}
        </div>
        <div className='login-prompt__message'>
            <Localize
                str='Please [_1]log in[_2] or [_3]sign up[_2] to view this page.'
                replacers={{
                    '1_2': <a href='javascript:;' onClick={onLogin} />,
                    '3_2': <a href='javascript:;' onClick={onSignup} />,
                }}
            />
        </div>
    </div>
);

LoginPrompt.propTypes = {
    children: PropTypes.any,
    onLogin : PropTypes.func,
    onSignup: PropTypes.func,
};

export default LoginPrompt;
