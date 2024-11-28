import SelectDropdown from 'react-native-select-dropdown'
import { IconSymbol } from '@/components/ui/IconSymbol';
import { View,StyleSheet,Text } from 'react-native';


  export default function SelectInput({items,title,selected})
  {
  

 return (
  <SelectDropdown
    data={items}
    onSelect={(selectedItem, index) => {
      // console.log(selectedItem, index);
      selected(selectedItem)
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          {selectedItem && (
            <IconSymbol size={28} name="check" color={"#000"} />
            // <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
          )}
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || title}
          </Text>
          <IconSymbol size={28} name={isOpened ? 'arrowDropUp' : 'arrowDropDown'} color={"#000"} style={styles.dropdownButtonArrowStyle} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
)
}

  const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: '100%',
      height: 40,
      backgroundColor: '#27A046',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#fff',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
      color: '#fff',
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });