import { Box, Button, Icon, Paper, Typography} from "@mui/material";
import { IDetailToolsProps } from "../../../@types/IDetailToolsProps";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';


export const DetailTools: React.FC<IDetailToolsProps> = ({
    textButtonLogout = " ",
    showButtonLogout = false,
    whenCilickingButtonLogout,
}) => {

    return (
        <Box
            component={Paper}
            className="mx-1 p-1 px-2 flex gap-1 items-center overflow-hidden"
        >
            <Box className="flex-grow" /> 
            {showButtonLogout && (
              <Button
                className="w-[385.88px] h-[54px] flex items-center"
                style={{backgroundColor: '#02274F', borderRadius: 9, marginLeft: 'auto'}}
                variant="contained"
                color="primary"
                disableElevation
                onClick={whenCilickingButtonLogout}
                endIcon={
                    <Icon style={{ height: '24px', display: 'flex', alignItems: 'center' }}>
                        <KeyboardTabIcon/>
                    </Icon>
                }
              >
                <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                  {textButtonLogout}
                </Typography>
              </Button>
            )}
        </Box>
    );
};