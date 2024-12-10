import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import { Theme } from '../Components/Theme'

const IntroScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require("../assets/IntroImages/Intro_Illustration.png")}
                        style={styles.illustrationImage}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: Theme.fonts.text800, fontSize: 26 }}>Finding the best</Text>
                        <Text style={{ fontFamily: Theme.fonts.text800, fontSize: 26 }}>currency exchange rate</Text>
                        <Text style={{ fontFamily: Theme.fonts.text600, marginTop: 10 }}>Easily find and exchange currency</Text>
                        <Text style={{ fontFamily: Theme.fonts.text600 }}>as the right exchange rate.</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        navigation.navigate("ExchangeScreen")
                    }}
                >
                    <Text style={{ fontFamily: Theme.fonts.text600, color: 'white' }}>Let's start</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: "space-evenly"
    },
    illustrationImage: {
        height: 300,
        width: 300,
        resizeMode: "contains"
    },
    btn: {
        padding: 10,
        borderWidth: 1,
        alignItems: "center",
        borderRadius: 10,
        borderColor: '#26278D',
        backgroundColor: '#26278D'
    }
})

export default IntroScreen