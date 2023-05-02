import { useState } from 'react';
import { Menu } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import theme from '../../styles/theme';
import PickerOptionType from '../../types/PickerOptionType';
import { PickerWrapper, PickerLabel } from './styles';
import { StyleSheet } from 'react-native';

type DifficultyLevelPickerProps = {
  label?: string;
  defaultOption?: PickerOptionType;
  options: PickerOptionType[];
  finallyTreatment?: () => void;
}

const Picker = ({ label, defaultOption, options, finallyTreatment }: DifficultyLevelPickerProps) => {
  const [selectedOption, setSelectedOption] = useState<PickerOptionType | null>(defaultOption || null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePress = () => {
    setIsOpen(!isOpen);
  }

  if (!label && !defaultOption) {
    throw new Error('Invalid props.');
  }

  return (
    <Menu
      anchor={(
        <PickerWrapper onPress={handlePress}>
          <FontAwesomeIcon
            name={isOpen ? 'caret-up' : 'caret-down'}
            size={16}
            color={theme.colors.text} />
            
          {label && <PickerLabel>{label}</PickerLabel>}
          {defaultOption && !selectedOption && <PickerLabel>{defaultOption.optionLabel}</PickerLabel>}
          {selectedOption && <PickerLabel>{selectedOption.optionLabel}</PickerLabel>}
        </PickerWrapper>
      )}
      visible={isOpen}
      onDismiss={() => setIsOpen(false)}
      contentStyle={styles.menuContentStyle}>
      {options.map(({ optionLabel, handlePress, customIcon: CustomIcon }) => {
        const isSelected = optionLabel === selectedOption.optionLabel;

        return (
          <Menu.Item
            key={optionLabel}
            title={optionLabel}
            leadingIcon={CustomIcon ? CustomIcon : (props) => isSelected ? <FeatherIcon name="check" {...props} /> : <></>}
            onPress={() => {
              handlePress();
              if (finallyTreatment) {
                finallyTreatment();
              }
              setIsOpen(false);
              setSelectedOption({ optionLabel, handlePress });
            }}
            style={styles.menuItemStyle}
            titleStyle={styles.menuItemTitleStyle}
            disabled={isSelected} />
        );
      })}
    </Menu>
  );
}

const styles = StyleSheet.create({
  menuContentStyle: {
    backgroundColor: 'white',
  },

  menuItemStyle: {
    height: 32,
    marginLeft: 4,
  },

  menuItemTitleStyle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular
  },
});

export default Picker;