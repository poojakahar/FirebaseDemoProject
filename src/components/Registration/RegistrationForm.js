import React , { Component } from 'react';
import { View , Text , TouchableOpacity ,TextInput , AsyncStorage , Alert , ActivityIndicator } from 'react-native';
import RowComponent from "./RowComponent";
import {connect} from 'react-redux'
import { saveData ,getData, editData } from "../../Action/UserAction";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstname: '',
      lastname: '',
      company: '',
      department: '',
      position: '',
      email:'',
      loading: false,
    }
  }

  componentDidMount() {
    let userData = this.props.userData;

    /*if(userData) {
      this.setState({
        firstname: userData.firstname,
        lastname: userData.lastname,
        company: userData.company,
        department: userData.department,
        position: userData.position,
        email: userData.email,
        loading: false,
      })
    }
    else
    {*/
      AsyncStorage.getItem("ID")
        .then((res)=>{
          this.setState({id: res},()=>this.getAllData());
        })
        .catch((err)=>{
          alert("Error Occured: " + err)
        })
   // }
  }

  _onChangeText(key,value) {
    this.setState({[key]:value});
  }

  getAllData() {
    this.setState({loading: true})
    this.props.getData().then(()=>{
      let userData = this.props.userData;

      if(userData) {
        userData=this.props.userData[this.state.id];

        if(userData)
        {
          this.setState({
            firstname: userData.firstname || '',
            lastname: userData.lastname || '',
            company: userData.company || '',
            department: userData.department || '',
            position: userData.position || '',
            email: userData.email || '',
            loading: false,
          })
        }
        else{
          this.setState({loading: false})
        }
      }
      else {
        this.setState({loading: false})
      }

    }).catch((err)=>{
      alert("Error Occured: " + err)
      this.setState({loading: false})
    });
  }

  onSave() {
    const { id, firstname, lastname, company, department, position, email } = this.state;


    let email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = email && email_regx.test(email);

    if(email.length > 0) {
      if(!valid) {
        return alert("Wrong Email")
      }
    }

    let obj = {
      firstname: firstname || '',
      lastname: lastname || '',
      company: company || '',
      department: department || '',
      position: position || '',
      email: email || ''
    }
    this.setState({loading: true})

    if (id) {
      let editObj = {
        id: id,
        obj: {
          ...obj
        }
      }
      this.props.editData(editObj)
        .then((res) => {
          this.setState({loading: false})
        })
        .catch((err) => {
          alert("Error Occured: " + err)
          this.setState({loading: false})
        });
    }
    else {
      this.props.saveData(obj)
        .then((res) => {
          let key = this.props.id;
          AsyncStorage.setItem("ID", key)
            .then((res) => {
              this.getAllData()
            })
            .catch((err) => {
              alert("Error Occured: " + err)
            })
        })
        .catch((err) => {
          alert("Error Occured: " + err)
        });
    }
  }

  render() {
    const { id , firstname , lastname , company , department , email , position, loading } = this.state;

    if(loading) {
      return (
        <View style={[styles.container,{justifyContent:'center'}]}>
          <ActivityIndicator size={'large'}/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <RowComponent ID={id} label={"First Name"}
                        placeholder={"Enter First Name"}
                        labeldata={firstname}
                        onChangeText={(text) => this._onChangeText("firstname", text)}/>

          <RowComponent ID={id}
                        label={"Last Name"}
                        placeholder={"Enter Last Name"}
                        labeldata={lastname}
                        onChangeText={(text) => this._onChangeText("lastname", text)} />
        </View>

        <View style={styles.rowContainer}>
          <RowComponent ID={id}
                        label={"Company"}
                        placeholder={"Enter Company"}
                        labeldata={company}
                        onChangeText={(text) => this._onChangeText("company", text)} />

          <RowComponent ID={id} label={"Department"}
                        placeholder={"Enter Department"}
                        labeldata={department}
                        onChangeText={(text) => this._onChangeText("department", text)} />

          <RowComponent ID={id} label={"Position"}
                        placeholder={"Enter Position"}
                        labeldata={position}
                        onChangeText={(text) => this._onChangeText("position", text)} />
        </View>

        <View style={styles.rowContainer}>
          <RowComponent ID={id} label={"Email"}
                        placeholder={"Enter Email"}
                        labeldata={email}
                        onChangeText={(text) => this._onChangeText("email", text)} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onSave()}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps=state=>{
  return{
    id:state.User.id,
    userData: state.User.userData
  }
}

export default connect(mapStateToProps,{
  saveData,
  getData,
  editData
})(RegistrationForm);

const styles={
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#ededed'
  },
  rowContainer: {
    marginBottom: 10,
    width: '100%'
  },
  buttonContainer: {
    width: '100%',
    alignItems:'center',
    backgroundColor:'#fff',
    flex: 1,
    paddingTop:10,
  },
  buttonStyle: {
    padding:10,
    backgroundColor: 'rgb(81,108,246)',
    //opacity: 0.6,
    borderRadius: 5,
    width:'30%',
    alignItems:'center',
    justifyContent:'center',
    height: '13%'
  },
  buttonText: {
    color: '#fff',
    fontSize:18,
    fontWeight: '700'
  }
}