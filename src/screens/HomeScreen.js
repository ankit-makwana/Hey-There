import React from 'react'
import { View, PermissionsAndroid, LayoutAnimation } from 'react-native';
import initUserList from '../config/initUserList.json';
import MapComponent from '../component/MapComponent';
import ChatComponent from '../component/ChatComponent';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMapView: true // to change between Map and Chat screen
        }

        this.allUsers = initUserList;
        this.selectedUserIndex = {};
        this.filterValue = 1;
    }

    componentDidMount() {
        this.requestLocationPermission();
    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message:
                        "HeyThere App needs access to your location ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
            } else {
                console.log("Location permission denied, app will not work properly");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>

                {this.state.isMapView &&
                    <MapComponent
                        initUserList={initUserList}
                        initFilterValue={this.filterValue}
                        onFilterChange={(value) => { this.filterValue = value; }}
                        onUserPress={(data) => {
                            this.selectedUserIndex = data;
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            this.setState({
                                isMapView: false
                            })
                        }}
                    />
                }

                {!this.state.isMapView &&
                    <ChatComponent
                        userList={this.allUsers[this.selectedUserIndex]}
                        onMessageSend={(userMessage) => {
                            this.allUsers[this.selectedUserIndex]["chat"].push(userMessage);
                        }}
                        updateUserWithNewMessage={(receivedMessage) => {
                            this.allUsers[this.selectedUserIndex]["chat"].push(receivedMessage);
                        }}
                        onBackPressed={() => {
                            this.setState({
                                isMapView: true
                            });
                        }}
                    />
                }

            </View>
        );
    }
}