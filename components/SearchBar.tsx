import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

interface Props {
    placeholder: string
    onPress?: () => void
    value: string
    onChangeText: (text: string) => void
}

const SearchBar = ({ placeholder, onPress, value, onChangeText}: Props) => {

  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" tintColor="#ab8bff" />
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#a8b5db"
            className="flex-1 ml-2 text-white"
                style={{ flex: 1, marginLeft: 8, color: 'white', borderWidth: 0, outlineWidth: 0 }}
            onPress={onPress}
            value={value}
            onChangeText={onChangeText}
        />  
    </View>
  )
}

export default SearchBar