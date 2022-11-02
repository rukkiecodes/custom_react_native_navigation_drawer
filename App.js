import { StatusBar } from 'expo-status-bar'
import { useRef, useState } from 'react'
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import img from './assets/img.png'

export default function App () {
  const [currentTab, setCurrentTab] = useState('Home')
  const [showMenu, setShowMenu] = useState(false)

  const offsetValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(1)).current
  const closeButtonOffset = useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'flex-start', padding: 20 }}>
        <Image source={img} style={{
          width: 60,
          height: 60,
          borderRadius: 10
        }} />

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>Terry Ochuko</Text>

        <TouchableOpacity>
          <Text style={{ marginTop: 6, color: 'white' }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {TabButton(currentTab, setCurrentTab, 'Home')}
          {TabButton(currentTab, setCurrentTab, 'Search')}
          {TabButton(currentTab, setCurrentTab, 'Notification')}
          {TabButton(currentTab, setCurrentTab, 'Settings')}
        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, 'Log out')}
        </View>
      </View>

      {
        // Overlay view
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming view
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>
        {
          // Menu Button
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true
              }).start()

              Animated.timing(offsetValue, {
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true
              }).start()

              Animated.timing(closeButtonOffset, {
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true
              }).start()

              setShowMenu(!showMenu)
            }}
            style={{
              backgroundColor: 'black',
              borderRadius: 8,
              width: 70,
              height: 40,
              paddingHorizontal: 10,
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white'
            }}>Menu</Text>
          </TouchableOpacity>

          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black'
          }}>{currentTab}</Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  )
}

const TabButton = (currentTab, setCurrentTab, title) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title == 'Log out') { }
      else
        setCurrentTab(title)
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        borderRadius: 8,
        paddingLeft: 20,
        paddingRight: 50,
        marginTop: 10
      }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: currentTab == title ? 'black' : 'white' }}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4040',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
})
