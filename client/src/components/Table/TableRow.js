import React from 'react';

export const TableRow = props => (
    <tbody>
        <tr>
            <td>{props.word}</td>
            <td>{props.hit}</td>
        </tr>
    </tbody>
)