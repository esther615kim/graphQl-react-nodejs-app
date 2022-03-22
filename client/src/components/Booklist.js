import React from 'react';
import { gql, useQuery } from '@apollo/client';

// query
const getBooks = gql`
{
    books{
        name
        id
    }
}
`
const Booklist = () => {
    const { loading, error, data } = useQuery(getBooks);
    console.log(data);
    return (
        <>
            <ul id="bookList">
                <li>Title:</li>
            </ul>
        </>
    )
}

export default Booklist;