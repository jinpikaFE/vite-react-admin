import { todoStore } from '@/stores/todo';
import { useLocalStore } from 'mobx-react';
import React from 'react';

const Test: React.FC = () => {
  const localStore = useLocalStore(() => todoStore);
  return (<div>tests{JSON.stringify(localStore.todos)}</div>);
};

export default Test;
