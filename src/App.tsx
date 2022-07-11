import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import GlobalStyle from "./GlobalStyle";
import { useState } from "react";
// import { ReactQueryDevtools } from "react-query/devtools";

function App() {
    const [isDark, setIsDark] = useState(!false);
    const toggleDark = () => setIsDark((curr) => !curr);

    return (
        <>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <button onClick={toggleDark}>Toggle Mode</button>
                <GlobalStyle />
                <Router />
                {/* <ReactQueryDevtools initialIsOpen={true} /> */}
            </ThemeProvider>
        </>
    );
}

export default App;
