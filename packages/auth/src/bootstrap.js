import React from 'react';
import ReactDOM  from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

/**
 * Mount function to start up the app
 * @param { HTMLDivElement } el 
 */
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  onNavigate && history.listen(onNavigate);
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      if (history.location.pathname === nextPathName) return;
      history.push(nextPathName)
    }
  }
}

// If we are in development and in isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  /** @type { HTMLDivElement } */
  const devRoot = document.getElementById('_auth-dev-root');
  if (devRoot) mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// We are running through container
// and we should export the mount function
export { mount };