import React, { useContext, useMemo } from 'react';
import './SheetsView.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

interface SheetsViewProps {
    sheetData: number[][] | undefined;
    sheetName: string | null;
}

const SheetsView: React.FC<SheetsViewProps> = ({ sheetData, sheetName }) => {
    const { theme } = useContext(ThemeContext);

    const columnsCount = sheetData ? sheetData[0].length : 0;

    const getCellStyle = useMemo(() => (rowIndex: number, cellIndex: number): React.CSSProperties => {
        const isEvenRow = (rowIndex + 1) % 2 === 0;
        const isEvenCellValue = sheetData && sheetData[rowIndex][cellIndex] % 2 === 0;

        const cellStyle: React.CSSProperties = {
            color: isEvenRow ? theme.evenRows.color : theme.oddRows.color,
            backgroundColor: isEvenRow ? theme.evenRows.backgroundColor : theme.oddRows.backgroundColor
        };

        if (isEvenCellValue) {
            if (theme.evenCells.color) {
                cellStyle.color = theme.evenCells.color;
            }
            if (theme.evenCells.backgroundColor) {
                cellStyle.backgroundColor = theme.evenCells.backgroundColor;
            }
        } else {
            if (theme.oddCells.color) {
                cellStyle.color = theme.oddCells.color;
            }
            if (theme.oddCells.backgroundColor) {
                cellStyle.backgroundColor = theme.oddCells.backgroundColor;
            }
        }

        return cellStyle;
    }, [theme, sheetData]);

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
