import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import FONTS, {COLORS, SIZES} from '../../constants/theme';
import CommunityModal from '../../Components/Modal/CommunityModal';
import BackArrow from '../../assets/images/Profile/arrow-right.svg';
import DocumentIcon from '../../assets/images/Setup/pdf_10435045 1.svg';
import LoadingSpinner from '../../assets/images/Setup/Content.svg';
import CheckIcon from '../../assets/images/Setup/check.svg';
import PlusIcon from '../../assets/images/Setup/Vector.svg';
import {useToast} from 'react-native-toast-notifications';
import routes from '../../Routes/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

interface DocumentState {
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'completed' | null;
}

const BusinessVerificationScreen = () => {
  const navigation: any = useNavigation();
  const [document, setDocument] = useState<DocumentState | null>(null);
  const [actualDocument, setActualDocument] = useState<
    DocumentPicker.DocumentPickerResponse[] | null
  >(null);
  const [showModal, setShowModal] = useState(false);

  const toast = useToast();

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      setActualDocument(result);

      setDocument({
        name: result[0].name,
        size: result[0].size,
        progress: 0,
        status: 'uploading',
      });

      // Simulate upload progress
      simulateUpload();
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Error picking document:', err);
      }
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDocument(prev =>
        prev
          ? {
              ...prev,
              progress: progress,
              status: progress === 100 ? 'completed' : 'uploading',
            }
          : null,
      );

      if (progress === 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleSubmit = async () => {
    if (document?.status === 'completed' && actualDocument) {
      try {
        await AsyncStorage.setItem('cacDoc', JSON.stringify(actualDocument));

        toast.show('document added successful', {
          type: 'success',
          placement: 'top',
          duration: 3000,
        });
      } catch (error) {
        console.error('Error saving data', error);
      } finally {
        setShowModal(true);
        // navigation.navigate(routes.SETUPBUSINESS);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    return `${Math.round(bytes / 1024)}KB`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Verification</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Upload CAC Document</Text>
        <Text style={styles.subtitle}>This proves you own this business</Text>

        {!document ? (
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={handleDocumentPick}>
            <View style={styles.uploadIcon}>
              <PlusIcon width={14} height={24} />
            </View>
            <Text style={styles.uploadText}>Upload Document</Text>
            <Text style={styles.formatText}>Format should be in PDF</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.documentContainer}>
            <View style={styles.documentInfo}>
              <DocumentIcon width={24} height={24} />
              <View style={styles.documentDetails}>
                <Text style={styles.documentName}>{document.name}</Text>
                <Text style={styles.documentSize}>
                  {formatFileSize(document.size)} • {document.progress}%
                  uploaded
                </Text>
              </View>
              {document.status === 'completed' ? (
                <CheckIcon width={24} height={24} color={COLORS.success} />
              ) : (
                <LoadingSpinner width={24} height={24} />
              )}
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          (!document || document.status !== 'completed') &&
            styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!document || document.status !== 'completed'}>
        <Text style={styles.submitButtonText}>Next</Text>
      </TouchableOpacity>

      <CommunityModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        type="success"
        title="Document submission received"
        description="Your document has been received and is now being validated. This process would take 10-15 minutes"
        buttonText="Continue"
        onButtonPress={() => {
          setShowModal(false);
          navigation.navigate('SETUPBUSINESS');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundGray,
    paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
    marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
  },
  headerTitle: {
    marginLeft: SIZES.medium,
    fontSize: SIZES.large,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: COLORS.textTitle,
    textAlign: 'center',
    width: '80%',
  },
  content: {
    flex: 1,
    padding: SIZES.medium,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: COLORS.textTitle,
    marginBottom: SIZES.small,
  },
  subtitle: {
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: COLORS.textColor,
    marginBottom: SIZES.large,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    borderRadius: SIZES.medium,
    padding: SIZES.extraLarge,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
  },
  uploadIcon: {
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
  },
  uploadText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: COLORS.textTitle,
    marginBottom: SIZES.small,
  },
  formatText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: COLORS.textColor,
  },
  documentContainer: {
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    backgroundColor: COLORS.backgroundGray,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentDetails: {
    flex: 1,
    marginLeft: SIZES.medium,
  },
  documentName: {
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: COLORS.textTitle,
  },
  documentSize: {
    fontSize: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: COLORS.textColor,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    margin: SIZES.medium,
    padding: SIZES.medium,
    borderRadius: 55,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
  },
});

export default BusinessVerificationScreen;
