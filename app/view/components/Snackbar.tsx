import { Box } from "@react-native-material/core"
import React, { useState } from "react"
import { Text, View } from "react-native"

interface CustomSnackbarProps {
    duration?: number
    autoClose?: boolean
    closable?: boolean,
    message: string
    buttonText?: string
}


const CustomSnackbar = ({duration, message, autoClose=true, buttonText, closable=false}: CustomSnackbarProps) => {
    const [visible, setVisible] = useState(true)
    if(autoClose) {
        setTimeout(() => {
            setVisible(false)
        }, duration? duration: 3000)
    }

    return (
        <Box >
            {visible 
                // ? <Snackbar action={closable?<Button variant="text" title={buttonText? buttonText: "Dismiss"} color="#1FC159BB" compact onPress={() => setVisible(false)} />: undefined}
                ? 
                <View style={{borderRadius: 5, padding: 10, justifyContent: 'center', height: 45, alignSelf: 'stretch', margin: 5,  position: "absolute", backgroundColor: '#F7F7F7', start: 16, end: 16, bottom: 8 }}>
                    <Text style={{color: '#0d0f12'}}>
                        {message}
                    </Text>
                </View>
                : null
            }
        </Box>
    )
}

export default CustomSnackbar