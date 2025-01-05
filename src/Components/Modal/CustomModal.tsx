import React, { useEffect, useRef } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  children?: any;
  style?: any;
}

const CustomModal = ({ visible, onDismiss, children, style }: ModalProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500, // Adjust duration for slower or faster transition
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500, // Adjust duration for slower or faster transition
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={onDismiss}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onDismiss}
        activeOpacity={1}
      >
        <Animated.View style={[styles.modalContainer, style, { opacity }]}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
  modalContainer: {
    backgroundColor: '#FDFAFF',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    width: '80%',
    elevation: 10, // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CustomModal;
