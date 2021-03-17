import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
      key: 'one',
      title: 'Welcome To The App!',
      text: 'This app helps people randomise and save their passwords so that their accounts cannot be hacked easily.',
      image: require('../assets/first.gif'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Get Your Randomised Password In A Click!',
      text: '    ',
      image: require('../assets/second.gif'),
      backgroundColor: '#7CC7FF',
  
    },
    {
      key: 'three',
      title: 'Goodbye To Traditional Passwords!',
      text: 'No need to think so much on your passwords',
      image: require('../assets/four.gif'),
      backgroundColor: '#6891FF'
    },
    {
      key : 'four',
      title: 'You Can Save Your Password Too!',
      text: 'We will keep the password safe and secure.',
      image: require('../assets/three.gif')  ,
      backgroundColor: '#FEBE29',
    },
  
  ]
  
  
  export default class Intro extends React.Component{
  
    constructor(props){ 
      super(props)
  
      this.state = {
        showMainApp : false
      }
    }
  
    onAllSlidesDone = () => {
      this.setState({showMainApp : true})
      this.props.navigation.navigate('Generate')

    }
  
    onSkipSlides = () => {
      this.setState({showMainApp: true})
      this.props.navigation.navigate('Generate')

    }
  
    renderItem = ({item}) => {
      return(
        <View style={{
            flex: 1,
            backgroundColor: item.backgroundColor,
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 100
        }}>
          <Text style = {styles.title}>{item.title}</Text>
          <Image style = {styles.image} source={item.image} />
          <Text style = {styles.text}>{item.text}</Text>
        </View>
      )
    }
  
  
    render(){
       return (
       <View>
        <AppIntroSlider 
                renderItem = {this.renderItem} 
                data = {slides} 
                onDone = {this.onAllSlidesDone} 
                onSkip = {this.onSkipSlides} 
                showSkipButton = {true} 
          />
        </View>
        )
  }
}
  
  const styles = StyleSheet.create({
  
    title: { 
      fontSize: 26, 
      color: '#111', 
      fontWeight: 'bold', 
      textAlign: 'center', 
      marginTop: 20, 
     }, 
     text: { 
      color: '#111', 
      fontSize: 20, 
      textAlign: 'center',
     }, 
  
     image: { 
      width: 300, 
      height: 300, 
      resizeMode: 'contain' ,
      marginTop: 50,
      marginBottom: 70
     },
  
     buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
     },
  });
