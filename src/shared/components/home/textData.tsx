import { Typography } from "@mui/material";
import { ITextData } from "../../../@types/ITextData";

export const TextData: React.FC<ITextData> = ({ data }) => {
    return (
        <Typography 
            variant="body1" 
            display="block" 
            style={{ 
                marginBottom: '8px', 
                padding: '10px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '8px' 
            }}
        >
        {data}
        </Typography>
    );
  };