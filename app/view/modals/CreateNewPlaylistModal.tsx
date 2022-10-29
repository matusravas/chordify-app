import React, { useState } from "react"
import { TextInput, View } from "react-native"
import SubmitButton from "../components/SubmitButton"



interface CreateNewPlaylistModalProps {
    onSubmit: (playlistName: string) => void,
}

const CreateNewPlaylistModal = ({ onSubmit }: CreateNewPlaylistModalProps) => {
    const [value, setValue] = useState('')
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput value={value} textAlign='center' onChangeText={(text: string) => setValue(text)} selectionColor='#1FC159' placeholderTextColor='#F7F7F750' placeholder="Enter playlist name..." style={{ fontSize: 18, color: '#F7F7F750' }} />
            <SubmitButton onSubmit={() => onSubmit(value)} text={'Submit'} />
        </View>
    )
}

export default CreateNewPlaylistModal