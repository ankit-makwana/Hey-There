import React, { useState } from 'react';
import { Text, Pressable, View, Image, StyleSheet, LayoutAnimation } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import haversine from 'haversine';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import UserComponent from './UserComponent';

// initial dummy value for location
var myLocation = {
    "latitude": 37.421997459633374,
    "longitude": -122.08399968221784
}

const MapComponent = ({ initUserList, onUserPress, initFilterValue, onFilterChange }) => {
    // list of user who are in radius of 1km 
    const [userList, setUserList] = useState(initUserList);
    // whether slider filter of km is active or not
    const [isFilterView, setIsFilterView] = useState(false);
    // to store filter value of km
    const [filterValue, setfilterValue] = useState(initFilterValue);
    // to set region in map 
    const [locRegion, setLocRegion] = useState(null);
    // user modal is visible or not
    const [isModalVisible, setIsModalVisible] = useState(false);

    var filterKM = initFilterValue;

    // filter users based on distance using haversine formula
    filterUserList = () => {
        let allUserList = initUserList;
        let distanceBetweenTwo = 0;

        let updatedUserList = allUserList.filter((item) => {
            distanceBetweenTwo = haversine(myLocation, item.coordinate);
            // console.log("haversine: " + distanceBetweenTwo);
            return distanceBetweenTwo <= filterKM;
        })

        setUserList(updatedUserList);
    }

    // set initial region to show on map using location
    setInitialRegionBasedOnLocation = (data) => {
        var callOnce = false;
        return () => {
            if (!callOnce) {
                callOnce = true;
                data["latitudeDelta"] = 0.10;
                data["longitudeDelta"] = 0.012;
                setLocRegion(data);
            }
        };
    };

    getIndex = (id) => {
        for (let i = 0; i < initUserList.length; i++) {
            if (initUserList[i].id == id) {
                return i;
            }
        }
    }

    const Header = () => (
        <View style={styles.headerView}>
            <Text style={styles.headerTitle}>Map Screen</Text>
            <Pressable
                style={styles.headerButton}
                onPress={() => {
                    setIsModalVisible(true);
                }}>
                <Icon name="person-add" size={30} color="grey" />
            </Pressable>
            <Pressable
                style={styles.headerButton}
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setIsFilterView(!isFilterView);
                }}>
                <Icon name="filter-alt" size={30} color="grey" />
            </Pressable>
        </View>
    )

    return (
        <View style={styles.mainView}>

            <Header />

            {isFilterView &&
                <View style={styles.filterView}>
                    <Slider
                        style={styles.filterSlider}
                        minimumValue={0}
                        maximumValue={10}
                        step={0.5}
                        value={filterValue}
                        onValueChange={(value) => setfilterValue(value)}
                        onSlidingComplete={(value) => {
                            filterKM = value;
                            filterUserList();
                            onFilterChange(value);
                        }}
                        minimumTrackTintColor="#cbc3e3"
                        maximumTrackTintColor="#d3d3d3"
                        thumbTintColor="#9e8fcb"
                    />
                    <Text style={styles.filterText}>{filterValue} km</Text>
                </View>
            }

            <MapView
                style={styles.mapView}
                region={locRegion}
                userLocationPriority='passive'
                showsUserLocation={true}
                onUserLocationChange={(e) => {
                    let aData = e.nativeEvent;
                    // console.log(aData);
                    let aLoc = {
                        "latitude": aData.coordinate.latitude,
                        "longitude": aData.coordinate.longitude,
                    }
                    myLocation = aLoc;
                    setInitialRegionBasedOnLocation(aLoc)();
                    filterUserList();
                }}
            >
                {userList.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.name}
                        image={require("../image/avatar.png")}
                        onPress={(e) => {
                            let aIndex = getIndex(marker.id);
                            onUserPress(aIndex)
                        }}
                    />
                ))}
            </MapView>

            <UserComponent
                isModalVisible={isModalVisible}
                onSaveUser={(userObject) => {
                    initUserList.push(userObject);
                    filterUserList();
                }}
                onCancel={() => {
                    setIsModalVisible(false);
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    headerView: {
        height: 50,
        backgroundColor: "white",
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerTitle: {
        flex: 1,
        fontWeight: 'bold',
        marginLeft: 12
    },
    headerButton: {
        marginRight: 12
    },
    filterView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterSlider: {
        flex: 1,
        height: 40
    },
    filterText: {
        marginRight: 12
    },
    mapView: {
        flex: 1
    }

});

export default MapComponent;