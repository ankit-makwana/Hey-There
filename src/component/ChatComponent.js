import React, { useState, useEffect, useRef } from 'react';
import { Text, Pressable, View, ScrollView, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

var predefinedMessages = [
    "Hey there, how are you?",
    "Who is this?",
    "Thank you",
    "I'm fine",
    "I'm busy",
    "Congratulations",
    "What are you doing?",
    "very very long sentence testing with received message"
]

const ChatComponent = ({ userList, onMessageSend, updateUserWithNewMessage, onBackPressed }) => {
    const userName = userList["name"];
    const [text, onChangeText] = React.useState("");
    const [chatList, setChatList] = useState(userList.chat);
    const scrollViewRef = useRef();

    sendMessage = () => {
        let chatObject = {
            "message": text,
            "isSent": true,
            "sender": "self",
            "timestamp": Date.now()
        }
        setChatList(chatList => [...chatList, chatObject]);
        onMessageSend(chatObject);
        onChangeText("");
    };

    receiveMessage = () => {
        let receivedMsg = predefinedMessages[Math.floor(Math.random() * predefinedMessages.length)];
        let chatObject = {
            "message": receivedMsg,
            "isSent": false,
            "sender": userList["name"],
            "timestamp": Date.now()
        }
        setChatList(chatList => [...chatList, chatObject]);
        updateUserWithNewMessage(chatObject);
    }

    const Header = () => (
        <View style={styles.headerView}>
            <Pressable style={styles.leftHeaderButton} onPress={onBackPressed}>
                <Icon name="arrow-back" size={30} color="grey" />
            </Pressable>
            <Text style={styles.headerTitle}>{userName}</Text>
            <Pressable style={styles.rightHeaderButton} onPress={receiveMessage}>
                <Icon name="chat" size={30} color="grey" />
            </Pressable>
        </View>
    )

    return (
        <View style={styles.mainView}>

            <Header />

            <ScrollView
                ref={scrollViewRef}
                style={styles.chatScrollView}
                onContentSizeChange={() => {
                    scrollViewRef.current.scrollToEnd({ animated: true })
                }}>

                {chatList.map((item, index) => (
                    <View key={index} style={item.isSent ? styles.sentChatItem : styles.receivedChatItem}>
                        <Text style={styles.chatItemText}>{item.message}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.chatInputView}>
                <TextInput
                    style={styles.chatInput}
                    placeholder="Type a Message..."
                    onChangeText={onChangeText}
                    onSubmitEditing={sendMessage}
                    value={text}
                />
                <Pressable style={styles.chatSendButton} onPress={sendMessage}>
                    <Icon name="send" size={30} color="grey" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    headerView: {
        height: 50,
        backgroundColor: "white",
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftHeaderButton: {
        marginLeft: 12
    },
    headerTitle: {
        fontWeight: 'bold',
        marginLeft: 12
    },
    rightHeaderButton: {
        marginRight: 12
    },
    chatScrollView: {
        marginVertical: 12
    },
    sentChatItem: {
        marginVertical: 4,
        padding: 12,
        borderRadius: 10,
        marginLeft: 48,
        marginRight: 8,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#cbc3e3"
    },
    receivedChatItem: {
        marginVertical: 4,
        padding: 12,
        borderRadius: 10,
        marginLeft: 8,
        marginRight: 48,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "#d3d3d3"
    },
    chatItemText: {
        color: 'black'
    },
    chatInputView: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 12,
        marginHorizontal: 8
    },
    chatInput: {
        marginLeft: 16, 
        flex: 1
    },
    chatSendButton: {
        marginHorizontal: 12
    }
});

export default ChatComponent;