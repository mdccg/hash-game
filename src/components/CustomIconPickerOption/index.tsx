import theme from '../../styles/theme';
import TilesetType from './../../types/TilesetType';
import CircleIcon from './../CircleIcon';
import CrossIcon from './../CrossIcon';
import { CustomIconWrapper, CustomIconWrapperGap } from './styles';

type CustomIconPickerOptionProps = {
  tileset: TilesetType;
}

const CustomIconPickerOption = ({ tileset }: CustomIconPickerOptionProps) => {
  return (
    <CustomIconWrapper>
      <CrossIcon  tileset={tileset} size={theme.sizes.iconSize} />
      <CustomIconWrapperGap />
      <CircleIcon tileset={tileset} size={theme.sizes.iconSize} />
    </CustomIconWrapper>
  );
}

export default CustomIconPickerOption;