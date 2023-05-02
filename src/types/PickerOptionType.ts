import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

type PickerOptionType = {
  optionLabel: string;
  handlePress: () => void;
  customIcon?: IconSource;
}

export default PickerOptionType;