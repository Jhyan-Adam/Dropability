import React, { useContext } from 'react';
import { TextInput } from '@mantine/core';
import { SearchContext } from '../pages/Items';

export default function SearchBar({ searchValue, setSearchValue }) {

    return (
        <TextInput
            placeholder="Tap to search"
            value={searchValue}
            onChange={(val) => {setSearchValue(val.currentTarget.value)}}
            style={{
                height: "fit-content",
                width: "100%",
                fontSize: "180%",
                color: "#858585",
                textAlign: "center",
            }}
        />
    );
}
