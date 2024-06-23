import React from 'react'
import { View,Text,StyleSheet, TouchableOpacity, Button } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Task({text,completion,index}) {
  return (
    <View style={styles.item}>
        <View style={styles.leftside}>
            <TouchableOpacity onPress={()=>completion(index)}>
            <AntDesign name="delete" size={24} color="black" style={styles.box}/>
            </TouchableOpacity>
            <Text style={styles.tasktext}>{text}</Text>
        </View>
        <View style={styles.circle}></View>
    </View>
  )
}
const styles = StyleSheet.create({
    item:{
        backgroundColor:'pink',
        borderRadius:10,
        padding:15,
        opacity:0.8,
        top:30,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        alignItems:'center'
    }, 
    leftside:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap'
    },
    box:{
        marginRight:10
    },
    tasktext:{
        maxWidth:'80%'
    },
    circle:{
        height:15,
        width:15,
        borderColor:'#7c87bf',
        borderWidth:2,
        borderRadius:10,
        marginRight:5,
    }
})

