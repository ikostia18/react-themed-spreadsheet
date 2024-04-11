import React from 'react';
import Button from '../Button';
import './SpreadSheets.scss';


interface SpreadSheetsProps {
    sheets: Record<string, number[][]>;
    selectedSheets: string[];
    onSheetSelect: (sheetName: string) => void;
    onThemeChange?: () => void;
    isShownThemeEditor?: boolean;
}


const SpreadSheets: React.FC<SpreadSheetsProps> = ({ sheets, selectedSheets, onSheetSelect, onThemeChange, isShownThemeEditor }) => {
    const handleThemeChange = (): void => {
        onThemeChange && onThemeChange();
    };

    return (
        <div className="spreadsheet-list">
            {Object.keys(sheets).map(sheetName => (
                <Button
                    key={sheetName}
                    onClick={() => onSheetSelect(sheetName)}
                    isSelected={selectedSheets.includes(sheetName)}
                >
                    {sheetName}
                </Button>
            ))}
            <Button onClick={handleThemeChange} className="change-theme-btn" isSelected={isShownThemeEditor}>Change Theme</Button>

        </div>
    );
};

export default SpreadSheets;
