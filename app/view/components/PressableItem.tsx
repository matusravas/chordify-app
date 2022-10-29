import React, {memo} from "react";
import { Pressable, View, Text } from "react-native";
import { Icons } from "../../icons/icons";
import Icon from "../../icons/icons";
import { StyleSheet } from "react-native";


interface PressableItemProps {
    handler: () => void,
    icon?: boolean,
    text: string,
    color?: {color?: string, colorPressed?: string},
    textStyle?: {fontSize?: number, fontSizePressed?: number},
    // iconStyle?: {iconType: typeof Icon, iconName: string, color?: string, colorPressed?: string},
    iconStyle?: {iconType: any, iconName: string, size?: number, sizePressed?: number}
}


const PressableItem = ({icon=false, ...props}: PressableItemProps) => {
    const textStyle = {...styles.text, ...props.textStyle, ...props.color}
    const iconStyle = {...styles.icon, ...props.iconStyle, ...props.color}
    return (
    <Pressable onPress={props.handler} children={({ pressed }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {icon && <Icon size={pressed ? iconStyle.sizePressed : iconStyle.size} 
            type={iconStyle.iconType} name={iconStyle.iconName} 
            color={pressed ? iconStyle.colorPressed : iconStyle.color} 
            />}
            <Text style={{...textStyle, fontSize: pressed? textStyle.fontSizePressed: textStyle.fontSize, color: pressed? textStyle.colorPressed: textStyle.color}}>
                {props.text}
            </Text>
        </View>
    )} />
    )
}

const styles = StyleSheet.create({
    // color: {
    //     color: '#F7F7F7AA', 
    //     colorPressed: '#F7F7F750'
    // },
    text: {
        fontSize: 18,
        fontSizePressed: 17,
        fontWeight: '600',
        margin: 15,
        color: '#F7F7F7AA', 
        colorPressed: '#F7F7F750'
    },
    icon: {
        size: 20,
        sizePressed: 19,
        iconType: Icons.MaterialCommunityIcons, 
        iconName: 'music-outline',
        color: '#F7F7F7AA', 
        colorPressed: '#F7F7F750'
    }
})
export default memo(PressableItem)