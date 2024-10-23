import React from 'react';
import { useAbility } from './AbilityContext';

const withAuthorization = (WrappedComponent, subject, action) => {
  return (props) => {
    const ability = useAbility();
    return ability.can(action, subject) ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuthorization;
