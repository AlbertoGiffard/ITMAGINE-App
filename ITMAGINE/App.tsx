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
import MenuProducto from './componentes/pantallas/MenuProductos/MenuProductos';
import PedidosMozo from './componentes/pantallas/PedidosMozo/PedidosMozo';
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
  