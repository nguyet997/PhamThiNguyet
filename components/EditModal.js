import React , {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
export default class EditModal extends Component{
    constructor (props){
        super(props);
        this.state={
            foodName:'',
            foodDescription:''
        };
    }
    showEditModal = (editingFood, flatlistItem) =>{
        // console.log('editingFood = ${JSON.stringify(editingFood)}');
        this.setState({
            key:editingFood.key,
            foodName:editingFood.name,
            foodDescription:editingFood.foodDescription,
            flatlistItem:flatlistItem
        })
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
                >food's infrormation</Text>
                <TextInput style={{
                    height: 40,
                    borderBottomColor: 'gray',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    marginBottom: 10,
                    borderBottomWidth: 1
                }}
                onChangeText={(Text)=>this.setState({foodName: Text})}
                placeholder="Enter food name"
                value={this.state.foodName}
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
                onChangeText={(Text)=>this.setState({foodDescription: Text})}
                placeholder="Enter new foodDescription"
                value={this.state.foodDescription}
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
                    if(this.state.foodName.length==0 || this.state.foodDescription.length==0){
                        alert("You must enter foodName and description");
                        return;
                    }
                    //Update food
                    var foundIndex = flatListData.findIndex(item => this.state.key==item.key);
                    if(foundIndex<0){
                        return;
                    }
                    flatListData[foundIndex].name=this.state.foodName;
                    flatListData[foundIndex].foodDescription=this.state.foodDescription;
                    //refreshFlatListItem
                    this.state.flatlistItem.refreshFlatListItem();
                    this.refs.myModal.close();

                }}>
                    Save

                </Button>

            </Modal>
        );
    }
}