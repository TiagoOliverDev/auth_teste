
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
// import { useAuthContext } from "../../contexts";
// import { useState } from "react";
// import * as yup from 'yup'

export const Login: React.FC = () => {

    
    return(
        <Box width={'100vw'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            
        <Card>
            <CardContent>
                <Box display={'flex'} flexDirection={'column'} gap={2} width={350}>
                    <Typography variant="h6" align="center">Login</Typography>

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
                    <Box width={'100%'} display={'flex'} justifyContent={'center'}>

                        <Button
                            variant="contained"
                        >
                            Entrar
                        </Button>

                    </Box>
                </CardActions>
        </Card>

    </Box>
    )
}