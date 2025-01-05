import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Google from '../../assets/images/Registration/google.svg';

const GoogleSignInScreen = () => {
  const accounts = [
    { name: 'Doris Gabriel', email: 'gabrieldoris12@gmail.com', avatar: 'https://via.placeholder.com/50' },
    { name: 'Doris Ngaju', email: 'ngajudoris@gmail.com', avatar: '' },
    { name: 'Lilly Gabriel', email: 'lilly.gabriel@gmail.com', avatar: '' },
  ];

  const renderItem = ({ item }:any) => (
    <TouchableOpacity style={styles.accountItem}>
      {item.avatar ? (
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      ) : (
        <View style={styles.defaultAvatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
      )}
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{item.name}</Text>
        <Text style={styles.accountEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>accounts.google.com</Text>
        </View>

        <View style={styles.signInContainer}>
          <Google width={20} height={20} color="#4285F4" style={styles.googleIcon} />
          <Text style={styles.signInText}>Sign in with Google</Text>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Choose an account</Text>
        <Text style={styles.subtitle}>to continue to <Text style={styles.appName}>On the go</Text></Text>

        <FlatList
          data={accounts}
          renderItem={renderItem}
          keyExtractor={(item) => item.email}
          style={styles.accountList}
        />
      </View>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  
    justifyContent: 'flex-end',
  },
  container: {
    height: height * 0.5,  
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelText: {
    color: '#1a73e8',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 120,  
  },  // <-- Added closing brace here
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    marginRight: 10,
  },
  signInText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',  
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 8,
    color: '#000',  
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',  
    marginBottom: 20,
  },
  appName: {
    color: '#1a73e8',
    fontWeight: '400',
  },
  accountList: {
    marginTop: 10,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  defaultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
  },
  accountInfo: {
    justifyContent: 'center',
  },
  accountName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',  
  },
  accountEmail: {
    fontSize: 11,
    fontWeight: '600',
  },
  
});

export default GoogleSignInScreen;
