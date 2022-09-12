import { createTheme, PaletteColorOptions } from '@mui/material/styles';

const { augmentColor } = createTheme().palette;

const createColor = (mainColor: string): PaletteColorOptions =>
  augmentColor({ color: { main: mainColor } });

export default createColor;
