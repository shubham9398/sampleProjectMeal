import React from 'react';
import './calendar.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CalendarHead = props => {

    const {allMonths, setMonth, toggleMonthSelect, currentMonth, currentYear, showMonthTable} = props;

    let months = [];
    
    allMonths.map(month => (
        months.push(
            <TableCell 
                colSpan="2"
                className="month-cell" 
                style={{textAlign: "center"}}
                key={month}
                onClick={e => setMonth(month)}
            >
                <span>{month}</span>
            </TableCell>
        )
    ));

    let rows = [];
    let cells = [];

    months.forEach((month, i) => {
        if (i % 3 !== 0 || i === 0) {
            cells.push(month);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(month);
        }
    });
    rows.push(cells);

    let monthList = rows.map((row, i) => <TableRow key={i}>{row}</TableRow>);

    return (
        <TableContainer component={Paper} className="month-selector">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            className="toggle-month" 
                            colSpan="4"
                            onClick={() => toggleMonthSelect()}
                        >
                            {currentMonth()}
                            <ArrowDropDownIcon
                                className="arrow-icon"
                            />
                        </TableCell>
                        <TableCell colSpan="4">
                            {currentYear()}
                        </TableCell>
                    </TableRow>
                </TableHead>
                {showMonthTable ?
                    <TableBody>
                        <TableRow>
                            <TableCell 
                                colSpan="5"
                                style={{textAlign:"center"}}
                                className="select-month-title"
                                >Select a month</TableCell>
                        </TableRow> 
                        { monthList }
                    </TableBody>
                : null }
            </Table>
        </TableContainer>
    )
};

export default CalendarHead;