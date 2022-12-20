import React, { useState } from 'react';
import { Text, Pressable, View, TextInput, Modal, StyleSheet, ToastAndroid } from 'react-native';

const UserComponent = ({ isModalVisible, onSaveUser, onCancel }) => {
    const [userName, setUserName] = useState("");
    const [userLatitude, setUserLatitude] = useState(0);
    const [userLongitude, setUserLongitude] = useState(0);

    saveUser = () => {
        if (userName && userLatitude && userLongitude) {
            let userObject = {
                "name": userName,
                "coordinate": {
                    "latitude": parseFloat(userLatitude),
                    "longitude": parseFloat(userLongitude)
                },
                "chat": []
            }

            onSaveUser(userObject);
            onCancel();
        } else {
            ToastAndroid.showWithGravity("Please enter valid detail", ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            presentationStyle="overFullScreen"
        >
            <View style={styles.modalView}>
                <View style={styles.modalViewContainer}>
                    <Text style={styles.modalHeader}>Enter new users details: </Text>
                    <View style={styles.modalInputView}>
                        <Text>Name: </Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter name..."
                            onChangeText={setUserName}
                            value={userName}
                        />
                    </View>
                    <View style={styles.modalInputView}>
                        <Text>Latitude: </Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter Latitude..."
                            onChangeText={setUserLatitude}
                            value={userLatitude}
                        />
                    </View>
                    <View style={styles.modalInputView}>
                        <Text>Longitude: </Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter Longitude..."
                            onChangeText={setUserLongitude}
                            value={userLongitude}
                        />
                    </View>

                    <View style={styles.modalButtonView}>
                        <Pressable style={styles.modalLeftButton} onPress={saveUser}>
                            <Text style={styles.modalLeftButtonText}>Save</Text>
                        </Pressable>

                        <Pressable style={styles.modalRightButton} onPress={onCancel}>
                            <Text style={styles.modalRightButtonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalViewContainer: {
        width: "80%",
        margin: 16,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalHeader: {
        fontSize: 18
    },
    modalInputView: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%"
    },
    modalInput: {
        flex: 1
    },
    modalButtonView: {
        flexDirection: "row",
        marginTop: 16
    },
    modalLeftButton: {
        padding: 16
    },
    modalRightButton: {
        marginLeft: 12,
        padding: 16
    },
    modalLeftButtonText: {
        fontSize: 16,
        color: "#9e8fcb",
        fontWeight: 'bold'
    },
    modalRightButtonText: {
        fontSize: 16,
        color: "#d3d3d3",
        fontWeight: 'bold'
    }
});

export default UserComponent;