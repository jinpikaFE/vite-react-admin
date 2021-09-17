import React, { lazy, useEffect } from 'react';
import request from 'umi-request';
import { Button } from 'antd';
import { Observer, useLocalStore, useObserver } from 'mobx-react';
import { todoStore } from '@/stores/todo';
const Component = lazy(() => import('@/pages/test'));

const Test: React.FC = (props) => {
  const localStore = useLocalStore(() => todoStore);
  useEffect(() => {
    request
      .get('/api/datauser')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Observer>
      {() => (
        <div>
          homessd{JSON.stringify(localStore.undoneCount)}
          <Button onClick={() => localStore.addNewTodo()}>dasf</Button>
          <Button onClick={() => {localStore.removeById(1)}}>dasf</Button>
          <Component />
        </div>
      )}
    </Observer>
  );
};

export default Test;
