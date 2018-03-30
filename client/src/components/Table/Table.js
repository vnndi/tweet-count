import React from 'react';
import './Table.css';

export const Table = ({children}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Keyword</th>
                    <th>Hit</th>
                </tr>
            </tbody>
            {children}
        </table>
    );
}