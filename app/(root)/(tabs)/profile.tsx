import { ActivityIndicator, Alert, Image, ImageSourcePropType, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { logout } from '@/lib/appwrite';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
    <View className='flex-row items-center gap-3'>
      <Image source={icon} className='size-6' />
      <Text className={`text-lg font-rubik-medium w-4/6 text-black-300 ${textStyle}`}>{title}</Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className='size-5' />}
  </TouchableOpacity>
)

const Profile = () => {
  const { user, refetch } = useGlobalContext()

  const handleLogout = async () => {
    const result = await logout()

    while (!result) {
      return (
        <SafeAreaView className="bg-white h-full flex justify-center items-center">
          <ActivityIndicator className="text-primary-300" size="large" />
        </SafeAreaView>
      )
    }
    if (result) {
      Alert.alert("Success", "You have been logged out successfully")
      refetch()
    } else {
      Alert.alert("Error", "An error occured while logging out")
    }
  }


  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
      >
        <View className='flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <View>
            <Image source={icons.bell} className='size-5' />
            <View className='bg-primary-300 w-2 h-2 rounded-full absolute right-0'></View>
          </View>
        </View>

        <View className='flex-row justify-center mt-3'>
          <View className='items-center relative mt-3'>
            <Image source={{ uri: user?.avatar }} className='size-44 relative rounded-full' />
            <TouchableOpacity className='absolute bottom-11 right-2'>
              <Image source={icons.edit} className='size-9' />
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
          </View>
        </View>

        <View className='mt-5'>
          <SettingsItem icon={icons.calendar} title='My Bookings' />
          <SettingsItem icon={icons.wallet} title='Payments' />
        </View>

        <View className='mt-3 border-t pt-5 border-primary-200'>
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className='flex-col borrder-t pt-5 border-primary-200'>
          <SettingsItem icon={icons.logout} title='Logout' textStyle='text-danger' showArrow={false} onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
