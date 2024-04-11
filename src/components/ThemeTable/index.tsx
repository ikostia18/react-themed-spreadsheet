import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './ThemeTable.scss';

interface ThemeTableProps {
    onClose: () => void;
}

const ThemeTable: React.FC<ThemeTableProps> = ({ onClose }) => {
    const { theme, setTheme } = useContext(ThemeContext);

    const updateTheme = (
        category: 'evenRows' | 'oddRows' | 'evenCells' | 'oddCells',
        key: 'color' | 'backgroundColor',
        value: string) => {
        setTheme(prevTheme => ({
            ...prevTheme,
            [category]: {
                ...prevTheme[category],
                [key]: value,
            },
        }));
    };

    // This component can be more elegant..
    return (
        <div className="theme-editor">
 
            <div className='theme-row-wrapper'>
                <div className='theme-row-title'>
                    Even Rows:
                </div>
                <div className="theme-row">
                    <label>Color:</label>
                    <input
                        type="color"
                        value={theme.evenRows.color}
                        onChange={(e) => updateTheme('evenRows', 'color', e.target.value)}
                    />
                </div>
                <div className="theme-row">
                    <label>Background Color:</label>
                    <input
                        type="color"
                        value={theme.evenRows.backgroundColor}
                        onChange={(e) => updateTheme('evenRows', 'backgroundColor', e.target.value)}
                    />
                </div>
            </div>

            <div className='theme-row-wrapper'>
                <div className='theme-row-title'>
                    Odd Rows:
                </div>
                <div className="theme-row">
                    <label>Color:</label>
                    <input
                        type="color"
                        value={theme.oddRows.color}
                        onChange={(e) => updateTheme('oddRows', 'color', e.target.value)}
                    />
                </div>
                <div className="theme-row">
                    <label>Background Color:</label>
                    <input
                        type="color"
                        value={theme.oddRows.backgroundColor}
                        onChange={(e) => updateTheme('oddRows', 'backgroundColor', e.target.value)}
                    />
                </div>
            </div>

            <div className='theme-row-wrapper'>
                <div className='theme-row-title'>
                    Even Cell Values:
                </div>
                <div className="theme-row">
                    <label>Color:</label>
                    <input
                        type="color"
                        value={theme.evenCells.color}
                        onChange={(e) => updateTheme('evenCells', 'color', e.target.value)}
                    />
                </div>
                <div className="theme-row">
                    <label>Background Color:</label>
                    <input
                        type="color"
                        value={theme.evenCells.backgroundColor}
                        onChange={(e) => updateTheme('evenCells', 'backgroundColor', e.target.value)}
                    />
                </div>
            </div>

            <div className='theme-row-wrapper'>
                <div className='theme-row-title'>
                    Odd Cell Values:
                </div>
                <div className="theme-row">
                    <label>Color:</label>
                    <input
                        type="color"
                        value={theme.oddCells.color}
                        onChange={(e) => updateTheme('oddCells', 'color', e.target.value)}
                    />
                </div>
                <div className="theme-row">
                    <label>Background Color:</label>
                    <input
                        type="color"
                        value={theme.oddCells.backgroundColor}
                        onChange={(e) => updateTheme('oddCells', 'backgroundColor', e.target.value)}
                    />
                </div>
            </div>
            <button className="close-button" onClick={onClose}>X</button>
        </div>
    );
};

export default ThemeTable;
