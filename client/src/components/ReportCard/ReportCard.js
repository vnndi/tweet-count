import React from 'react';
import {TableRow} from '../Table';
import './ReportCard.css';

const ReportCard = ({word, hit}) => (
    <TableRow
        word={word}
        hit={hit}
    />
)

export default ReportCard;