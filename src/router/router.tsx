import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import Home from '../pages/Home';
import CharacterDetail from '../pages/CharacterDetail';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
  validateSearch: (search: Record<string, unknown>) => ({
    page: typeof search.page === 'string' ? parseInt(search.page) : 1,
  }),
});

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterDetail,
});

// New way to define route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  detailRoute,
]);


export const router = createRouter({
  routeTree,
});
