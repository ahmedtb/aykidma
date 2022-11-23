import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

import { loginProcedure } from '../../../redux/AuthFunctions'

function LoginModal(props) {
    const [phoneNumber, setPhoneNumber] = useState(props.route.params?.phoneNumber ?? null)
    const [password, setPassword] = useState(props.route.params?.password ?? null)

    function loginButton(phoneNumber, password) {
        loginProcedure(phoneNumber, password)
    }

    return (

        <View>
            <Text style={{
                textAlign: 'center',
                color: 'black',
                padding: 10,
                fontSize: 20,
                fontWeight: 'bold',
            }}>
                يرجى تسجيل الدخول
            </Text>



            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <TextInput
                    style={{ flex: 1, textAlign: 'center', borderWidth: 1, padding: 5, borderRadius: 10, fontSize: 20 }}
                    value={phoneNumber}
                    keyboardType='phone-pad'
                    autoComplete="username"
                    onChangeText={setPhoneNumber}
                    placeholder='رقم الهاتف'
                />
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <TextInput
                    style={{ flex: 1, textAlign: 'center', borderWidth: 1, padding: 5, borderRadius: 10, fontSize: 20 }}
                    value={password}
                    autoComplete="password"
                    onChangeText={setPassword}
                    placeholder='كلمة المرور'

                />
            </View>



            <TouchableOpacity
                style={{ alignSelf: 'center', marginVertical: 5, backgroundColor: 'red', height: 35, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => {
                    console.log('loginscreen')
                    loginButton(phoneNumber, password)
                }}
            >
                <Text style={{ color: 'white', fontSize: 20 }}>
                    دخول
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={{ alignSelf: 'center', marginVertical: 5, backgroundColor: 'red', height: 35, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => {
                    props.navigation.navigate(
                        'enrollment',
                    )
                }
                }
            >
                <Text style={{ color: 'white', fontSize: 20 }}>
                    تسجيل حساب
                </Text>
            </TouchableOpacity>


        </View>

    )
}


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken } from '../../../redux/StateActions';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setToken
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#b2a9a7",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});