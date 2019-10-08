import React, { useState } from 'react';
import { View, Text, AsyncStorage, Alert, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState(new Date());

    //const [showDatePicker, setShowDatePicker] = useState(true);

    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        /*
        console.log(`data------>${date}`);
        console.log(`>>>>>> ${typeof date}`);

        const novaData = moment(date, 'DD-MM-YYYY H:mm:ss:a');

        console.log(`>>>>>> ${typeof novaData}`);
        console.log(`>>.>> ${novaData.toDate()}`);
        */



        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        });

        Alert.alert('Solicitação de reserva enviada');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }




    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>

            <DatePicker
                style={{
                    width: 300,
                    marginBottom: 10
                }}
                date={date}
                mode="datetime"
                placeholder="select date"
                format="DD-MM-YYYY H:mm:ss:a"
                minDate="05-01-2018 00:00:00:pm"
                maxDate="06-12-2019 00:00:00:pm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        display: "none",
                        marginLeft: 0
                    },
                    dateInput: {
                        marginTop: 4,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        paddingHorizontal: 20,
                        fontSize: 16,
                        color: '#444',
                        height: 44,
                        marginBottom: 10,
                        borderRadius: 2,
                    }
                }}
                onDateChange={(date) => {

                    setDate(moment(date, 'DD-MM-YYYY H:mm:ss:a').toDate());
                }
                }
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar </Text>
            </TouchableOpacity>

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        margin: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
})