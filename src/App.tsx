import React from 'react';
import { Login } from './shared/components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoutes } from "./shared/routes";
import { useAuthContext } from './shared/contexts';

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LoginWrapper />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;


const LoginWrapper = () => {
  // const { isAuthenticated }: { isAuthenticated: boolean } = useAuthContext();

  let isAuthenticated = true

  if (isAuthenticated) {
    return (
      <AppRoutes />
    );
  } else {
    return <Login />;
  }
  // return <Login />;
};