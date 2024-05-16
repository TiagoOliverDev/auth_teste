import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, TextField, Button } from '@mui/material';

export const Login: React.FC = () => {
  return (
    <Box className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardContent>
          <Box className="flex flex-col gap-2 w-72">
            <Typography variant="h6" align="center">b2bit</Typography>

            <TextField
              fullWidth
              type="email"
              label='Email'
            />

            <TextField
              fullWidth
              label='Senha'
              type="password"
            />
          </Box>
        </CardContent>

        <CardActions>
          <Box className="w-full flex justify-center">
            <Button
              variant="contained"
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
