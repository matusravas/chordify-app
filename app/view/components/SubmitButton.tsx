import React from "react"
import { Pressable, View, Text } from "react-native"

interface ButtonProps {
    icon?: JSX.Element
    text: string
    onSubmit: () => void
}

const SubmitButton = ({text, icon, onSubmit}: ButtonProps) => (
    <Pressable style={({ pressed }) => [{
        backgroundColor: pressed ? '#1FC159AA' : '#1FC159CC',
        borderRadius: 10,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }]} onPress={onSubmit}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200 }}>
            {icon? icon: null}
            <Text style={{ color: "#F7F7F7AA", fontWeight: '500', fontSize: 16 }}>{text}</Text>
        </View>
    </Pressable>
)



export default SubmitButton