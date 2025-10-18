import { Dropdown } from 'react-native-element-dropdown';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DropdownItem {
  label: string;
  value: string;
}

interface Props {
  field: string;
  placeholder: string;
  options: string[];
  currentValue: string;
  onSelect: (field: string, value: string) => void;
}

export const RenderDropdown: React.FC<Props> = ({
  field,
  placeholder,
  options,
  currentValue,
  onSelect,
}) => {
  const data: DropdownItem[] = options.map(opt => ({
    label: opt,
    value: opt,
  }));

  return (
    <View style={styles.dropdownContainer}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={currentValue}
        onChange={(item) => onSelect(field, item.value)}
        maxHeight={250}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 15,
  },
  dropdown: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  itemTextStyle: {
    fontSize: 14,
    color: '#333',
  },
});
