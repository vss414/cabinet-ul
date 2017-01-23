import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// import { createDevTools } from 'redux-devtools'
// import LogMonitor from 'redux-devtools-log-monitor'
// import DockMonitor from 'redux-devtools-dock-monitor'

import App from './App.jsx';
import * as reducers from './reducers'
import { LoginPage, LoggedInLayout, HomePage, SettingsPage, NoticePage, DocumentsPage } from './containers'

// const DevTools = createDevTools(
//     <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//         <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//     </DockMonitor>
// );


// инициализация хранилища
const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
const store = createStore(
    reducer,
    persistedState,
    // DevTools.instrument()
);
// подписываем хранилище React`a на локальное хранилище на клиенте
store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});
const history = syncHistoryWithStore(browserHistory, store);

// роутинг
ReactDOM.render(
    <Provider store={store}>
        <div>
        <Router history={history}>
            <Route path='/' component={App}>
                <Route path='/login' component={LoginPage} />
                <Route path='/logout' />
                <Route component={LoggedInLayout}>
                    <IndexRoute component={HomePage}/>
                    <Route path='/settings' component={SettingsPage} />
                    <Route path='/notice' component={NoticePage} />
                    <Route path='/documents' component={DocumentsPage}>
                        <Route path='/documents/last' component={DocumentsPage} />
                    </Route>
                    {/*<Route path='/inbox' component={InboxPage}>*/}
                        {/*<Route path='/inbox/messages/:messageId' component={Message} />*/}
                    {/*</Route>*/}
                </Route>
            </Route>
        </Router>
        {/*<DevTools />*/}
        </div>
    </Provider>,
    document.getElementById('root')
);