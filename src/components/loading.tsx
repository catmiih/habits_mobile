import { Text, StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";

export function Loading() {

    return (
        <View style={styles.container}>
            <ActivityIndicator color="#7C3AED"></ActivityIndicator>
            <Text style={styles.Text}> Carregando conteúdos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09090A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        color: '#7C3AED',
        fontSize: 20,
        margin: 50,
    }
});
