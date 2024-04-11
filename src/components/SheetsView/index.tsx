import React, { useContext } from 'react';
import './SheetsView.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

interface SheetsViewProps {
    sheetData: number[][] | undefined;
    sheetName: string | null;
}

const SheetsView: React.FC<SheetsViewProps> = ({ sheetData, sheetName }) => {
    const { theme } = useContext(ThemeContext);

    const columnsCount = sheetData ? sheetData[0].length : 0;

    // Should be fixed according the requirements (even / odd cell definition ???)
    const getCellStyle = (rowIndex: number, cellIndex: number): React.CSSProperties => {
        const cellStyle: React.CSSProperties = {};

        const isEvenRow = (rowIndex + 1) % 2 === 0;
        const isEvenCell = sheetData && sheetData[rowIndex][cellIndex] % 2 === 0;

        if (isEvenRow) {
            cellStyle.color = theme.evenRows.color;
            cellStyle.backgroundColor = theme.evenRows.backgroundColor;
        }
        else if (!isEvenRow) {
            cellStyle.color = theme.oddRows.color;
            cellStyle.backgroundColor = theme.oddRows.backgroundColor;
        }

        // if (isEvenCell && (!!theme.evenCells.color || !!theme.evenCells.backgroundColor)) {
        //     cellStyle.color = theme.evenCells.color;
        //     cellStyle.backgroundColor = theme.evenCells.backgroundColor;
        // }

        // else if (!isEvenCell) {
        //     cellStyle.color = theme.oddCells.color;
        //     cellStyle.backgroundColor = theme.oddCells.backgroundColor;
        // }

        return cellStyle;
    };

    return (
        <div className="sheet-container">
            <h2 className="sheet-title">{sheetName}</h2>

            <div className="sheet-headers">
                {Array.from({ length: columnsCount }, (_, index) => (
                    <div key={index} className="cell header">{String.fromCharCode('A'.charCodeAt(0) + index)}</div>
                ))}
                <div className="cell header">SUM</div>
            </div>

            {sheetData?.map((row, rowIndex) => (
                <div key={rowIndex} className="sheet-row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className="cell" style={getCellStyle(rowIndex, cellIndex)}>{cell}</div>
                    ))}
                    <div className="cell sum">{row.reduce((sum, value) => sum + value, 0)}</div>
                </div>
            ))}
        </div>
    );
};

export default SheetsView;
