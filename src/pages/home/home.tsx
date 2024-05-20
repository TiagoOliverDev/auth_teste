import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
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
                                <Typography 
                                    variant="caption" 
                                    display="block" 
                                    style={{
                                        marginBottom: '4px', 
                                        fontSize: '14px', 
                                        fontWeight: 700, 
                                        lineHeight: '22.5px',
                                        textAlign: 'left',
                                        color: '#262626'
                                    }}
                                >
                                    Your Name
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    display="block" 
                                    style={{ 
                                        marginBottom: '15px', 
                                        padding: '10px', 
                                        backgroundColor: '#f5f5f5', 
                                        borderRadius: '8px' 
                                    }}
                                >
                                    {name}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography 
                                    variant="caption" 
                                    display="block" 
                                    style={{
                                        marginBottom: '4px', 
                                        fontSize: '14px', 
                                        fontWeight: 700, 
                                        lineHeight: '22.5px',
                                        textAlign: 'left',
                                        color: '#262626'
                                    }}
                                >
                                    Your E-mail
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    display="block" 
                                    style={{ 
                                        padding: '10px', 
                                        backgroundColor: '#f5f5f5', 
                                        borderRadius: '8px' 
                                    }}
                                >
                                    {email}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            
        </LayoutBasePages>
    )
}