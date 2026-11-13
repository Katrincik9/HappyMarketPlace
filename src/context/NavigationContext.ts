import { createContext } from 'react';
import type { NavigationContextValue } from '../types/navigationTypes';

export const NavigationContext = createContext<NavigationContextValue | null>(null);
