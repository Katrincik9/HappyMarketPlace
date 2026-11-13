export type NavigationPage = 'products' | 'cart' | 'login';

export type NavigationItem = {
  page: NavigationPage;
  label: string;
};

export type NavigationContextValue = {
  activePage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
};