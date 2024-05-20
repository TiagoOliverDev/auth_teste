import { Typography } from "@mui/material";
import { ILabel } from "../../../@types/ILabel"

export const Label: React.FC<ILabel> = ({ titleLabel }) => {
    return (
        <Typography 
            className="block mb-1 text-[15px] font-bold leading-[22.5px] text-left text-[#262626]"
            variant="caption" 
            display="block" 
        >
        {titleLabel}
        </Typography>
    );
  };