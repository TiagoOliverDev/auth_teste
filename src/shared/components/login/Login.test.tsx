import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './login';
import { AuthProvider } from '../../contexts';
import { AuthContext } from '../../contexts/AuthContext';
import { IAuthContextData } from '../../../@types/IAuthContextData';
import { act } from 'react';


describe('Login Component and AuthProvider render', () => {
    test('Login Component and AuthProvider are renders without crashing', () => {
        render(<AuthProvider><Login /></AuthProvider>);
    });
})

describe('Login Component fild submit Sign in', () => {
    test('Renders Login component and looks for Sign in', () => {
        render(
            <AuthProvider> 
            <Login />
            </AuthProvider>
        );
        const signInButton = screen.getByText(/sign in/i);  
        expect(signInButton).toBeInTheDocument();
    });
})

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

describe('Login Component submit form to login', () => {
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
        
        // definindo spyOn
        jest.spyOn(context, 'login').mockResolvedValue('authenticated'); 
    
        //eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            userEvent.type(screen.getByLabelText('E-mail'), 'cliente@youdrive.com');
            userEvent.type(screen.getByLabelText('Senha'), 'password');
            userEvent.click(screen.getByText('Sign In'));
        });
    
        expect(context.login).toHaveBeenCalledWith('cliente@youdrive.com', 'password');
    });
});

describe('Login Component logout', () => {
    test('Logs out the user when the Logout button is clicked', async () => {
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
    
        await act(async () => {
            await context.login('cliente@youdrive.com', 'password');
        });
    
        expect(context.isAuthenticated).toBe(true);
    
        const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    
        await act(async () => {
            context.logout();
        });
    
        expect(context.isAuthenticated).toBe(false);
        expect(context.id_user).toBeUndefined();
    
        expect(removeItemSpy).toHaveBeenCalledWith('APP_ACCESS_TOKEN');
        expect(removeItemSpy).toHaveBeenCalledWith('APP_USER_ID');
    
        removeItemSpy.mockRestore();
    });
});


