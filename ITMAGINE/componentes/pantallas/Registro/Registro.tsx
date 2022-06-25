import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BarCodeScanningResult } from 'expo-camera';
import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, LogBox, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from 'react-native-elements';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import { ICliente } from '../../../definiciones/ICliente';
import { BG_COLOR, PRIMARY_COLOR, PRIMARY_COLOR_DISABLED, SECONDARY_COLOR, TERCIARY_COLOR, windowHeight, windowWidth } from '../../../estilos/globalStyle';
import { registerWithValidation, uploadImage } from '../../../services/accountService';
import { verificarEmail, verificarNoVacio, verificarSoloAlfabeticos, verificarSoloNumeros } from '../../../services/checkCredentialsService';
import { COLECCION_CLIENTES } from '../../../services/colecciones';
import { DBService } from '../../../services/DBService';
import { Camara } from '../../Camara/camara';

LogBox.ignoreLogs(['Setting a timer']);

const PantallaRegistro = () => {

    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [DNI, setDni] = useState<string>('');
    const [fotoURL, setFotoUrl] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errorNombre, setErrorNombre] = useState<string>('');
    const [errorApellido, setErrorApellido] = useState<string>('');
    const [errorDni, setErrorDni] = useState<string>('');
    const [errorFotoUrl, setErrorFotoUrl] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [generalErrorMsg, setGeneralErrorMessage] = useState<string>('');

    const [sacarFoto, setSacarFoto] = useState<boolean>(false);
    const [sacandoFoto, setSacandoFoto] = useState<boolean>(false);
    const [habilitarBotonSacarFoto, setHabilitarBotonSacarFoto] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [habilitarBotonRegistro, setHabilitarBotonRegistro] = useState<boolean>(true);

    const settearNombre = ( nombre : string ) => {
      setNombre(nombre);      

      if ( !verificarSoloAlfabeticos(nombre) ) return setErrorNombre( 'Ingrese solo caracteres alfabéticos para el campo Nombre.' );
      setErrorNombre('');
    }

    const settearApellido = ( apellido : string ) => {
      setApellido(apellido);

      if ( !verificarSoloAlfabeticos(apellido) ) return setErrorApellido( 'Ingrese solo caracteres alfabéticos para el campo Apellido.' );
      setErrorApellido('');
    }

    const settearDni = ( dni : string ) => {
      setDni(dni);

      if ( !verificarSoloNumeros(dni) ) return setErrorDni( 'Ingrese solo números para el DNI.' );
      setErrorDni('');
    }

    const settearFotoUrl = ( fotoUrl : string ) => {
      setHabilitarBotonRegistro(false);
      console.log(habilitarBotonRegistro)
      setSacandoFoto(false);
      setSacarFoto(false);
      
      uploadImage( fotoUrl, email )
        .then( url => { setFotoUrl( url ); setGeneralErrorMessage(''); return url } )
        .then( url => {setHabilitarBotonRegistro(true); return url} );
    }

    const settearEmail = ( email : string ) => {
      setEmail(email);

      if ( !verificarEmail(email) ) {
        setHabilitarBotonSacarFoto( false );
        return setErrorEmail( 'Ingrese un email válido.' );
      }

      setErrorEmail('');
      setHabilitarBotonSacarFoto(true);
    }

    const settearPassword = ( password : string ) => {
      setPassword(password);

      if ( !isAlphanumeric(password) ) return setErrorPassword( 'Ingrese una contraseña alfanumérica.' );
      setErrorPassword('');
    }

    const handleSignUp = () => {
      const nombreVacio = !verificarNoVacio( nombre );
      const apellidoVacio = !verificarNoVacio( apellido );
      const dniVacio = !verificarNoVacio( DNI );
      const fotoUrlVacia = !verificarNoVacio( fotoURL );
      const emailVacio = !verificarNoVacio( email );
      const passwordVacio = !verificarNoVacio( password );

      if ( fotoUrlVacia ) return setGeneralErrorMessage( 'No se ha sacado una foto!' );

      if ( nombreVacio || apellidoVacio || dniVacio || emailVacio || passwordVacio ) return setGeneralErrorMessage( 'Faltan campos por completar!' );

      const usuario : ICliente = {
        nombre,
        apellido,
        DNI,
        email,
        password,
        estado: "inactivo",
        validacion: 'en proceso',
        fotoURL
      }

      const dbCliente : DBService<ICliente> = new DBService<ICliente>( COLECCION_CLIENTES );

      setHabilitarBotonRegistro(false)

      dbCliente.insertOne( usuario, usuario.email )
        .then( () => registerWithValidation(usuario) )
        .then( () => navegarAIniciarSesion() )
        .finally( () => setHabilitarBotonRegistro(true) )
        
    }

    const navegarAIniciarSesion = () => {
      navigation.navigate( 'Carga', { siguientePantalla: 'Login' } );
    }

    const leerQR = ( qr : BarCodeScanningResult ) => {
      const datos = qr.data.split("@");
      setSacarFoto(false);
      setApellido(datos[1]);
      setNombre(datos[2]);
      setDni(datos[4]);
    }

  return (
    <KeyboardAvoidingView
      style = {styles.container}
    >
        {loading && 
        <View style = {styles.formMarco}>
          <ActivityIndicator size={180} color={SECONDARY_COLOR}/>
        </View>}

        {sacarFoto &&
        <View style = {styles.formMarco}>
          <Camara setLeerQR={leerQR} settearFoto={settearFotoUrl} setSacandoFoto={setSacandoFoto} sacandoFoto={sacandoFoto} />
        </View>}

        {!sacarFoto && !loading &&
        <View style={styles.formMarco}>
          <SafeAreaView style={styles.form}>
            <View style={styles.vwImg}>
              <Image source = {require("../../../assets/bar.png")} style={styles.Img}></Image>
            </View>
            <ScrollView style={styles.vwSignup}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                autoCapitalize="words"
                placeholderTextColor={SECONDARY_COLOR}
                value={nombre}
                onChangeText={(nombre) =>  {settearNombre(nombre)}}
              />
              <Text style={styles.errorMessage}>{errorNombre}</Text>
              <TextInput
                style={styles.input}
                placeholder="Apellidos"
                autoCapitalize="words"
                placeholderTextColor={SECONDARY_COLOR}
                value={apellido}
                onChangeText={(apellido) =>  {settearApellido(apellido)}}
              />
              <Text style={styles.errorMessage}>{errorApellido}</Text>
              <TextInput
                style={styles.input}
                placeholder="DNI"
                autoCapitalize="none"
                placeholderTextColor={SECONDARY_COLOR}
                value={DNI}
                onChangeText={(dni) =>  {settearDni(dni)}}
              />
              <Text style={styles.errorMessage}>{errorDni}</Text>
              <TextInput
                style={styles.input}
                placeholder="Correo"
                autoCapitalize="none"
                placeholderTextColor={SECONDARY_COLOR}
                value={email}
                onChangeText={(email) =>  {settearEmail(email)}}
              />
              <Text style={styles.errorMessage}>{errorEmail}</Text>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={SECONDARY_COLOR}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={(text) => settearPassword(text)}
              />
              <Text style={styles.errorMessage}>{errorPassword}</Text>
              <TouchableOpacity 
                disabled={!habilitarBotonSacarFoto}
                onPress={() => setSacarFoto(true)}
                style={{alignSelf: 'center', backgroundColor: (habilitarBotonSacarFoto) ? PRIMARY_COLOR : PRIMARY_COLOR_DISABLED, borderRadius: 50, padding: 5, width: 50, paddingBottom: 5, paddingTop: 5 }}>
                <Icon
                  size={38}
                  color={BG_COLOR}
                  type={'ionicon'}
                  name={'camera-outline'}
                  style={{ textAlign: 'center' }}
                />
              </TouchableOpacity>
            </ScrollView>
            <View  style = {styles.buttonUsers}>
              <Text style={styles.errorMessage}>{generalErrorMsg}</Text>
              <TouchableOpacity disabled={!habilitarBotonRegistro} style={ {...styles.button, backgroundColor: (habilitarBotonSacarFoto) ? "#0000" : PRIMARY_COLOR_DISABLED} } onPress={handleSignUp}>
                  <Text style={{fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18}}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {navegarAIniciarSesion}
                    style = {styles.buttonUser} 
                >
                    <Text style={styles.textUsers}>Volver a Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      }
      <StatusBar barStyle="light-content" />
    </KeyboardAvoidingView>
  );
}

export default PantallaRegistro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor:"black"
  },
  formMarco: {
    marginHorizontal: 30,
    height: windowHeight * 0.90,
    borderRadius: 40,
    width: windowWidth * 0.99,
    justifyContent: "center",
    alignItems: 'center',
    shadowColor: PRIMARY_COLOR,
    shadowOpacity: 1,
    elevation: 250,
    shadowOffset:{width: 0, height: 0}
  },
  form: {
    marginHorizontal: 30,
    height: windowHeight * 0.90,
    borderRadius: 40,
    width: windowWidth * 0.95,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: SECONDARY_COLOR,
    borderWidth: 5,
    borderStyle: 'solid',
  },
  vwImg:{
    height: windowHeight * 0.2,
    borderRadius: 40,
    width: windowWidth * 0.8,
    //backgroundColor: 'blue'

  },
  Img:{
    maxHeight: "100%",
    maxWidth: "100%"
  },
  vwSignup:{
    height: windowHeight * 0.3,
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.05,
    //backgroundColor: 'green'

  },
  input: {
    borderBottomColor:
    TERCIARY_COLOR,
    borderBottomWidth: 5,
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: windowWidth * 0.8,
    color: PRIMARY_COLOR
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
    borderColor: PRIMARY_COLOR,
    borderWidth: 3,
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: windowWidth * 0.8,

  },
  buttonUsers:{
    width: windowWidth * 0.8,
    height: windowHeight * 0.20,
    justifyContent: "space-evenly",
    alignItems: 'center',
    marginBottom: windowHeight * 0.05,
    //backgroundColor: 'red'
  },
  buttonUser:{
    justifyContent: "center",
    alignItems: 'center',
    height: windowHeight * 0.06,
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    width: windowWidth * 0.7,
    borderRadius: 10,
  },
  textUsers:{
      fontSize: windowHeight * 0.02,
      fontWeight: 'bold',
      color: TERCIARY_COLOR,
  },
  errorMessage:{
    color:"red"
},
});

//primarycolor: #fd99ef rosadito
//secondary color: #3dd7fb azulito
//terciary color: #ffe045 amarillo
//bg color: #040104 negro de fondo