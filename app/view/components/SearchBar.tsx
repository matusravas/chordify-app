import React, {useState} from 'react';
import { IconButton } from '@react-native-material/core';
import { TextInput, View, TouchableOpacity, Keyboard } from 'react-native';
import Icon, { Icons } from '../../icons/icons';
import { useEffectAfterMount } from '../../utils/hooks';


interface SearchBarProps {
    searchQuery: string,
    onSearch: (query: string) => void
}


const SearchBar = ({searchQuery, onSearch}: SearchBarProps ) => {
    const [query, setQuery ] = useState(searchQuery);
    const [focused, setFocused ] = useState(false);
    console.log('SearchBar rerender')
    useEffectAfterMount(() => {
        console.log(`query_inner: ${query} query_outer: ${searchQuery}`)
        if (query !== searchQuery) {
            const token = setTimeout(() => {
                console.log(query)
                Keyboard.dismiss()
                setFocused(false)
                onSearch(query)
            }, 500)
            return () => clearTimeout(token)
        }
    }, [query])


    return (
        <View style={{height: 50, flexDirection: 'row', alignItems: 'center', borderColor: focused?'#1FC159': '#1FC15920', borderBottomWidth: 1, paddingHorizontal: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <Icon style={{marginLeft: 5, marginRight: 5, marginTop: 5}} type={Icons.MaterialIcons} name='search' size={22} color={focused?"#1FC159": "#F7F7F730" }/>
            <TextInput
            // style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#14161c20', borderStyle:'solid', borderTopWidth:0, borderWidth: 1, borderColor: focused?"#087EA4": "#F7F7F730",  borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
            // style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#0d0f12EE', borderStyle: 'solid', borderWidth: 1, borderColor: focused?"#087EA4": '#00000000',  borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
            style={{ flex: 1, color: '#F7F7F7', fontSize: 15}}
            // inlineImageLeft='search' //{<Icon type={Icons.MaterialIcons} name='search' size={22} color={focused?"#1FC159": "#F7F7F730" }/>}
            
            // trailing={query ? <IconButton onPress={() => setQuery("")} icon={<Icon size={22} type={Icons.MaterialIcons} name='clear' color="#F7F7F730" />} /> : null}
            // color='#1FC159'
            // caretHidden={true}
            selectionColor='#1FC159'
            placeholderTextColor='#F7F7F740'
            onFocus={()=>setFocused(true)}
            onBlur={()=>{setFocused(false)}}
            // inputStyle={{borderWidth: 0}}
            // inputContainerStyle={{borderBottomColor: 'yellow',}}
            // inputStyle={{color: "#F7F7F7", fontSize: 15}}
            placeholder='Search your favorite song...'
            // textAlignVertical='bottom'
            textAlignVertical='bottom'
            value={query} onChangeText={(text) => setQuery(text)} 
            />
            {/* {query && <IconButton onPress={() => setQuery("")} icon={<Icon size={22} type={Icons.MaterialIcons} name='clear' color="#F7F7F730" />} />} */}
            {query && <TouchableOpacity style={{marginTop: 5, marginRight: 5}} onPress={() =>{ setFocused(false); setQuery("")}}>
                <Icon size={22} type={Icons.MaterialIcons} name='clear' color="#F7F7F730" />
                </TouchableOpacity>}
        </View>
        
    )
}

export default SearchBar