import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { SPREADSHEET_URL } from './utils/constants';
import SheetsView from './components/SheetsView';
import SpreadSheets from './components/SpreadSheets';
import './App.scss';
import Loading from './components/Loading';
import ThemeTable from './components/ThemeTable';

interface SheetData {
  [key: string]: number[][];
}

const App: React.FC = () => {
  const [sheets, setSheets] = useState<SheetData>({});
  const [selectedSheets, setSelectedSheets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showThemeEditor, setShowThemeEditor] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(SPREADSHEET_URL)
      .then((response) => response.json())
      .then((data) => {
        setSheets(JSON.parse(data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Fetching error:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSheetSelection = (sheetName: string): void => {
    setSelectedSheets(prevSelectedSheets => {
      if (prevSelectedSheets.includes(sheetName)) {
        return prevSelectedSheets.filter(name => name !== sheetName);
      } else {
        return [...prevSelectedSheets, sheetName];
      }
    });
  };

  const orderedSelectedSheets = useMemo(() => {
    return Object.keys(sheets)
      .filter(sheetName => selectedSheets.includes(sheetName));
  }, [sheets, selectedSheets]);

  const handleThemeChange = (): void => {
    setShowThemeEditor(prevShow => !prevShow);
  };

  const handleCloseThemeEditor = (): void => {
    setShowThemeEditor(false);
  };

  if (isLoading) {
    return <Loading label="Loading sheets..." />;
  }

  return (
    <ThemeProvider>
      <div className="app">

        <div className="sidebar">
          <h2 className="sidebar-title">Sheets</h2>
          <SpreadSheets
            sheets={sheets}
            selectedSheets={selectedSheets}
            onSheetSelect={handleSheetSelection}
            onThemeChange={handleThemeChange}
            isShownThemeEditor={showThemeEditor}
          />
        </div>

        <div className="sheets-content">
          {selectedSheets.length > 0 ? (
            orderedSelectedSheets.map(sheetName => (
              <SheetsView
                key={sheetName}
                sheetData={sheets[sheetName]}
                sheetName={sheetName}
              />
            ))
          ) : (
            <div className="content-placeholder">No spreadsheet selected</div>
          )}
        </div>

        {showThemeEditor && <ThemeTable onClose={handleCloseThemeEditor} />}

      </div>
    </ThemeProvider>
  );
};

export default App;
