import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBoard, changeBoard, validateBoard, solveBoard, unmount } from '../store/actions/fetchBoard'
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Dimensions, ImageBackground, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonUniv from '../components/ButtonUniv'
import RNShake from 'react-native-shake';
const { width, height } = Dimensions.get('window')

export default function Board({ route, navigation }) {
    const { board, originBoard, isCorrect, isLoading, isError } = useSelector(state => state.boardReducer)
    const { level, playerName, time } = route.params
    const [timer, setTimer] = useState(time)
    const [initTimer, setInitTimer] = useState(time)
    const dispatch = useDispatch()
    const validate = () => { dispatch(validateBoard(board)) }
    const solve = () => { dispatch(solveBoard(originBoard)) }
    const inputChange = (input, row, col) => {
        /^\d+$/.test(input.toString()) ? input = +input : input = 0
        const inputBoard = JSON.parse(JSON.stringify(board))
        inputBoard[row][col] = +input
        dispatch(changeBoard(inputBoard))
    }

    const getTimer = (seconds) => {
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const hours = seconds / 3600
        const minutes = (seconds % 3600) / 60

        return [hours, minutes, seconds % 60].map(format).join(':')
    }

    useEffect(() => {
        dispatch(setBoard(level))
        return () => {
            dispatch(unmount())
        }
    }, [])

    useEffect(() => {
        const timeLimit = setInterval(() => {
            if (timer > 0) setTimer(timer - 1) 
            if (timer === 0) clearInterval(timeLimit) 
        }, 1200)
        return () => clearInterval(timeLimit)
    }) //ketika penambahan [] dianggap listen ke suatu depend

    RNShake.addEventListener('ShakeEvent', () => {
        dispatch(solveBoard(originBoard))
        Alert.alert('itworks','')
      })

    useEffect(() => {
        if (isCorrect === 'solved') {
            const time = initTimer - timer
            navigation.navigate('End', { level, time, playerName  })
        }
    }, [isCorrect])
    const createTwoButtonAlert = () =>
        Alert.alert(
            `Hi ${playerName}`,
            "Give the solution ?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => solve() }
            ],
            { cancelable: false }
        );
    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: '#191F26' }]}>
                <Image source={{ uri: 'https://i.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif' }}
                    style={styles.isLoading} />
            </View>
        )
    }

    // if (isCorrect === '') {}
    // if (isCorrect === 'solved') {
    //     return(
    //     styles.input.backgroundColor = 'green' )
    // }
    // if (isCorrect === 'unsolved') {
    //     return (
    //     styles.input.backgroundColor = 'red' )
    // }
    if (isError) {
        return (
            <View style={styles.container}>
                <Text style={styles.showError}>Error </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <ScrollView >
                <ImageBackground source={{ uri: 'https://evolvedesign.ie/wp-content/uploads/2017/06/idea-generation.gif' }} style={styles.headerBoard}>
                    <Text style={styles.standardText}>Time left : {getTimer(timer)}</Text>
                </ImageBackground>

                <View style={[styles.container, styles.containerBoard]}>
                    <View style={styles.borderBoard}>
                        <Text style={styles.level}>{level.toUpperCase()}</Text>
                        {
                            board.map((rows, rowsId) => {
                                const row = rows.map((col, colId) => (
                                    <TextInput
                                        editable={originBoard[rowsId][colId] > 0 ? false : true}
                                        keyboardType="number-pad"
                                        pattern="\d*"
                                        style={
                                            [
                                                styles.input,
                                                {
                                                    width: (width / 9) - 5,
                                                    height: (width / 9) - 5,
                                                    borderRightWidth: colId % 3 === 2 && colId !== 8 ? 3 : 1,
                                                    borderLeftWidth: colId % 3 === 3 && colId !== 8 ? 3 : 1,
                                                    borderTopWidth: colId % 3 === 3 && colId === 8 ? 3 : 1,
                                                    borderBottomWidth: rowsId % 3 === 2 && rowsId !== 9 ? 3 : 1
                                                },
                                                originBoard[rowsId][colId] !== 0 && styles.boxOrigin,
                                            ]
                                        }
                                        maxLength={1}
                                        key={colId}
                                        onChangeText={(e) => e.length < 2 ? inputChange(e, rowsId, colId) : ''}
                                        value={col === 0 ? '' : col.toString()}
                                        underlineColorAndroid="transparent"
                                    />
                                ))
                                return (
                                    <View style={{ flexDirection: 'row' }} key={rowsId}>{row}</View>
                                )
                            })
                        }
                        <Text style={styles.needHelp} onPress={createTwoButtonAlert}>need help ?</Text>
                    </View>
                </View>
                <ImageBackground source={{ uri: 'https://media0.giphy.com/media/lSzQjkthGS1gc/giphy.gif?cid=ecf05e47z950rwsplcatskvft4dcn955wfuwl9krhmbsjg26&rid=giphy.gif' }}
                    style={styles.imageHeader}>
                    <ButtonUniv
                        color={'#3e3939'}
                        title='Check'
                        action={validate}
                    />
                    {/* {
                        isCorrect === '' ? <></> : Alert.alert((isCorrect === 'unsolved' || isCorrect === 'broken' ? 'not solved yet' : 'solved, nice'), '')
                    } */}
                    {
                        isCorrect === '' ? <></> : <Text style={styles.status}>{isCorrect === 'solved' ? "Solved" : "Not Solved Yet"}</Text>
                    }
                    
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    )
}

let styles = StyleSheet.create({
    status: {
        fontWeight: "700",
        fontSize: 20,
        marginVertical: 10,
        color: 'white'
    },
    input: {
        backgroundColor: '#525252',
        textAlign: 'center',
        borderColor: 'white',
        color: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10,
    },
    searchIcon: {
        padding: 10,
    },
    imageStyle: {
        padding: 10,
        alignItems: 'center',
    },
    boxOrigin: {
        backgroundColor: '#4444',
        textAlign: 'center',
        borderColor: 'white',
        color: '#4444',
    },
    showError: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    isLoading: {
        width: width,
        height: 400
    },
    headerBoard: {
        width: width,
        height: 190
    },
    standardText: {
        color: 'white', textAlign: 'right'
    },
    borderBoard: {
        marginBottom: 10, padding: 6, borderRadius: 10, backgroundColor: 'white'
    },
    containerBoard: {
        width: width, backgroundColor: 'black'
    },
    needHelp: {
        color: 'black',
        textAlign: 'right', alignSelf: 'stretch',
    },
    imageHeader: {
        width: 400,
        height: 200,
        alignItems: 'center'
    },
    level: {
        color: 'black',
        textAlign: 'center',
        alignSelf: 'stretch',
    }
});
//         /^\d+$/.test(input.toString()) ? input = +input : input = ''
