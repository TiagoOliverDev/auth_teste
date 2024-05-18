import React from 'react';
import { Login } from './shared/components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoutes } from "./shared/routes";
import { useAuthContext, AuthProvider } from './shared/contexts';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LoginWrapper />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;


const LoginWrapper = () => {
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuthContext();

  if (isAuthenticated) {
    return (
      <AppRoutes />
    );
  } else {
    return <Login />;
  }
};