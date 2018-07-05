import React , { Component } from 'react';
import { View , Text , TouchableOpacity ,TextInput , AsyncStorage , Alert } from 'react-native';

export default class RowComponent extends Component {
  render() {
    const { ID, label, placeholder, labeldata , onChangeText } = this.props
    return(
        <View style={styles.container}>
          <Text style={styles.labelStyle}>{label}</Text>
          <TextInput
            style={styles.labelData}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={labeldata}
          />
        </View>
    )
  }
}

const styles={
  container: {
    flexDirection: 'row' ,
    justifyContent: 'space-between',
    backgroundColor:'#fff',
    width: '100%',
    marginBottom: 2,
    padding:10
  },
  labelStyle: {
    fontSize: 16
  },
  labelData: {
    fontSize: 18,
    textAlign:'right',
    color: 'rgb(81,108,246)',
    fontWeight: '700'
  },
  inputTextStyle: {
    width: '50%',
    fontSize: 16,
  }
}