import React, {memo, useState} from 'react';
import { TextInput, TouchableOpacity, Keyboard, Animated } from 'react-native';
import Icon, { Icons } from '../../res/icons/icons';
import { useEffectAfterMount } from '../../utils/hooks';


interface SearchBarProps {
    style?: any
    editable?: boolean,
    // visible: boolean,
    placeholder?: string,
    searchQuery: string,
    onSearch: (query: string) => void
    onScrollToTop: () => void
    timeoutMilis?: number
}


const SearchBar = ({style, editable, placeholder, searchQuery, onSearch, timeoutMilis=0, onScrollToTop}: SearchBarProps ) => {
    const [query, setQuery ] = useState(searchQuery);
    const [focused, setFocused ] = useState(false);
    console.log('SearchBar rerender')

    useEffectAfterMount(() => {
        console.log(`query_inner: ${query} query_outer: ${searchQuery}`)
        if (query !== searchQuery) {
            const token = setTimeout(() => {
                console.log(query)
                // Keyboard.dismiss()
                // setFocused(false)
                onSearch(query)
            }, timeoutMilis)
            return () => clearTimeout(token)
        }
    }, [query])

    
    return (
        // <Animated.View style={{...style, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a172d', borderColor: focused?'#1FC159': '#1FC15920', borderBottomWidth: 1, paddingHorizontal: 10,}}>
        <Animated.View style={{...style, flexDirection: 'row', alignItems: 'center', backgroundColor: '#111317', borderColor: focused?'#1FC159': '#1FC15920', borderBottomWidth: 1, paddingHorizontal: 10,}}>
        {/* <View style={{display: !visible? 'none': undefined, height: 58, flexDirection: 'row', alignItems: 'center', backgroundColor: '#111317', borderColor: focused?'#1FC159': '#1FC15920', borderBottomWidth: 1, paddingHorizontal: 10,}}> */}
            
            <TouchableOpacity onPress={()=>onScrollToTop()}>
            
            <Icon  style={{marginLeft: 5, marginRight: 5, marginTop: 5}} type={Icons.MaterialIcons} name='search' size={22} color={focused?"#1FC159": "#F7F7F730" }/>
            </TouchableOpacity>
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
            onBlur={()=>{Keyboard.dismiss();setFocused(false)}}
            editable={editable}
            // inputStyle={{borderWidth: 0}}
            // inputContainerStyle={{borderBottomColor: 'yellow',}}
            // inputStyle={{color: "#F7F7F7", fontSize: 15}}
            placeholder={placeholder ? `Search ${placeholder.toLowerCase()}` : 'Search your favorite song...'}
            // textAlignVertical='bottom'
            textAlignVertical='bottom'
            value={query} onChangeText={(text) => setQuery(text)} 
            />
            
            {/* {query && <IconButton onPress={() => setQuery("")} icon={<Icon size={22} type={Icons.MaterialIcons} name='clear' color="#F7F7F730" />} />} */}
            {query && <TouchableOpacity style={{marginTop: 5, marginRight: 5}} onPress={() =>{ setFocused(false); setQuery("")}}>
                <Icon size={22} type={Icons.MaterialIcons} name='clear' color="#F7F7F730" />
                </TouchableOpacity>}
        </Animated.View>
    )
}

export default memo(SearchBar, (prev, next)=>prev.searchQuery === next.searchQuery && prev.editable === next.editable)
// export default SearchBar