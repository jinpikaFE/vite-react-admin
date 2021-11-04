import React, { Suspense } from 'react';
<<<<<<< HEAD
import { Route, Switch } from 'react-router-dom';
=======
import { Route, Switch, BrowserRouter } from 'react-router-dom';
>>>>>>> e8fbd1edc97f6d3e693548c2636cdddfcdf2f982
import routes from '@config/routes';
import Loading from '@/components/Loading';
import GuardRouter from './GuardRouter';

const RouterView = () => {

  return (
    // 建议使用 HashRouter
    <Suspense fallback={<Loading />}>
<<<<<<< HEAD
      <GuardRouter>
=======
      <BrowserRouter>
>>>>>>> e8fbd1edc97f6d3e693548c2636cdddfcdf2f982
        <Switch>
          {routes.map(
            (
              { path, component: ComponentName, exact = true, routes = [] },
              key,
            ) => {
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
                  }}
                />
              );
            },
          )}
        </Switch>
<<<<<<< HEAD
      </GuardRouter>
=======
      </BrowserRouter>
>>>>>>> e8fbd1edc97f6d3e693548c2636cdddfcdf2f982
    </Suspense>
  );
};

export default RouterView;
