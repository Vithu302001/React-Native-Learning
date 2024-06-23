import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Task from './components/task';
import Entypo from '@expo/vector-icons/Entypo';
import { useState, useEffect } from 'react';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasks = await AsyncStorage.getItem('tasks');
      if (tasks !== null) {
        setTask(JSON.parse(tasks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = () => {
    if (inputText.trim()) {
      const newTasks = [...task, inputText];
      setTask(newTasks);
      saveTasks(newTasks);
      setInputText('');
    }
  };

  const deletionOnComplete = (ind) => {
    const newTasks = task.filter((_, index) => index != ind);
    setTask(newTasks);
    saveTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Your Today's Tasks</Text>
      <ScrollView contentContainerStyle={styles.tasks}>
        {task.map((t, index) => {
           return <Task key={index} text={t} completion={deletionOnComplete} index = {index}></Task>
        })}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={styles.textinputcontainer}
      >
        <TextInput
          style={styles.textinput}
          placeholder='Add Task..'
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity onPress={addTask}>
          <View style={styles.addbutton}>
            <Entypo name="add-to-list" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor:'#c2f2f1'
  },
  headingText: {
    fontSize: 25,
    fontFamily:'font-family: Georgia, serif',
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  tasks: {
    paddingBottom: 80, 
  },
  textinputcontainer: {
    width: '90%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 10,
    left:20,
    padding:10
    
  },
  textinput: {
    flex: 1,
    height: 50,
    backgroundColor: '#86a1b8',
    opacity: 0.5,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  addbutton: {
    backgroundColor: '#86a1b8',
    borderRadius: 50,
    opacity: 0.5,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addbuttontext: {
    fontSize: 30,
    color: 'white',
  }
});
