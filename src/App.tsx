import { ThemeProvider } from 'contexts/Theme';
import { Screen } from 'screens';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { LS_STATUS_KEY, appStatus, scheme, AppStatus } from 'const';
import { useCallback } from 'react';

const Main = () => {
    const [status, setStatus] = useLocalStorage<AppStatus>(LS_STATUS_KEY, appStatus.STARTING);

    const handleStatusChange = useCallback(() => {
        setStatus(scheme[status].nextStatus);
    }, [status, setStatus]);

    return <Screen status={status} onStatusChange={handleStatusChange} />;
};

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark">
            <Main />
        </ThemeProvider>
    );
};

export default App;
