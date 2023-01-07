import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, Button, Platform, Settings } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const NotificationsProvider = (props) => {


    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {

        registerForPushNotificationsAsync().then(token => {
            props.setExpoPushToken(token)
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            if (notification.request.content.data.type == 'user')
                props.setUserNotification(notification)
            else if (notification.request.content.data.type == 'provider')
                props.setProviderNotification(notification)
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('notificiations provider', 'user fired response receiced listener');
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };

    }, []);



    return null
}

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setUserNotification, setProviderNotification, setExpoPushToken } from '../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setUserNotification,
        setProviderNotification,
        setExpoPushToken
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsProvider)

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        // console.log(token);
    } else {
        token = 'random_token'
        // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
