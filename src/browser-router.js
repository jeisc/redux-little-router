// @flow
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useBasename from 'history/lib/useBasename';
import useQueries from 'history/lib/useQueries';

import installRouter from './store-enhancer';
import routerMiddleware from './middleware';

type BrowserRouterArgs = {
  routes: Object,
  basename: string,
  getLocation: () => Location
};

/* istanbul ignore next: unstubbable! */
const realLocation = () => window.location;

export default ({
  routes,
  basename,
  getLocation = realLocation
}: BrowserRouterArgs) => {
  const history = useBasename(useQueries(createBrowserHistory))({
    basename
  });

  const { pathname, search } = getLocation();
  const location = history
    .createLocation({ pathname, search });

  return {
    routerEnhancer: installRouter({ routes, history, location }),
    routerMiddleware: routerMiddleware({ history })
  };
};
