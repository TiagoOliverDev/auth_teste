import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Avatar } from '@mui/material';
import { LayoutBasePages } from '../../shared/layouts';
import { DetailTools } from '../../shared/components/detailsTools/DetailTools';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../shared/contexts';
import { UserService } from '../../shared/services/api/user/UserService';



export const Home: React.FC = () => {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [photoProfile, setPhotoProfile] = useState<string>('')

    const navigate = useNavigate()
    const { logout } = useAuthContext()

    const handleLogout = () => {
        logout()
        navigate("/")
    }
    
    useEffect(() => {
        UserService.getByToken()
            .then((result) => {
                if (result instanceof Error) {
                    console.error('Erro ao buscar dados do usuário', result.message);
                    return;
                }

                if (result && result.name && result.email) {
                    setName(result.name);
                    setEmail(result.email);
                    setPhotoProfile(result.avatar.high)
                    console.log(result)
                } else {
                    console.error('Dados do usuário não estão disponíveis ou incompletos.');
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do usuário', error);
            });
    }, [name, email, photoProfile]); 

    return(
        <LayoutBasePages
            toobar={
                <DetailTools 
                    textButtonLogout='Logout'
                    showButtonLogout
                    whenCilickingButtonLogout={() => handleLogout()} 
                />
            }
        >

            <Box className="w-screen h-screen flex items-center justify-center">
                <Card>
                    <CardContent>
                        <Box className="flex flex-col gap-2 w-72">
                        <Typography variant="h4" align="center">Profile Picture</Typography>
                        <Avatar alt="Nome do Usuário" src={photoProfile} />
                        
                        <TextField
                            fullWidth
                            type="name"
                            label='Your Name'
                            value={name}
                        />
        
                        <TextField        
                            fullWidth       
                            label='Your Email'      
                            type="email"        
                            value={email}
                        />  
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            
        </LayoutBasePages>
    )
}