import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { AppRoutes } from "./shared/routes";
import { AuthProvider } from './shared/contexts';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;