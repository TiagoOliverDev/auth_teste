import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login } from '../../pages';
import { useAuthContext } from '../contexts';
import { IPrivateRouteProps } from '../../@types/IPrivateRouteProps';

export const AppRoutes = () => {
    const { isAuthenticated } = useAuthContext();
  
    const PrivateRoute: React.FC<IPrivateRouteProps> = ({ isAuthenticated, children }) => {
        return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
    };

    return (
      <Routes>
            <Route 
                path="/login" 
                element={
                    isAuthenticated ? <Navigate to="/home" replace /> : <Login />
                }  
            />
            <Route 
                path="/home" 
                element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Home />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/" 
                element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} 
            />
      </Routes>
    );
  };
  

