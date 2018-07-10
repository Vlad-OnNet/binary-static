// import { configure }              from 'mobx';
import PropTypes                     from 'prop-types';
import React                         from 'react';
import { render }                    from 'react-dom';
import { BrowserRouter as Router }   from 'react-router-dom';
import Footer                        from './Components/Layout/footer.jsx';
import Header                        from './Components/Layout/header.jsx';
import { BinaryRoutes }              from './routes';
import NetworkMonitor                from '../Services/network_monitor';
import RootStore                     from '../Stores';
import { MobxProvider }              from '../Stores/connect';
import Client                        from '../../_common/base/client_base';
import { getAll as getAllLanguages } from '../../_common/language';
import { localize }                  from '../../_common/localize';

// configure({ enforceActions: true }); // disabled for SmartCharts compatibility

const initApp = () => {
    Client.init();

    const root_store = new RootStore();

    NetworkMonitor.init(root_store);

    root_store.modules.trade.init();

    const app = document.getElementById('binary_app');
    if (app) {
        render(<BinaryApp root_store={root_store} />, app);
    }
};

/*
 * Retrieves basename from current url
 *
 * @return {string} returns the basename of current url
 */
const getBasename = () => {
    const regex_string = `(.*(${Object.keys(getAllLanguages()).join('|')})/app\\.html).*`;
    const basename = new RegExp(regex_string, 'ig').exec(window.location.pathname);

    if (basename && basename.length) {
        return basename[1];
    }

    return '/en/app.html';
};

const BinaryApp = ({ root_store }) => (
    <Router basename={ getBasename() }>
        <MobxProvider store={root_store}>
            <div>
                <div id='header'>
                    <Header
                        items={[
                            { icon: 'trade',     text: localize('Trade'),     link_to: '/' },
                            { icon: 'portfolio', text: localize('Portfolio'), link_to: '/portfolio' },
                            { icon: 'statement', text: localize('Statement'), link_to: 'statement' },
                            { icon: 'cashier',   text: localize('Cashier') },
                        ]}
                    />
                </div>
                <div id='app_contents' className='app-contents'>
                    <BinaryRoutes />
                </div>
                <footer id='footer'>
                    <Footer
                        items={[
                            { icon: 'ic-statement',   text: localize('Statement'), link_to: 'statement' },
                            { icon: 'ic-chat-bubble', text: localize('Notification') },
                            { icon: 'ic-two-step'   , text: localize('Purchase Confirmation') },
                            { icon: 'ic-lock-open',   text: localize('Purchase Lock') },
                        ]}
                    />
                </footer>
            </div>
        </MobxProvider>
    </Router>
);

BinaryApp.propTypes = {
    root_store: PropTypes.object,
};

export default initApp;