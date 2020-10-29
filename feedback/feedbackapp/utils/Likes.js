import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Entypo'

const colors = {
  transparent: 'transparent',
  white: '#fff',
  heartColor: '#55ADEE',
  textPrimary: '#515151',
  black: '#000', 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  card: {
    height: 45,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2
  },
  image: {
    marginTop: 10,
    height: 280,
    width: '92%'
  },
  photoDescriptionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
    left: 328,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    bottom: 80,
    borderRadius: 100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2

  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    left: 3
  },
  animatedIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 160,
    opacity: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    backgroundColor: colors.transparent,
    color: colors.textPrimary
  },
  textPhotographer: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textContainer: {
    flexDirection: 'row',
    textAlign: 'left',
    paddingTop: 0
  }
})

const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

class Likes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      liked: false
    }

    this.lastPress = 0
  }


  handleSmallAnimatedIconRef = (ref) => {
    this.smallAnimatedIcon = ref
  }


  handleOnPress = () => {
    const time = new Date().getTime()
     this.lastPress = time
  }

  handleOnPressLike = () => {
    this.smallAnimatedIcon.bounceIn()
    this.setState(prevState => ({ liked: !prevState.liked }))
  }

  render() {
    const { liked } = this.state

    return (
     
      <View style={styles.photoDescriptionContainer}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.handleOnPressLike}
          >
            <AnimatedIcon
              ref={this.handleSmallAnimatedIconRef}
              name={liked ? 'heart' : 'heart-outlined'}
              color={liked ? colors.heartColor : colors.textPrimary}
              size={25}
              style={styles.icon}
            />
          </TouchableOpacity>
          
        </View>
    )
  }
}

export default Likes