import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavegacion from './componentes/navegacion/AppNavegacion';
import { AppContext } from './context/AppContext';
import { settearHandlerDeNotificacion } from './services/pushNotification';

LogBox.ignoreAllLogs();

export default function App() {
  //siempre debe renderizar hacia esta ruta 

  useEffect( () => {
    settearHandlerDeNotificacion(true);
  }, [] )

  return (
    <AppContext.Provider value={{mesa: undefined, pedido: undefined, usuario: null}}>
      <PaperProvider>
        <AppNavegacion/>
      </PaperProvider>
    </AppContext.Provider> 
    );
  }
  