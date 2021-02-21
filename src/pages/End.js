import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import ButtonUniv from '../components/ButtonUniv'
const { width, height } = Dimensions.get('window')

export default function End({ route, navigation }) {
    const home = () => {
        navigation.navigate('Home')
    }
    const { level, time, playerName } = route.params

    function convertTime(time) {
        // Hours, minutes and seconds
        let mins = ~~((time % 3600) / 60);
        let secs = ~~time % 60;
        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";
        ret += "" + mins + " minute " + (secs < 10 ? "" : "");
        ret += "" + secs;
        return ret;
    }

    return (
        <ScrollView>
            <ImageBackground source={{ uri: 'https://media0.giphy.com/media/3oEdv1GbekAakxXO8g/giphy.gif?cid=ecf05e47qxfrl8fgy37n3ke6koy01v7xcdcn0k2da12sg09d&rid=giphy.gif' }}
                style={styles.imageBack}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={[styles.container, styles.fixDimension]}>
                        <Text style={styles.standardText}>
                            {`Good Job ${playerName.toUpperCase()}\nYou solved ${level} level\nfor ${convertTime(time)} second`}
                        </Text>
                        <ButtonUniv color={'#333c4a'} title='Retry' action={home} />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageBack: {
        width: width, height: height, alignItems: 'center'
    },
    fixDimension: {
        width: width, height: height
    },
    standardText: {
        fontSize: 20, textAlign: 'center', padding: 10, color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})