import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      accent: 'yellow',
    },
  };

const { persistor, store } = ConfigureStore();

export default function App() {
    return (
            <Provider store={store}>
                <PaperProvider theme={theme}>
                    <PersistGate
                        loading={<Loading />}
                        persistor={persistor}>
                        <Main />
                    </PersistGate>
                </PaperProvider>
            </Provider>
    );
}