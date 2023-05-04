import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import theme from './../../styles/theme';
import PickerOptionType from './../../types/PickerOptionType';
import { PickerLabel, PickerWrapper } from './styles';

type DifficultyLevelPickerProps = {
  defaultOption: PickerOptionType;
  options: PickerOptionType[];
  finallyTreatment?: () => void;
}

const Picker = ({ defaultOption, options, finallyTreatment }: DifficultyLevelPickerProps) => {
  const [selectedOption, setSelectedOption] = useState<PickerOptionType>(defaultOption);
  const [isMenuOpen, setIsOpen] = useState<boolean>(false);

  const openMenu = () => {
    setIsOpen(true);
  }

  const closeMenu = () => {
    setIsOpen(false);
  }

  return (
    <Menu
      anchor={(
        <PickerWrapper onPress={openMenu}>
          <FontAwesomeIcon
            name={isMenuOpen ? 'caret-up' : 'caret-down'}
            size={theme.sizes.iconSize}
            color={theme.colors.text} />
            
          {defaultOption && !selectedOption && <PickerLabel>{defaultOption.optionLabel}</PickerLabel>}
          {selectedOption && <PickerLabel>{selectedOption.optionLabel}</PickerLabel>}
        </PickerWrapper>
      )}
      visible={isMenuOpen}
      onDismiss={closeMenu}
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
              closeMenu();
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