import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { RouteType } from '@config/routes/type';

const UseRouteChild: React.FC<{ routes: RouteType[] }> = (props) => {
  const { routes } = props;
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
          return (
            <Route
              exact={val.length === 0 && exact}
              key={path}
              path={path}
              render={(props) =>{
                if (redirect) {
                  return <Redirect to={redirect} key={path} />;
                }
                if (ComponentName) {
                  return <ComponentName {...props} routes={cRoutes} />
                }
              }
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
