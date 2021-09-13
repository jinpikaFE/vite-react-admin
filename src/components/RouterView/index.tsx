import React, { Suspense } from 'react';
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom';
import routes from '@config/routes';
const setTitle = (title = 'jinpika') => {
  document.title = title;
};
const RouterView = () => {
  return (
    // 建议使用 HashRouter
    <Suspense fallback={<div>Loading...</div>}>
      <HashRouter>
        <Switch>
          {routes.map(
            ({ path, component: ComponentName, exact = true, routes = [] }, key) => {
              return (
                <Route
                  exact={routes.length === 0 && exact}
                  key={key}
                  path={path}
                  render={(props: any) => {
                    //登录情况下
                    if (true) {
                      return (
                        ComponentName && (
                          <ComponentName {...props} routes={routes} />
                        )
                      );
                    }
                    // 非授权页面
                    if (!item.auth) {
                      return <ComponentName {...props} routes={routes} />;
                    }
                    // 未登录并页面授权时跳入登录页面
                    return <Redirect to="/login" />;
                  }}
                />
              );
            },
          )}
        </Switch>
      </HashRouter>
    </Suspense>
  );
};

export default RouterView;
