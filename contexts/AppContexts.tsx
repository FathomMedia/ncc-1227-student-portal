import { createContext, FC, PropsWithChildren, useContext } from "react";

// interface for all the values & functions
interface IUseAppContext {}

// the default state for all the values & functions
const defaultState: IUseAppContext = {};

// creating the app contexts
const AppContext = createContext<IUseAppContext>(defaultState);

// Access app values and functions with custom useAppContext hook
export const useAppContext = () => useContext(AppContext);

// The App provider to wrap the components that will use the context
export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const app = useProviderApp();
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

//NOTE: declare vars and functions here
function useProviderApp() {
  // NOTE: return all the values & functions you want to export
  return {};
}
