import { createContext } from 'react';
import type { NavigationContextValue } from '../types/navigation';

export const NavigationContext = createContext<NavigationContextValue | null>(null);
