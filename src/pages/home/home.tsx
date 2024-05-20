import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import { LayoutBasePages } from '../../shared/layouts';
import { DetailTools } from '../../shared/components/detailsTools/DetailTools';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../shared/contexts';
import { UserService } from '../../shared/services/api/user/UserService';
import { Label } from '../../shared/components/home/label';
import { TextData } from '../../shared/components/home/textData';


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
                    console.error('Erro ao buscar dados do usuário: ', result.message);
                    return;
                }

                if (result && result.name && result.email) {
                    setName(result.name);
                    setEmail(result.email);
                    setPhotoProfile(result.avatar.high)
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
            <Box className="flex items-center justify-center w-full h-full min-h-screen overflow-hidden">
                <Card
                    className='w-[396px] h-[355px] rounded-lg'
                    style={{borderRadius: 16}}
                >
                    <CardContent>
                        <Box className="flex flex-col gap-2 w-full">
                            <Typography variant="h4" align="center" fontSize="16px">Profile Picture</Typography>
                            <Box className="flex items-center justify-center">
                                <Avatar style={{borderRadius: 8, width: 58, height: 56}} alt="Nome do Usuário" src={photoProfile} />
                            </Box>
                            
                            <Box className="mb-4">
                                <Label title={<span>Your <strong>Name</strong></span>}/>
                                <TextData data={name} />
                            </Box>

                            <Box>
                                <Label title={<span>Your <strong>E-mail</strong></span>}/>
                                <TextData data={email} />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            
        </LayoutBasePages>
    )
}