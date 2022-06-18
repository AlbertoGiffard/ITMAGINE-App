import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AppContext } from '../../../context/AppContext';
import { ICliente } from '../../../definiciones/ICliente';
import { IStaff } from '../../../definiciones/IStaff';
import { COLECCION_CLIENTES, COLECCION_DUENIO, COLECCION_EMPLEADOS } from '../../../services/colecciones';
import { DBService } from '../../../services/DBService';
import { FAB } from 'react-native-paper';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsgInicio, setErrorMsgInicio] = useState(false);
  let errorMessage;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const servicioCliente = new DBService<ICliente>(COLECCION_CLIENTES);
  const servicioStaff = new DBService<IStaff>(COLECCION_EMPLEADOS);
  const servicioDuenio = new DBService<IStaff>(COLECCION_DUENIO);
  const context = useContext(AppContext);
  const [open, setOpen] = useState<boolean>(false);

  //const navigation = useNavigation()

  const handleLogin = () => {
    setLoading(true);
    /*  signInWithEmailAndPassword(auth, email, password)
     .then(userCrendetials => {
         const user = userCrendetials.user;
         setLoading(false);
         setErrorMsgInicio(true);
     })
     .catch(error => {
         setErrorMsgInicio(true);
         setLoading(false);
     }) */


    EncontrarUsuario(servicioCliente).catch(() =>
      EncontrarUsuario(servicioStaff) //cambiar la redireccion de ambos
    ).catch(() => EncontrarUsuario(servicioDuenio)).catch(() => {
      setErrorMsgInicio(true); //aca debe ir un no encontre el usuario
      setLoading(false);
    });
  }

  const EncontrarUsuario = (servicio: DBService<any>) => {
    //version nueva
    return servicio.getById(email).then((valor: any) => {
      console.log('valor ', valor);
      
      if (valor.password == password) {
        setLoading(false);
        setErrorMsgInicio(true);

        if (context != null) {
          context.usuario = valor;
          switch (valor.tipo) {
            case 'metre':
              navigation.navigate('Carga', { siguientePantalla: 'homeMetre' });
              break;

            case 'cocinero':
              navigation.navigate('Carga', { siguientePantalla: 'homeCocinero' });
              break;

            case 'bartender':
              navigation.navigate('Carga', { siguientePantalla: 'homeBartender' });
              break;

            case 'dueño':
              navigation.navigate('Carga', { siguientePantalla: 'homeDuenio' });
              break;

            default:
              navigation.navigate('Carga', { siguientePantalla: 'HomeCliente' })
              break;
          }
        }
      } else {
        setErrorMsgInicio(true);
        setLoading(false);
        throw new Error;
      }
    })
  }

  const NavegarRegistro = () => {
    navigation.navigate('Carga', { siguientePantalla: 'Registro' })
  }

  const NavegarAnonimo = () => {
    //la ruta real es: IngresoAnonimo
    //ruta prueba: ListadoPedido
    navigation.navigate('IngresoAnonimo');
  }

  const userAnonimo = () => {
    //Comente esto Agus para que me lleve 
    //a la pagina creada
    /* setEmail("anonimo@anonimo.com");
    setPassword("444444"); */
    //la ruta real es: IngresoAnonimo
    navigation.navigate('ListadoPedido');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >

      {loading && <View style={styles.formMarco}>
        <ActivityIndicator size={180} color="#3dd7fb" />
      </View>}


      {!loading &&
        <>
        <View style={styles.formMarco}>
          <SafeAreaView style={styles.form}>
            <View style={styles.vwImg}>
              <Image source={require("../../../assets/bar.png")} style={styles.Img}></Image>
            </View>
            <View style={styles.vwLogin}>
              {errorMsgInicio && <Text style={styles.errorMessage}>Error al iniciar sesión</Text>}
              <TextInput
                style={styles.input}
                placeholder="Correo"
                autoCapitalize="none"
                placeholderTextColor={"#3dd7fb"}
                value={email}
                onChangeText={(text) => { setEmail(text) }}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={"#3dd7fb"}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{ fontWeight: 'bold', color: '#3dd7fb', fontSize: 18 }}> Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonUsers}>
              <TouchableOpacity
                onPress={NavegarRegistro}
                style={[styles.buttonUser, styles.buttonRegistro]}
              >
                <Text style={styles.textUsers}>Registrarse</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={NavegarAnonimo}
                style={styles.buttonUser}
              >
                <Text style={styles.textUsers}>Anónimo</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View></>
      }
      <StatusBar barStyle="light-content" />
      <FAB.Group
        style={ {position:'absolute', right: 0, bottom: 0} }
        visible={true}
        onStateChange={() => setOpen(!open)}
        open={open}
        icon='plus'
        actions={[
          {icon: 'email', label: "Dueño", onPress: () => {setEmail('duenio@duenio.com'); setPassword('123')}},
          {icon: 'email', label: "Mozo", onPress: () => {setEmail('mozoUno@mozo.com'); setPassword('123')}},
          {icon: 'email', label: "Bartender", onPress: () => {setEmail('bartenderUno@bartender.com'); setPassword('123')}},
          {icon: 'email', label: "Cocinero", onPress: () => {setEmail('cocineroUno@cocinero.com'); setPassword('123')}},
          {icon: 'email', label: "Metre", onPress: () => {setEmail('metreUno@metre.com'); setPassword('123')}},
        ]}
      />
    </KeyboardAvoidingView>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "black"
  },
  formMarco: {
    marginHorizontal: 30,
    height: windowHeight * 0.90,
    borderRadius: 40,
    width: windowWidth * 0.99,
    justifyContent: "center",
    alignItems: 'center',
    shadowColor: "#fd99ef",
    shadowOpacity: 1,
    elevation: 250,
    shadowOffset: { width: 0, height: 0 }
  },
  form: {
    marginHorizontal: 30,
    height: windowHeight * 0.90,
    borderRadius: 40,
    width: windowWidth * 0.95,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: '#3dd7fb',
    borderWidth: 5,
    borderStyle: 'solid',
  },
  vwImg: {
    height: windowHeight * 0.2,
    borderRadius: 40,
    width: windowWidth * 0.8,
    //backgroundColor: 'blue'

  },
  Img: {
    maxHeight: "100%",
    maxWidth: "100%"
  },
  vwLogin: {
    height: windowHeight * 0.3,
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.05,
    //backgroundColor: 'green'

  },
  input: {
    borderBottomColor:
      "#ffe045",
    borderBottomWidth: 5,
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: windowWidth * 0.8,
    color: "#fd99ef"
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  button: {
    borderColor: '#fd99ef',
    borderWidth: 3,
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: windowWidth * 0.8,

  },
  buttonUsers: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.20,
    top: 50,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: windowHeight * 0.05,
    //backgroundColor: 'red'
  },
  buttonUser: {
    justifyContent: "center",
    alignItems: 'center',
    height: windowHeight * 0.06,
    borderBottomColor: "#fd99ef",
    borderBottomWidth: 1,
    borderTopColor: "#fd99ef",
    borderTopWidth: 1,
    width: windowWidth * 0.7,
    borderRadius: 10,
  },
  buttonRegistro: {

    marginBottom: windowHeight * 0.035,
  },
  textUsers: {
    fontSize: windowHeight * 0.02,
    fontWeight: 'bold',
    color: "#ffe045",
  },
  errorMessage: {
    color: "red",
    fontSize: 20,
  },
});

//primarycolor: #fd99ef rosadito
//secondary color: #3dd7fb azulito
//terciary color: #ffe045 amarillo
//bg color: #040104 negro de fondo