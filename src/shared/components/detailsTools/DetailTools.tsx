import { Box, Button, Icon, Paper, useTheme, Divider, Skeleton, Typography, useMediaQuery, Theme } from "@mui/material";
import { IDetailToolsProps } from "../../../@types/IDetailToolsProps";
import SaveIcon from '@mui/icons-material/Save';


export const DetailTools: React.FC<IDetailToolsProps> = ({
    textButtonLogout = "Logout",
    showButtonLogout = false,
    whenCilickingButtonLogout,
}) => {

    // const theme = useTheme();
    // const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    // const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

    return (
        <Box
            // height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display={"flex"}
            gap={1}
            alignItems={"center"}
            component={Paper}
        >
            {(showButtonLogout) && (
                <Button
                    className="bg-[#02274F] text-white py-2 px-4 flex items-center gap-2 rounded shadow-none hover:bg-[#011f3e] focus:outline-none"
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonLogout}
                    startIcon={ <Icon> <SaveIcon /> </Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        {textButtonLogout}
                    </Typography>
                </Button>
            )}

            {/* {showButtonLogout && (
                <Skeleton width={109} height={60} />
            )} */}

        </Box>
    );
};