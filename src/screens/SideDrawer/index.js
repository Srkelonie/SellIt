import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { Button } from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';

class SidedrawerComponent extends Component {
  state = {
    buttons: [
      {
        value: 'Home',
        iconName: 'home',
        shouldGoTo: 'Home',
        privacy: false
      },
      {
        value: 'Sell',
        iconName: 'dollar',
        shouldGoTo: 'SellIt',
        privacy: false
      },
      {
        value: 'My posts',
        iconName: 'home',
        shouldGoTo: 'UserPosts',
        privacy: true
      },
    ]
  }

  navigateToScreen = (route) => {
    this.props.navigation.navigate(route);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }
  
  button = (button) => (
    <Button
      key={button.value}
      name={button.iconName}
      backgroundColor='#474143'
      iconStyle={{width: 15}}
      color='#ffffff'
      size={18}
      onPress={() => this.navigateToScreen(button.shouldGoTo)}
    >
      <Text style={styles.buttonText}>
        {button.value}
      </Text>
    </Button>
  )

  showButtons = (buttons) => (
    buttons.map( button => (
      !button.privacy ? 
        this.button(button)
      :  this.props.User && this.props.User.userData && this.props.User.userData.uid ?
          this.button(button)
          : null
    ))
  )

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {this.showButtons(this.state.buttons)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474143'
  },
  buttonContainer: {
    padding: 10,
    marginTop: 20
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#ffffff'
  }
})

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

export default connect(mapStateToProps,null)(SidedrawerComponent);