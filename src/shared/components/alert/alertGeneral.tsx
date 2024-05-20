
import { Alert, Box, Collapse } from "@mui/material";
import { IAlert } from "../../../@types/IAlert";

export const AlertGeneral: React.FC<IAlert> = ({ message, severityTipo, showAlert }) => {
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
        <Collapse in={showAlert}>
            <Box display="flex" justifyContent="center" my={2}>
                <Alert severity={severityTipo} style={{ width: 'fit-content' }}>
                    {message}
                </Alert>
            </Box>
        </Collapse>
    </Box>
    );
  };