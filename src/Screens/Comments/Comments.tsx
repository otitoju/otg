import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image,
    StatusBar,
} from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import ArrowBack from '../../assets/images/Others/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../Components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateComment, GetComments } from '../../Api/api';
import { useRoute } from "@react-navigation/native";
import LoadingDots from '../../Components/LoadingDots';
import { calculateTimeAgo } from '../../constants/utils';


const CommentScreen = () => {
    const [comments, setComments] = useState<any>([]);
    const [newComment, setNewComment] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation: any = useNavigation();
    const route = useRoute<any>();

    const postId: any = route?.params?.postId;


    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await GetComments(postId);
            if (response.comments) {
                setLoading(false);
                setComments(response.comments);
            };

        } catch (error) {
            setLoading(false);
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleSendComment = async () => {
        const loggedInUser: any = await AsyncStorage.getItem('user');
        let userId = JSON.parse(loggedInUser).user.id;

        if (newComment.trim() === '') return;
        setIsPosting(true);
        const payload = {
            authorId: userId,
            content: newComment
        };

        try {
            const info = await CreateComment(postId, payload);
            const response = await GetComments(postId);
            if (info.message === "Comment created successfully") {
                console.log(info);
                setIsPosting(false);
                setComments(response.comments);
                setNewComment('')
            }
        } catch (error) {
            setIsPosting(false);
        }
    };

    if(loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <LoadingDots />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
                    <ArrowBack width={25} height={25} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Comments ({comments?.length})</Text>
            </View>

            {/* Body: Previous Comments */}
            <FlatList
                data={comments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.commentItem}>
                        {/* <Image
                            source={{ uri: item.image }}
                            style={styles.profileImage}
                        /> */}
                        <View style={styles.commentContent}>
                            <Text style={styles.userName}>{item?.author?.firstName} {item?.author?.lastName}</Text>
                            <Text style={styles.commentText}>{item?.content}</Text>
                        </View>
                        <Text style={styles.commentDate}>{calculateTimeAgo(item?.createdAt)}</Text>
                    </View>
                )}

                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No comments yet. Be the first to comment!</Text>
                    </View>
                }
                style={styles.commentList}
            />

            {/* Footer: Input and Send Button */}
            <View style={styles.footer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write a comment..."
                    placeholderTextColor={COLORS.textPlaceholder}
                    value={newComment}
                    onChangeText={setNewComment}
                />

                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSendComment}
                    disabled={isPosting}
                >
                    <Text style={styles.sendButtonText}>{isPosting ? 'Sending...' : 'Send'}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    },
    //   header: {
    //     backgroundColor: '#6200ee',
    //     padding: 16,
    //     alignItems: 'center',
    //   },
    headerTitle: {
        color: COLORS.textHeader,
        fontSize: 18,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    commentList: {
        flex: 1,
        padding: 16,
    },
    //   commentItem: {
    //     backgroundColor: '#fff',
    //     padding: 12,
    //     marginVertical: 8,
    //     borderRadius: 8,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 3,
    //     elevation: 2,
    //   },
    //   commentText: {
    //     fontSize: 16,
    //     color: '#333',
    //   },
    //   footer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     padding: 8,
    //     borderTopWidth: 1,
    //     borderTopColor: '#ddd',
    //     backgroundColor: '#fff',
    //   },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        fontSize: SIZES.small,
        color: '#333',
        marginRight: 8,
        height: 40,
        paddingHorizontal: 15,
        backgroundColor: '#f1f1f1',
    },
    sendButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonText: {
        color: COLORS.primary,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD
    },




    header: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        // justifyContent: 'space-between',
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
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: '#333',
        marginBottom: 4,
    },
    commentText: {
        color: '#333',
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        fontSize: SIZES.small
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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    emptyText: {
        fontSize: SIZES.font, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, color: COLORS.textTitle
    },
    commentDate: {
        fontSize: SIZES.small, fontFamily: FONTS.RADIO_CANADA_REGULAR, color: COLORS.textColor
    }
});

export default CommentScreen;
