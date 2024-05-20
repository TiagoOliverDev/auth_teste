import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardActions, TextField, Button, CircularProgress } from '@mui/material';
import { useState } from "react";
import { useAuthContext } from '../../shared/contexts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LabelGeneral } from '../../shared/components/login/labelGeneral';
import { AlertGeneral } from '../../shared/components/alert/alertGeneral';


const b2bitLogo = 'LOGOTIPO.svg'

const loginSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(5, 'A senha deve ter pelo menos 5 caracteres'),
});


export const Login: React.FC = () => {
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlertError, setShowAlertError] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        login(values.email, values.password)
          .then((result) => {
            if (typeof result === 'string' && result !== 'Login successful') {
              setShowAlertError(true);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error('Erro genérico durante o login:', error);
          });
      },
  });

  useEffect(() => {
    if (showAlertError) {
        const timer = setTimeout(() => {
            setShowAlertError(false);
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [showAlertError]);

  return (
    <Box className="w-screen h-screen flex items-center justify-center" >

      {showAlertError && (
          <AlertGeneral message="Invalid credentials, please try again!" severityTipo='error' />
      )}

        <Card 
          className='w-[438px] h-[534px]'
          style={{
            borderRadius: 18,
            padding: '23px',
            overflow: 'hidden',
            boxShadow: `
              0 4px 8px rgba(0, 0, 0, 0.1),
              0 4px 12px rgba(0, 0, 0, 0.1),
              0 4px 16px rgba(0, 0, 0, 0.1),
              0 4px 20px rgba(0, 0, 0, 0.1),
              0 4px 24px rgba(0, 0, 0, 0.1),
              0 4px 28px rgba(0, 0, 0, 0.1),
              0 4px 32px rgba(0, 0, 0, 0.1)
            `
          }}
        >
          <CardContent>
            <Box className="flex flex-col items-center justify-center gap-y-8 w-full h-full">
              <img src={b2bitLogo} alt="B2bit Logo" style={{ width: 309.6, height: 94.81, marginBottom: '33px', marginTop: '34px' }} />
            </Box>

            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Box>
                  <LabelGeneral htmlFor='Idemail' title='E-mail' />
                  <TextField
                      role="E-mail"
                      id='Idemail'
                      fullWidth
                      type="email"
                      variant="filled"
                      placeholder="@gmail.com"
                      {...formik.getFieldProps('email')}
                      disabled={isLoading}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      style={{ marginBottom: '23px', borderRadius: 15 }} 
                  />
                </Box>

                <Box>
                  <LabelGeneral htmlFor='Idpassword' title='Password' />
                  <TextField
                      role="Password"
                      id='Idpassword'
                      fullWidth
                      type="password"
                      variant="filled"
                      placeholder="***************"
                      {...formik.getFieldProps('password')}
                      disabled={isLoading}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      style={{ marginBottom: '23px', borderRadius: 15 }} 
                  />
                </Box>

                <CardActions>
                  <Box className="w-full flex justify-center">
                    <Button
                      className="fixed w-[385.88px] h-[54px] flex items-center"
                      style={{backgroundColor: '#02274F', borderRadius: 9}}
                      variant="contained"
                      disabled={isLoading}
                      type="submit"
                      endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" role="progressbar" color="primary" /> : undefined}
                    >
                      Sign In
                    </Button>
                  </Box>
                </CardActions>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
  );
};
