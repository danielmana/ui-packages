import { createTheme } from '@mui/material/styles';

const { augmentColor } = createTheme().palette;

const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

export default createColor;
