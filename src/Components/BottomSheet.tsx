import React, { useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Button,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const comments = [
  {
    id: '1',
    text: 'This is a fantastic app for managing tasks!',
    likes: 300,
    name: 'John Doe',
    image:
      'https://images.unsplash.com/photo-1685903772095-f07172808761?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '2',
    text: 'I love the reminders and collaboration features.',
    likes: 54,
    name: 'Jane Smith',
    image:
      'https://images.unsplash.com/photo-1685903772095-f07172808761?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '3',
    text: 'Sharing tasks with my team has never been easier.',
    likes: 130,
    name: 'Alice Brown',
    image:
      'https://images.unsplash.com/photo-1685903772095-f07172808761?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
  },
  
];

const BottomSheetModal = ({ snapPoints, bottomSheetRef, handleSheetChanges, handleClosePress, handleOpenPress }: any) => {

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Post Content Here</Text>
        <TouchableOpacity onPress={handleOpenPress} style={styles.commentButton}>
          <Text style={styles.commentButtonText}>Open Comments</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Start in closed state
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        style={styles.bottomSheet}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{comments.length} Comments</Text>
            </View>

            {/* Comments List */}
            <BottomSheetFlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.profileImage}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                  <Text style={styles.likeCount}>{item.likes} Likes</Text>
                </View>
              )}
              style={styles.commentsList}
            />

            {/* Comment Input */}
            <View style={styles.footer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1685903772095-f07172808761?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
                }}
                style={styles.userLogo}
              />
              <TextInput
                style={styles.commentInput}
                placeholder="Write a comment..."
              />
              <TouchableOpacity style={styles.sendIconContainer}>
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomSheet: {
    zIndex: 10,
    elevation: 10, // Ensure it's on top
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentsList: {
    flexGrow: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    color: '#333',
  },
  likeCount: {
    alignSelf: 'center',
    marginLeft: 10,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  userLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f1f1f1',
  },
  sendIconContainer: {
    marginLeft: 10,
  },
  sendText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
