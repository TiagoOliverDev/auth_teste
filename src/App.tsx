import React from 'react';
import { Login } from './shared/components';

const App: React.FC = () => {
  return (
    <Login /> 
  );
};

export default App;


// const LoginWrapper = () => {
//   const { isAuthenticated }: { isAuthenticated: boolean } = useAuthContext();

//   if (isAuthenticated) {
//     return (
//       <AppDrawerProvider>
//         <MenuDrawer>
//           <AppRoutes />
//         </MenuDrawer>
//       </AppDrawerProvider>
//     );
//   } else {
//     return <Login />;
//   }
// };