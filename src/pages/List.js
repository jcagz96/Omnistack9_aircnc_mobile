import React, { useState, useEffect } from 'react';
import { Text, View, Image, AsyncStorage, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';
import { ScrollView } from 'react-native-gesture-handler';

export default function List({ navigation }) {

    const [techs, setTechs] = useState([]);

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>



            <ScrollView>
                {techs.map(tech => (<SpotList key={tech} tech={tech} />))}
            </ScrollView>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },

});