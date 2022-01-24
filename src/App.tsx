import React, {useEffect, useMemo} from 'react';
import {Route, Routes} from 'react-router-dom'
import Router from './hashRouter'
import {Provider} from 'react-redux'
import store from './store';
import styles from './app.module.less'
import Layout from './layout';
import { router, IRoutes } from './router/router';
import lazyLoad from '@/utils/loadable'


function formatRoutes(router) {
  const res = []
  function travel(router) {
    router.forEach((route) => {
      console.log('route.component', route.component)
      if (route.path && !route.children) {
        const component = import(`./pages/${route.component}`)  // 把import放到回调函数里会报错
        route.component = lazyLoad( () => component)
        res.push(route);
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    })
  }
  travel(router)
  return res
}
function App() {
  const flatRouter = useMemo(() => formatRoutes(router as IRoutes[]), [])
  useEffect(() => {
    console.log('app')
  }, [])
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
            {
              flatRouter.map(item => {
                return (
                  <Route
                   key={item.path}
                   path={item.path}
                   element={
                     <item.component/>
                   }
                  />
                )
              })
            }
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
