import { ILayoutBase } from "../../@types/ILayoutBase";
import { Alert, Box, Collapse } from "@mui/material";
import { useAuthContext } from "../contexts";
import { useEffect, useState } from "react";
import { AlertGeneral } from "../components/alert/alertGeneral";

export const LayoutBasePages: React.FC<ILayoutBase> = ({ children, toobar }) => {
    const { isAuthenticated } = useAuthContext();
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthenticated) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated]);

    return (
        <Box style={{ backgroundColor: '#F1F5F9' }} height={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
            {toobar && (
                <Box className="fixed top-0 left-0 right-0 z-50 bg-[#F1F5F9]">
                    {toobar}
                </Box>
            )}
            
            <AlertGeneral message="Login successful" showAlert={showAlert} severityTipo='success' />

            <Box flex={1} overflow={"auto"}>
                {children}
            </Box>
        </Box>
    );
};
