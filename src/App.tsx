import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Router from './hashRouter'
import {Provider} from 'react-redux'
import store from './store';
import styles from './app.module.less'
import Layout from './layout';
function App() {
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout></Layout>}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
