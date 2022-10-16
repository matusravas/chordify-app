import { Box, Text, VStack,  } from "@react-native-material/core"
import { TouchableOpacity, View, Pressable } from 'react-native';
import Platform from "../../platform/Platform";

const ModalMenu = (props: any) => {
    const height = Platform.getHeight()
    const width = Platform.getWidth()
    return (
        
        <Box style={{flex: 1, flexDirection: 'column', position: 'absolute', bottom: 0, left: 0, right: 0, height: 0.6 * height}}>
            <TouchableOpacity style={{flex: 2, backgroundColor: '#0d0e1300', alignSelf: 'stretch', alignItems: 'center'}} onPress={()=>props.hideModal(false)}>
            <View>
                
            </View>
            </TouchableOpacity>
            <View style={{flex: 4, backgroundColor: "#0d0f12EE", alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Pressable style={({pressed})=>[{
                    backgroundColor: pressed? '#1FC15910' :'#00000000',
                    borderRadius: 10,
                    width: width,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10
                    
                }]}>
                    <Text color="#F7F7F7AA">helooooooooooooo</Text>
                </Pressable>
                <Pressable style={({pressed})=>[{
                    backgroundColor: pressed? '#1FC15910' :'#00000000',
                    borderRadius: 10,
                    width: width,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10
                    
                }]}>
                    <Text color="#F7F7F7AA">helooooooooooooo</Text>
                </Pressable>
                <Pressable style={({pressed})=>[{
                    backgroundColor: pressed? '#1FC15910' :'#00000000',
                    borderRadius: 10,
                    width: width,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10
                    
                }]}>
                    <Text color="#F7F7F7AA">helooooooooooooo</Text>
                </Pressable>
                <Pressable style={({pressed})=>[{
                    backgroundColor: pressed? '#1FC15910' :'#00000000',
                    borderRadius: 10,
                    width: width,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10
                    
                }]}>
                    <Text color="#F7F7F7AA">helooooooooooooo</Text>
                </Pressable>
                
            </View>
            
        </Box>
    )
}

export default ModalMenu