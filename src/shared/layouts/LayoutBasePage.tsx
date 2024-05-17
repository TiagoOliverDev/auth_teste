
import { ILayoutBase } from "../../@types/ILayoutBase";
import { Box } from "@mui/material";


export const LayoutBasePages: React.FC<ILayoutBase> = ({ children, toobar }) => {
    

    return (
        <Box height={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
            {toobar && (
                <Box>
                    {toobar}
                </Box>
            )}

            <Box flex={1} overflow={"auto"}>
                {children}
            </Box>
        </Box>
    );
    
}