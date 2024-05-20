
import { Alert, Box, Collapse } from "@mui/material";
import { IAlert } from "../../../@types/IAlert";
import { useState } from "react";

export const AlertGeneral: React.FC<IAlert> = ({ message, severityTipo }) => {

    const [showAlertSuccess] = useState<boolean>(true);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 80,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
            }}
        >
        <Collapse in={showAlertSuccess}>
            <Box display="flex" justifyContent="center" my={2}>
                <Alert severity={severityTipo} style={{ width: 'fit-content' }}>
                    {message}
                </Alert>
            </Box>
        </Collapse>
    </Box>
    );
  };