export type NavigationPath = '/products' | '/cart' | '/admin' | '/account';

export type NavigationItem = {
  path: NavigationPath;
  label: string;
};
