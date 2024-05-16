import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, TextField, Button, Avatar } from '@mui/material';

export const Home: React.FC = () => {

    
    return(
        <Box className="w-screen h-screen flex items-center justify-center">
            <Card>
                <CardContent>
                    <Box className="flex flex-col gap-2 w-72">
                    <Typography variant="h4" align="center">Profile Picture</Typography>
                    <Avatar alt="Nome do Usuário" src="https://cognuro-app-assets.s3.amazonaws.com/media/images/IMG_4452_0spsnuL.jpg" />
                    
        
                    <TextField
                        fullWidth
                        type="name"
                        label='Your Name'
                    />
        
                    <TextField
                        fullWidth
                        label='Your Email'
                        type="email"
                    />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}