
import { ILayoutBase } from "../../@types/ILayoutBase";
import { Box } from "@mui/material";


export const LayoutBasePages: React.FC<ILayoutBase> = ({ children, toobar }) => {
    

    return (
        <Box style={{ backgroundColor: '#F1F5F9' }} height={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
            {toobar && (
                <Box className="fixed top-0 left-0 right-0 z-50 bg-[#F1F5F9]">
                    {toobar}
                </Box>
            )}

            <Box flex={1} overflow={"auto"}>
                {children}
            </Box>
        </Box>
    );
    
}