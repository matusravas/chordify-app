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
            style={{ padding: 10 }}
            leading={<Icon type={Icons.MaterialIcons} name='search' color="#425F57" />}
            trailing={query ? <IconButton onPress={() => setQuery("")} icon={<Icon type={Icons.MaterialIcons} name='clear' color="#425F57" />} /> : null}
            color='#425F57'
            placeholder='Search your favorite song...'
            textAlignVertical='bottom' variant='standard'
            value={query} onChangeText={(text) => setQuery(text)} />
    )
}

export default SearchBar