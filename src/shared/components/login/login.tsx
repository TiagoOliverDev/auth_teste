import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useAuthContext } from '../../contexts';
import { useState } from "react";
import * as yup from 'yup'


const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
})

export const Login: React.FC = () => {

  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
    setIsLoading(true)
    console.log(email)
    console.log(password)

    loginSchema
    .validate({ email, password }, { abortEarly: false })
    .then(dadosValidados => {
      setIsLoading(true);
      login(dadosValidados.email, dadosValidados.password)
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Erro durante o login:', error);
        });
    })
    .catch((errors: yup.ValidationError) => {
      setIsLoading(false);
      if (errors.inner) {
        errors.inner.forEach(error => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      } else {
        console.error('Erro de validação inesperado:', errors);
      }
    });
  }

  return (
    <Box className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardContent>
          <Box className="flex flex-col gap-2 w-72">
            <Typography variant="h6" align="center">b2bit</Typography>

            <TextField
              fullWidth
              type="email"
              label='E-mail'
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError('')}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label='Password'
              type="password"
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
        </CardContent>

        <CardActions>
          <Box className="w-full flex justify-center">
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleSubmit}
              endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" color="inherit" /> : undefined}
            >
              SigIn
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
