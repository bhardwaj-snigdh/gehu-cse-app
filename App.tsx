import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import Main from './components/Main';
import { store } from './redux/store';

// TODO: session logout at token expiry, with draft saving
export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <NavigationContainer>
          <ApplicationProvider {...eva} theme={eva.dark}>
            <Main />
            <StatusBar hidden />
          </ApplicationProvider>
        </NavigationContainer>
      </Provider>
    </>
  );
}
