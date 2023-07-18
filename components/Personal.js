import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert,Text } from 'react-native';
import Footer from './Footer';
import { PageHeader } from './PageHeader';
const PersonalDetail = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    // Regular expression for name validation
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
   
  };

  const validatePhone = (phone) => {
    // Regular expression for phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validateName(name)) {
      Alert.alert('Invalid Name', 'Please enter a valid name.');
      return;
    }

    if (!validatePhone(phone)) {
     setErrorMessage('error')
      return;
    }

    // Submit the form data
    // Your logic here
    Alert.alert('Form Submitted', 'Thank you for submitting the form!');
  };

  return (
    <View style={styles.container}>
     <PageHeader
          title="Personal info"
          subtitle="Please provide your name, email address, and phone number."
          style={styles.header}
        />
       
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhone(text)}
        value={phone}
        keyboardType="phone-pad"
        maxLength={10}
      />
        <Text fontWeigth='bold' customStyle={styles.errorMessage}>
          {errorMessage}
        </Text> 
        <View style={styles.button}>
        <Button
        title="Next step "
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button:
  {
    flex:1,
    width:'50%'
  }
});

export default PersonalDetail;
