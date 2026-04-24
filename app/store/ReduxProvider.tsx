"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import StoreInitializer from "./StoreInitializer";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreInitializer />
      {children}
    </Provider>
  );
}
