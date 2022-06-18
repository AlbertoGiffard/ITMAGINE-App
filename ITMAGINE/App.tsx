import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavegacion from './componentes/navegacion/AppNavegacion';
import HomeBartender from './componentes/pantallas/HomeBartender/HomeBartender';
import HomeCocinero from './componentes/pantallas/HomeBartender/HomeCocinero';
import ListadoCliente from './componentes/pantallas/Listados/ListadoCliente';
import ListadoPedidos from './componentes/pantallas/Listados/ListadoPedidos';
import ListaEspera from './componentes/pantallas/Listados/ListaEspera';
import MenuMozo from './componentes/pantallas/MenuMozo/MenuMozo';
import PedidosMozo from './componentes/pantallas/PedidosMozo/PedidosMozo';
import { AppContext } from './context/AppContext';
import { settearHandlerDeNotificacion } from './services/pushNotification';

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage", "Non-serializable values were found in the navigation state."]);

export default function App() {
  //siempre debe renderizar hacia esta ruta 

  useEffect( () => {
    settearHandlerDeNotificacion(true);
  }, [] )

  return (
    <HomeCocinero></HomeCocinero>
    );
    //</AppContext.Provider><HomeBartender></HomeBartender>
    {/* <AppContext.Provider value={null}>
     <PaperProvider>
       <AppNavegacion/>
     </PaperProvider>
   </AppContext.Provider> */}
  }