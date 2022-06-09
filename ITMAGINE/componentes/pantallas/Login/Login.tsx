

import React, { useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import {auth} from '../../../firebase'
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, BG_COLOR } from '../../../estilos/globalStyle';
import { windowWidth, windowHeight } from "../../../estilos/globalStyle";

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsgInicio, setErrorMsgInicio] = useState(false);
    let errorMessage;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleSignUp = () => {
        setLoading(true);
        createUserWithEmailAndPassword
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCrendetials: { user: any; }) => {
            const user = userCrendetials.user;
            alert("Usuario registrado!");
            setErrorMsgInicio(true);
            setLoading(false);

        })
        .catch((error: any) => {
            setErrorMsgInicio(false);
            setLoading(false);

        })
    }

    const handleLogin = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCrendetials: { user: any; }) => {
            const user = userCrendetials.user;
            setLoading(false);
            setErrorMsgInicio(true);
        })
        .catch((error: any) => {
            setErrorMsgInicio(true);
            setLoading(false);
        })
            
    }

    const userUsuario = () => {
        setEmail("usuario@usuario.com");
        setPassword("333333");
    }

    const userAdmin = () => {
      setEmail("admin@admin.com");
      setPassword("111111");
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
      style = {styles.container}
    >
        {loading && <View style = {styles.formMarco}>
        <ActivityIndicator size={180} color={SECONDARY_COLOR}/>
      </View>}
      

        {!loading &&
        <View style={styles.formMarco}>
          <SafeAreaView style={styles.form}>
            <View style={styles.vwImg}>
              <Image source = {require("../../../assets/bar.png")} style={styles.Img}></Image>
            </View>
            <View style={styles.vwLogin}>
              {errorMsgInicio && <Text style = {styles.errorMessage}>Error al iniciar sesión</Text>}
              <TextInput
              style={styles.input}
              placeholder="Correo"
              autoCapitalize="none"
              placeholderTextColor={SECONDARY_COLOR}
              value={email}
              onChangeText={(text) =>  {setEmail(text)}}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={SECONDARY_COLOR}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{fontWeight: 'bold', color: SECONDARY_COLOR, fontSize: 18}}> Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
            <View  style = {styles.buttonUsers}>
                  <TouchableOpacity
                      onPress = {userAdmin}
                      style = {styles.buttonUser} 
                  >
                      <Text style={styles.textUsers}>Admin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress = {userUsuario}
                      style = {[styles.buttonUser]}
                      
                  >
                      <Text style={styles.textUsers}>Usuario</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress = {userAnonimo}
                      style = {styles.buttonUser}
                  >
                      <Text style={styles.textUsers}>Ingresar como Anónimo</Text>
                  </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      }
      <StatusBar barStyle="light-content" />
    </KeyboardAvoidingView>
  );
}

export default LoginScreen

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
  vwLogin:{
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
    top: 50,
    justifyContent: "center",
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
    color:"red",
    fontSize: 20,
},
});

//primarycolor: #fd99ef rosadito
//secondary color: #3dd7fb azulito
//terciary color: #ffe045 amarillo
//bg color: #040104 negro de fondo