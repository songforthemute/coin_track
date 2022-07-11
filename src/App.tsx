import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import GlobalStyle from "./GlobalStyle";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
// import { ReactQueryDevtools } from "react-query/devtools";

function App() {
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <GlobalStyle />
                <Router />
                {/* <ReactQueryDevtools initialIsOpen={true} /> */}
            </ThemeProvider>
        </>
    );
}

export default App;
