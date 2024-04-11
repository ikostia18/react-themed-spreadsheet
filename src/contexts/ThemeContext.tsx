import React, { createContext, useState, ReactNode } from 'react';

interface Theme {
    evenRows: {
        color: string;
        backgroundColor: string;
    };
    oddRows: {
        color: string;
        backgroundColor: string;
    };
    evenCells: {
        color: string;
        backgroundColor: string;
    };
    oddCells: {
        color: string;
        backgroundColor: string;
    };
}

interface ThemeProviderProps {
    children: ReactNode;
}

const defaultTheme: Theme = {
    evenRows: {
        color: '',
        backgroundColor: '',
    },
    oddRows: {
        color: '',
        backgroundColor: '',
    },
    evenCells: {
        color: '',
        backgroundColor: '',
    },
    oddCells: {
        color: '',
        backgroundColor: '',
    },
};

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}>({
    theme: defaultTheme,
    setTheme: () => { },
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };
