import React from 'react';
import { useRouter } from './RouterContext';

export function Routes({ routes }) {
  const { currentPath } = useRouter();

  const route =
    routes.find((r) => r.path === currentPath) ||
    routes.find((r) => r.path === '*');

  if (!route) {
    return <div>404 - Not Found</div>;
  }

  return <route.component />;
}
