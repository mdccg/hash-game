import TilesetType from '../../types/TilesetType';
import CircleIcon from '../CircleIcon';
import CrossIcon from '../CrossIcon';
import { CustomIconWrapper, CustomIconWrapperGap } from './styles';

type CustomIconPickerOptionProps = {
  tileset: TilesetType;
}

const CustomIconPickerOption = ({ tileset }: CustomIconPickerOptionProps) => {
  return (
    <CustomIconWrapper>
      <CrossIcon  tileset={tileset} size={16} />
      <CustomIconWrapperGap />
      <CircleIcon tileset={tileset} size={16} />
    </CustomIconWrapper>
  );
}

export default CustomIconPickerOption;