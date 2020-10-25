import React , {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
export default class AddModal extends Component{
    constructor (props){
        super(props);
        this.state={
            newFoodName:'',
            newFoodDescription:''
        };
    }
    showAddModal = () =>{
        this.refs.myModal.open();

    }
    generateKey = (numberOfCharacters)=>{
        return require('random-string') ({length: numberOfCharacters});
    }
    render(){
        return(
            <Modal 
            ref={"myModal"}
            style={{
                justifyContent: 'center',
                borderRadius: Platform.OS == 'android' ? 30 : 0,
                shadowRadius: 10,
                width: screen.width - 80,
                height: 280
            }}
            position='center'
            backdrop={true}
            onClosed={()=>{
                // alert("Modal close");

            }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40

                }}
                >New food's infrormation</Text>
                <TextInput style={{
                    height: 40,
                    borderBottomColor: 'gray',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    marginBottom: 10,
                    borderBottomWidth: 1
                }}
                onChangeText={(Text)=>this.setState({newFoodName: Text})}
                placeholder="Enter new food name"
                value={this.state.newFoodName}
                />
                <TextInput style={{
                    height: 40,
                    borderBottomColor: 'gray',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    marginBottom: 10,
                    borderBottomWidth: 1
                }}
                onChangeText={(Text)=>this.setState({newFoodDescription: Text})}
                placeholder="Enter new foodDescription"
                value={this.state.newFoodDescription}
                />
                <Button style={{ fontSize: 18, color: 'white'}}
                containerStyle={{
                    padding: 8,
                    marginLeft: 70,
                    marginRight: 70,
                    height: 40,
                    borderRadius: 6,
                    backgroundColor:'mediumseagreen'
                }}
                onPress={()=>{
                    if(this.state.newFoodName.length==0 || this.state.newFoodDescription.length==0){
                        alert("You must enter foodname and description");
                        return;
                    }
                    const newKey=this.generateKey(24);
                    const newFood = {
                        key: newKey,
                        name: this.state.newFoodName,
                        imageUrl:"https://tutrungbaybanhkem.com/wp-content/uploads/2019/09/Cach-lam-kem-bo-trong-Han-Quoc.jpg",
                        foodDescription: this.state.newFoodDescription
                    };
                    flatListData.push(newFood);
                    this.props.parentFlatList.refreshFlatList(newKey);
                    this.refs.myModal.close();

                }}>
                    Save

                </Button>

            </Modal>
        );
    }
}