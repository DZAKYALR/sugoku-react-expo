import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonUniv from '../components/ButtonUniv'

const difficultyLevels = [{
    id: 1,
    level: 'easy',
    time: 2000,
    color: '#333c4a',
    title: 'Easy',
},
{
    id: 2,
    level: 'medium',
    time: 1750,
    color: '#3e3939',
    title: 'Medium',
},
{
    id: 3,
    level: 'hard',
    time: 1500,
    color: '#ff7517',
    title: 'Hard',
},
]

const { width, height } = Dimensions.get('window')
export default function Home({ navigation }) {
    const [playerName, setName] = useState('')
    const play = ({ level, time }) => {
        navigation.navigate('Board', { level, time, playerName })
    }

    useEffect(() => {
        setName('')
    }, [])

    return (
        <SafeAreaView style={styles.styleContainer}>
            <View style={{ width: width }}>
                <Image source={{ uri: 'https://i.imgur.com/C5mcjaG.png' }}
                    style={styles.imageHome} />
                <View style={styles.container}>
                    <Text style={styles.nameInput}>Input Your Name</Text>
                    <TextInput style={styles.input} onChangeText={(inputValue) => setName(inputValue)} value={playerName} />
                </View>
                {playerName.trim() !== '' && (
                    <View style={[styles.container, styles.diffContainer]}>
                        <View style={styles.buttonView} >
                            {difficultyLevels.map(level => {
                                return (
                                    <ButtonUniv params={{ level: level.level, time: level.time }} key={level.id} color={level.color} title={level.title} action={play} />
                                )
                            })
                            }
                        </View>
                    </View>)}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderBottomWidth: 1,
        textAlign: 'center',
        borderColor: 'white',
        width: 150,
        height: 35,
        color: 'white',
        backgroundColor: 'black'
    },
    styleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black"
    },
    imageHome: {
        width: width,
        height: 300
    },
    nameInput: {
        color: 'white'
    },
    difficulty: {
        fontWeight: '600',
        fontSize: 21,
        marginBottom: 10,
        color: 'white'
    },
    diffContainer: {
        marginTop: 25
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
