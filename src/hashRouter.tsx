import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';

export const history = createHashHistory();

const MyHashRouter = ({ ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), []);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default MyHashRouter;