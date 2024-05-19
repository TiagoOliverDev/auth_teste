import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useState } from "react";
import { useAuthContext } from '../../contexts';
import { useFormik } from 'formik';
import * as yup from 'yup';

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
    <Box className="w-screen h-screen flex items-center justify-center">
      <Card 
        className='w-[534px] h-[438px]'
        style={{borderRadius: 18}}
      >
        {/* <CardContent style={{width: 385.88, height: 288, top: 205.88, left: 25.88, borderRadius: 9}}> */}
        <CardContent >
          <Box className="flex flex-col items-center justify-center gap-y-8 w-full h-full">
            <Typography variant="h6" align="center">b2bit</Typography>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                type="email"
                label='E-mail'
                {...formik.getFieldProps('email')}
                disabled={isLoading}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth
                label='Senha'
                type="password"
                {...formik.getFieldProps('password')}
                disabled={isLoading}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              <CardActions>
                <Box className="w-full flex justify-center">
                  <Button
                    className="w-[385.88px] h-[54px] flex items-center"
                    // style={{backgroundColor: '#02274F', borderRadius: 9}}
                    variant="contained"
                    disabled={isLoading}
                    type="submit"
                    endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" role="progressbar" color="inherit" /> : undefined}
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
