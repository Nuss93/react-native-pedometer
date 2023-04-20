import * as React from 'react';
import { Provider } from 'react-redux'; 
import NavigationScreens from './NavigationScreens';
import store from './stores/store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationScreens />
    </Provider>
  );
}