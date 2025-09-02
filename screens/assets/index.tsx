import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Index: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Assets Screen</Text>
        </View>
    );
};
export default Index;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

