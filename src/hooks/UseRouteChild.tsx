import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { RouteType } from '@config/routes/type';

const UseRouteChild = (props: { routes: RouteType[] }): React.ReactNode => {
  const { routes } = props;
  return routes?.map(
    ({ path, component: ComponentName, exact = true, redirect }) => {
      if (redirect) {
        return <Redirect exact from={path} to={redirect} key={path} />;
      }
      return (
        <Route
          exact={routes.length === 0 && exact}
          key={path}
          path={path}
          render={(props) =>
            ComponentName && <ComponentName {...props} routes={routes} />
          }
        />
      );
    },
  );
};

export default UseRouteChild;
