import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './login';
import { AuthProvider, useAuthContext } from '../../contexts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from '../../../App';
import { AuthContext } from '../../contexts/AuthContext';
import { IAuthContextData } from '../../../@types/IAuthContextData';
import { act } from 'react';

test('Login renders without crashing', () => {
    render(<Login />);
});

test('AuthProvider renders without crashing', () => {
    render(<AuthProvider><div /></AuthProvider>);
});


test('renders Login component and looks for Sign in', () => {
    render(
      <AuthProvider> 
        <Login />
      </AuthProvider>
    );
    const signInButton = screen.getByText(/sign in/i);  
    expect(signInButton).toBeInTheDocument();
  });

describe('Login Component input fields and submit button', () => {
    test('renders email and password input fields and a submit button', () => {
        render(
            <AuthProvider> 
                <Login />
            </AuthProvider>
        );
  
      const emailInput = screen.getByLabelText('E-mail');
      const passwordInput = screen.getByLabelText('Senha');
  
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
  
      const signInButton = screen.getByText('Sign In');
      expect(signInButton).toBeInTheDocument();
    });
  });


// ############################################################################################################


  describe('Login Component submit', () => {
    test('submits the form data when Sign In button is clicked', async () => {
        let context: IAuthContextData = {} as any;

        //eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            render(
                <AuthProvider>
                    <>
                        <AuthContext.Consumer>
                            {value => {
                                context = value;
                                return null;
                            }}
                        </AuthContext.Consumer>
                        <Login />
                    </>
                </AuthProvider>
            );
        });
    
        jest.spyOn(context, 'login').mockResolvedValue('authenticated'); // definindo spyOn
    
        // Simulating user input
        //eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            userEvent.type(screen.getByLabelText('E-mail'), 'cliente@youdrive.com');
            userEvent.type(screen.getByLabelText('Senha'), 'password');
            userEvent.click(screen.getByText('Sign In'));
        });
    
        // Since 'login' is a jest.fn() you can check if it was called
        expect(context.login).toHaveBeenCalledWith('cliente@youdrive.com', 'password');
    });
  });


// describe('Login Component', () => {
//     test('isLoading should be true when Sign In is clicked', async () => {
//       render(
//         <AuthProvider>
//           <Login />
//         </AuthProvider>
//       );
  
//       const signInButton = screen.getByRole('button', { name: /sign in/i });
//       userEvent.click(signInButton);
  
//       // Uso de findByRole para esperar automaticamente pela presença do CircularProgress
//       const progressIndicator = await screen.findByRole('progressbar', {}, { timeout: 500 });
//       expect(progressIndicator).toBeInTheDocument();
//     });
//   });
