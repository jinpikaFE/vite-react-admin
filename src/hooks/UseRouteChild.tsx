import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { RouteType } from '@config/routes/type';

const UseRouteChild: React.FC<{ routes: RouteType[] }> = (props) => {
  const { routes } = props;
  console.log(routes, 'ssss');
  const renderRoute = (val: RouteType[]) => (
    <>
      {val?.map(
        ({
          path,
          component: ComponentName,
          exact = true,
          redirect,
          routes: cRoutes,
        }) => {
          if (redirect) {
            return <Redirect exact from={path} to={redirect} key={path} />;
          }
          return (
            <Route
              exact={val.length === 0 && exact}
              key={path}
              path={path}
              render={(props) =>
                ComponentName && <ComponentName {...props} routes={cRoutes} />
              }
            />
          );
        },
      )}
    </>
  );

  return <>{renderRoute(routes)}</>;
};

export default UseRouteChild;
