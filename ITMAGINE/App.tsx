import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavegacion from './componentes/navegacion/AppNavegacion';
import { AppContext } from './context/AppContext';
import { settearHandlerDeNotificacion } from './services/pushNotification';

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage", "Non-serializable values were found in the navigation state."]);

export default function App() {
  //siempre debe renderizar hacia esta ruta 

  useEffect( () => {
    settearHandlerDeNotificacion(true);
  }, [] )

  return (
<<<<<<< HEAD
  <AppContext.Provider value={null}>
    <AppNavegacion/>
  </AppContext.Provider>
  );

  /* return (
    <MenuProducto></MenuProducto>
  ) */
=======
      <AppContext.Provider value={null}>
        <PaperProvider>
          <AppNavegacion/>
        </PaperProvider>
      </AppContext.Provider>
  );
>>>>>>> 552920e76bf688fb9ce8811bb2fe3287c53519ad
}