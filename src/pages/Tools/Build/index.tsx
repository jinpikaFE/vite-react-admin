import React from 'react';
import { observer } from 'mobx-react';
import { FormBuilderContainer } from './components/Container';

const Build: React.FC = () => {
  return (
    <div className="h-full">
      <FormBuilderContainer />
    </div>
  );
};

const ObservedBuild = observer(Build);
export default ObservedBuild;
