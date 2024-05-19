import React from 'react';
import { Box, Card, CardContent, CardActions, TextField, Button, CircularProgress, InputLabel } from '@mui/material';
import { useState } from "react";
import { useAuthContext } from '../../contexts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../../../index.css'



const b2bitLogo = 'LOGOTIPO.svg'

const loginSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(5, 'A senha deve ter pelo menos 5 caracteres'),
});


export const Login: React.FC = () => {
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      login(values.email, values.password)
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Erro durante o login:', error);
        });
    },
  });

  return (
    <Box className="w-screen h-screen flex items-center justify-center" >
      <Box
        style={{
          background: 'linear-gradient(145deg, rgba(243,243,243,1) 0%, rgba(255,255,255,1) 100%)',
          padding: '23px',
          borderRadius: 9,
          overflow: 'hidden'
        }}
      >
      
        <Card 
          className='w-[438px] h-[534px]'
          style={{borderRadius: 18}}
        >
          {/* <CardContent style={{width: 385.88, height: 288, top: 205.88, left: 25.88, borderRadius: 9}}> */}
          <CardContent>
            <Box className="flex flex-col items-center justify-center gap-y-8 w-full h-full">
              <img src={b2bitLogo} alt="B2bit Logo" style={{ width: 309.6, height: 94.81, marginBottom: '33px', marginTop: '43px' }} />
            </Box>

            <Box>
              <form onSubmit={formik.handleSubmit}>
              <InputLabel
                htmlFor="Idemail"
                style={{
                  marginBottom: '9px',
                  fontSize: '18px', 
                  fontWeight: 700, 
                  lineHeight: '22.5px',
                  textAlign: 'left',
                  color: '#262626'
                }}
              >
                E-mail
              </InputLabel>
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
                style={{ marginBottom: '25px', borderRadius: 15 }} 
              />

              <InputLabel
                htmlFor="Idpassword"
                style={{
                  marginBottom: '9px',
                  fontSize: '18px', 
                  fontWeight: 700, 
                  lineHeight: '22.5px',
                  textAlign: 'left',
                  color: '#262626'
                }}
              >
                Password
              </InputLabel>
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
                style={{ marginBottom: '32px', borderRadius: 15 }} 
              />
                <CardActions>
                  <Box className="w-full flex justify-center">
                    <Button
                      className="w-[385.88px] h-[54px] flex items-center"
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
    </Box>
  );
};
