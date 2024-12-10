import React, { useState } from 'react';
import { Modal, ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [preloader, setPreloader] = useState(false);

    return (
        <AppContext.Provider value={{
            preloader, setPreloader
        }}>
            {children}
            {preloader && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={preloader}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                        <ActivityIndicator

                        />
                    </View>
                </Modal>
            )}
        </AppContext.Provider>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
