import React, { useEffect, useState, useRef } from 'react'
import { View, FlatList, Text, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import SEND from '../assets/send.png'
import { getMessages, sendMessage } from '../redux/state/chatAction';

const { height, width } = Dimensions.get('window');

export default function Chat() {
    const flatlistRef = useRef();
    const dispatch = useDispatch();

    const { loading: msgLoading, sendLoading: loading, messages } = useSelector(state => state.chat);
    
    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(getMessages());
    }, [])

    const submitHandler = () => {
        dispatch(sendMessage({ content: message, successCallback: () => setMessage("") }));
    }

    const renderItem = ({ item }) => {
        return (
            <Text
                key={item._id}
                style={{ fontSize: 16, marginBottom: 10 }}
            >
                {"=> " + item.content}
            </Text>
        );
    };

    return (
        <KeyboardAvoidingView>
            {/* <ScrollView> */}
                <View style={{ height, width }}>
                    <Text style={{ fontSize: 22, textAlign: 'center', backgroundColor: "gray", color: "white", height: 60, paddingTop: 13 }}>
                        Chat App
                    </Text>

                    <View style={{ height: height-130, position: 'absolute', top: 60, width, padding: 20 }}>
                        {
                            msgLoading ?
                                <ActivityIndicator color="black" />
                            :
                                <FlatList
                                    ref={flatlistRef}
                                    data={messages || []}
                                    renderItem={renderItem}
                                    onLayout={() => flatlistRef.current.scrollToEnd({animated: true})}
                                    onContentSizeChange={() => flatlistRef.current.scrollToEnd({animated: true})}
                                />
                        }
                    </View>

                    <View style={{ position: 'absolute', bottom: 5, width: width-20, marginLeft: 10 }}>
                        <View style={{ borderWidth: 1}} >
                            <TextInput
                                value={message}
                                style={{ width: '85%' }}
                                placeholder="Enter message..."
                                onChangeText={txt=>setMessage(txt)}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={submitHandler}
                            style={{ position: 'absolute', right: 15, top: 13 }}
                        >
                            {
                                loading ?
                                    <ActivityIndicator color="black" />
                                :    
                                    <Image
                                        source={SEND}
                                        style={{ height: 25, width: 25 }}
                                    />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </ScrollView> */}
        </KeyboardAvoidingView>
    )
}
