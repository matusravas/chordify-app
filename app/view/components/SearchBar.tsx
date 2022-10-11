import React, { FC, useState, useEffect, useRef } from 'react';
import { TextInput, IconButton } from '@react-native-material/core';
import axios from 'axios';
import Icon, { Icons } from '../../icons/icons';
import { Song } from '../../model/domain/types';
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
            // console.log('condition')
            // setSearchQuery(query)
            const token = setTimeout(() => {
                console.log(query)
                onSearch(query)
            }, 1000)
            return () => clearTimeout(token)
        }
    }, [query])


    return (
        <TextInput
            // style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#14161c20', borderStyle:'solid', borderTopWidth:0, borderWidth: 1, borderColor: focused?"#087EA4": "#F7F7F730",  borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
            // style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#0d0f12EE', borderStyle: 'solid', borderWidth: 1, borderColor: focused?"#087EA4": '#00000000',  borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
            style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#0d0f12EE', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
            leading={<Icon type={Icons.MaterialIcons} name='search' size={22} color={focused?"#087EA4": "#F7F7F730" }/>}
            trailing={query ? <IconButton onPress={() => setQuery("")} icon={<Icon size={22} type={Icons.MaterialIcons} name='clear' color="#F7F7F730" />} /> : null}
            color='#087EA4'
            // caretHidden={true}
            placeholderTextColor='#F7F7F740'
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(false)}
            // inputStyle={{borderWidth: 0}}
            inputContainerStyle={{borderBottomColor: 'yellow',}}
            inputStyle={{color: "#F7F7F7", fontSize: 15, borderBottomColor: 'yellow'}}
            placeholder='Search your favorite song...'
            textAlignVertical='bottom' variant='standard'
            value={query} onChangeText={(text) => setQuery(text)} 
            />
    )
}

export default SearchBar