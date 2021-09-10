import React, { Suspense }  from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import routes from '@config/routes';
const setTitle = (title = 'jinpika') => {
  document.title = title;
}
const RouterView = () => {
  return (
    // 建议使用 HashRouter
    <Suspense fallback={<div>Loading...</div>}>
    <HashRouter >
      <Switch>
      {
          routes.map(({path, component: ComponentName, exact = true, routes = []}, key) => {
            return <Route
              exact={routes.length !== 0 && exact}
              key={key}
              path={path}
              component={(props: any) => (<ComponentName {...props} routes={routes} />)}
            />
          })
        }
      </Switch>
    </HashRouter>
    </Suspense>
  )
}

export default RouterView
