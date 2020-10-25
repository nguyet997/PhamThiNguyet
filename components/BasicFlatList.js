import React , {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight} from 'react-native';
import flatListData from '../data/flatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import EditMadal from './EditModal';
import EditModal from './EditModal';

class FlatListItem extends Component{
    constructor(props){
        super(props);
        this.state={
            activeRowKey: null,
            numberOfRefresh: 0
        };
    }
    refreshFlatListItem = () =>{
        this.setState((prevState)=>{
            return{
                numberOfRefresh: prevState.numberOfRefresh + 1

            };
        });
    }
    render(){
        const swipeSetting={
            autoClose: true,
            onClose: (setId, rowId, direction)=>{
                this.setState({activeRowKey: null});

            },
            onOpen: (setId, rowId, direction)=>{
                this.setState({activeRowKey: this.props.item.key});
            },
            right:[
                {
                    onPress: ()=>{
                        // alert("Update");
                        this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
                    },
                    text:'Edit', type:'primary'

                },
                {
                    onPress: ()=>{
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure want to delete ?',
                            [
                                {text: 'No', onPress: () => console.log('cancle Pressed'), style: 'cancel'},
                                {text: 'yes', onPress: () =>{
                                    flatListData.splice(this.props.index, 1);
                                    //refresh FlataList//
                                    this.props.parentFlatList.refreshFlatList(deletingRow)

                                }},
                            ],
                            {cancleable: true}
                        );

                    },
                    text: 'Delete', type: 'delete'
                }

            ],
            rowId: this.props.index,
            sectionId: 1

        };
        return(
           <Swipeout {...swipeSetting}> 
               <View style={{
                flex:1,
                flexDirection: 'column',
            }}>
                <View style={{
                flex:1,
                flexDirection: 'row',
                //backgroundColor: this.props.index % 2 == 0? 'mediumseagreen':'tomato'//
                backgroundColor: 'green'
            }}>
                <Image  source = {{uri: this.props.item.imageUrl}}
                style = {{width: 120, height: 120, margin:  5}}>

                </Image>
                <View style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                    <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
                </View>
                

            </View>
            <View style={{
                height: 1,
                backgroundColor:'white'
            }}>

            </View>

            </View>
        
           </Swipeout>
            
            
        );
    }
}

const styles = StyleSheet.create({
    flatListItem:{
        color: 'white',
        padding: 10,
        fontSize :16,
    }
});


export default  class BasicFlatList extends Component{
    constructor(props){
        super(props);
        this.state = ({
            deleteRowKey: null,
        });
        this._onPressAdd=this._onPressAdd.bind(this);
    }
    refreshFlatList = (activeKey)=>{
        this.setState((prevState)=>{
            return{
                deleteRowKey:activeKey
            };
        });
        this.refs.flatList.scrollToEnd();
    }
    _onPressAdd(){
        // alert("You add food");
       this.refs.addModal.showAddModal();
    }
    render(){
        return(
            <View style={{flex: 1, margintop: Platform.OS==0}}>
                <View style={{
                    backgroundColor:'tomato',
                    flexDirection:'row',
                    justifyContent:'flex-end',
                    alignItems:'center',
                    height:64
                }}>
                    <TouchableHighlight
                        style={{marginRight: 10}}
                        underlayColor='tomato'
                        onPress={this._onPressAdd}
                        >
                        <Image
                        style={{width: 35, height:35}}
                        source={require('../image/icon-add.jpg')}
                        />
                    </TouchableHighlight>

                </View>
                <FlatList
                ref={"flatList"}
                data={flatListData}
                renderItem={({item, index})=>{
                    //console.log('Item = ${JSON.stringify(item)}, index = ${index}');//
                    return(
                        <FlatListItem item={item} index={index} parentFlatList={this}>

                        </FlatListItem>
                    );
                }}
                >
                </FlatList>
                <AddModal ref={'addModal'} parentFlatList={this}>

                </AddModal>
                <EditModal ref={'editModal'} parentFlatList={this}>

                </EditModal>

            </View>

        );
    }
}