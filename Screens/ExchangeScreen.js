import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../Components/Theme'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput } from 'react-native'
import DropDown, { CURRENCIES } from './DropDown'

export default function ExchangeScreen() {

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [currencyImage, setCurrencyImage] = useState(require("../assets/IntroImages/SGD1.png"));
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [exhangeRate, setExchangeRate] = useState('');

    const handleCurrencyChange = (currency, isSource) => {
        if (isSource) {
            setFromCurrency(currency);
        } else {
            setToCurrency(currency);
        }
    };

    const fetchExchangeRate = async () => {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await response.json();
            const rate = data.rates[toCurrency];
            const converted = parseFloat(amount) * rate;
            setConvertedAmount(converted.toFixed(2));
            setExchangeRate(rate.toFixed(4));
        } catch (error) {
            console.log("An error occurred while fetching the api: ", error);
            setExchangeRate('N/A');
        }
    }

    useEffect(() => {
        if (amount) {
            fetchExchangeRate();
        }
    }, [fromCurrency, toCurrency, amount]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={['#EAEAFE', 'white', '#DDF6F3']}
                style={styles.gradientBackground}
            >
                <View style={styles.container}>
                    <View style={{ alignItems: "center", marginTop: 40 }}>
                        <Text style={{ fontFamily: Theme.fonts.text800, color: "#26278D", fontSize: 23 }}>Currency Converter</Text>
                        <Text style={{ fontFamily: Theme.fonts.text600, color: '#666' }}>Check live rates, set rate alerts, recieve</Text>
                        <Text style={{ fontFamily: Theme.fonts.text600, color: "#666" }}>notification and more.</Text>
                    </View>
                    <View style={styles.exchangeContainer}>
                        <View style={{ top: 50 }}>
                            <Text style={{ fontFamily: Theme.fonts.text500, color: '#666', bottom: 50, paddingHorizontal: 15 }}>Amount</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, bottom: 30, alignItems: "center" }}>
                                <DropDown
                                    onSelectCurrency={(currency) => setFromCurrency(currency)}
                                    selectedCurrencyCode={fromCurrency}
                                    isSource={true}
                                />
                                <View style={{ padding: 7, paddingLeft: 50, backgroundColor: '#D3D3D3', borderRadius: 10 }}>
                                    <TextInput
                                        placeholder='1000.00'
                                        keyboardType="numeric"
                                        style={{ width: 90 }}
                                        value={amount}
                                        onChangeText={setAmount}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <View style={{ borderTopWidth: 0.4, width: 347, alignSelf: "center", borderColor: "#666", top: 67 }}></View>
                            <View style={{ alignItems: "center", right: 0, top: 45 }}>
                                <Image
                                    style={{ height: 40, width: 40, resizeMode: "contain" }}
                                    source={require("../assets/IntroImages/ExchangeLogo.png")}
                                />
                            </View>
                        </View>
                        <View style={{ top: 100 }}>
                            <Text style={{ fontFamily: Theme.fonts.text500, color: '#666', bottom: 50, paddingHorizontal: 15 }}>Converted Amount</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, bottom: 30, alignItems: "center" }}>
                                <DropDown
                                    onSelectCurrency={(currency) => setToCurrency(currency)}
                                    selectedCurrencyCode={toCurrency}
                                    isSource={false}
                                />
                                <View style={{ padding: 7, paddingLeft: 50, backgroundColor: '#D3D3D3', borderRadius: 10 }}>
                                    <TextInput
                                        placeholder='1000.00'
                                        style={{ width: 90 }}
                                        keyboardType="numeric"
                                        value={convertedAmount}
                                        editable={false}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.rateCardContainer}>
                            <View style={styles.rateCard}>
                                <Text style={styles.rateTitle}>Indicative Exchange Rate</Text>
                                <View style={styles.rateContent}>
                                    <Text style={styles.rateValue}>
                                        1 {fromCurrency} = {exhangeRate} {toCurrency}
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    gradientBackground: {
        flex: 1
    },
    exchangeContainer: {
        marginTop: 30,
        justifyContent: "center",
        height: 300,
        width: 350,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderColor: '#E0E0E0',
    },
    rateCardContainer: {
        top: 150,
        alignSelf: 'center',
        alignItems: 'center',
    },
    rateCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rateTitle: {
        fontFamily: Theme.fonts.text800,
        fontSize: 18,
        color: '#26278D',
        marginBottom: 15,
    },
    rateContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    rateValue: {
        fontFamily: Theme.fonts.text600,
        fontSize: 16,
        color: '#333',
    },
    currencyFlag: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
})