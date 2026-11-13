import { useState } from 'react';
import type { ReactNode } from 'react';
import type { NavigationPage } from '../types/navigation';
import { NavigationContext } from './NavigationContext';

function NavigationProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<NavigationPage>('products');
  const contextValue = { activePage, onNavigate: setActivePage };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationProvider;
