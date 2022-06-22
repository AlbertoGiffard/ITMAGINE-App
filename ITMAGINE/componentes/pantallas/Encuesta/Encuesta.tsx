import { useContext, useState } from "react";
import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Checkbox, Switch } from 'react-native-paper';
import { AirbnbRating } from "react-native-ratings";
import { AppContext } from "../../../context/AppContext";
import { BG_COLOR, PRIMARY_COLOR, PRIMARY_COLOR_DISABLED, SECONDARY_COLOR, TERCIARY_COLOR, windowHeight, windowWidth } from "../../../estilos/globalStyle";
import { uploadImage } from "../../../services/accountService";
import { COLECCION_ENCUESTAS_CLIENTES } from "../../../services/colecciones";
import { DBService } from "../../../services/DBService";
import { Camara } from "../../Camara/camara";
import uuid from 'react-native-uuid';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Encuesta = () => {
    const [satisfaccion, setSatisfaccion] = useState<number>(7);
    const [regresaria, setRegresaria] = useState<boolean>(false);
    const [comida, setComida] = useState<number>(7);
    const [mejorarVelocidad, setMejorarVelocidad] = useState<boolean>(false);
    const [mejorarTrato, setMejorarTrato] = useState<boolean>(false);
    const [mejorarLimpieza, setMejorarLimpieza] = useState<boolean>(false);
    const [sacarFoto, setSacarFoto] = useState<boolean>(false);
    const [fotoEncuestaURL, setFotoEncuestaURL] = useState<string>("");
    const [sacandoFoto, setSacandoFoto] = useState<boolean>(false);
    const context = useContext(AppContext);
    const [habilitarBotonSacarFoto, setHabilitarBotonSacarFoto] = useState<boolean>(true);
    const [habilitarBotonEnviarEncuesta, setBotonHabilitarEncuesta] = useState<boolean>(true);
    const dbEncuestas = new DBService<IEncuestaCliente>(COLECCION_ENCUESTAS_CLIENTES);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    if (!context) return <Text style={styles.errorMessage}>Error en la aplicación!!!</Text>
    if (!context.usuario) return <Text style={styles.errorMessage}>No ha iniciado sesión!</Text>
    if (!context.usuario.email) return <Text style={styles.errorMessage}>No es un usuario iniciado!</Text>

    const handleEnviarEncuesta = () => {
        setBotonHabilitarEncuesta(false);
        const {email, nombre} = context.usuario;

        const mejorar = [];

        if ( mejorarVelocidad ) mejorar.push("Velocidad");
        if ( mejorarTrato ) mejorar.push("Trato");
        if ( mejorarLimpieza ) mejorar.push("Limpieza");

        const date = new Date();

        const fecha = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
        
        const encuesta : IEncuestaCliente = {
            email,
            comida,
            mejorar,
            nombre,
            regresaria,
            satisfaccion,
            fotoEncuestaURL,
            fecha: (new Date()).toDateString()
        }

        dbEncuestas.insertOne( encuesta, uuid.v4().toString() )
            .then( () => setBotonHabilitarEncuesta(true) )
            .then( () => navigation.navigate( 'Carga', {siguientePantalla: 'ClienteEnMesa'} ) );
    }

    const settearFotoUrl = ( fotoUrl : string ) => {
        const {email} = context.usuario;
        setSacandoFoto(false);
        setSacarFoto(false);
        
        uploadImage( fotoUrl, email )
          .then( url => { setFotoEncuestaURL( url ); return url } );
      }

    return (
        <KeyboardAvoidingView style={styles.container}>
            {sacarFoto &&
            <View style = {styles.formMarco}>
                <Camara settearFoto={settearFotoUrl} setSacandoFoto={setSacandoFoto} sacandoFoto={sacandoFoto} />
            </View>}
            {!sacarFoto && 
            <View style={styles.formMarco}>
                <SafeAreaView style={styles.form}>
                    <View style={styles.vwImg}>
                        <Image source = {require("../../../assets/bar.png")} style={styles.Img}></Image>
                    </View>
                    <ScrollView style={styles.vwLogin}>
                        <View style={styles.button}>
                            <Text style={styles.textUsers}>¿Qué tan satisfactorio fue el servicio?</Text>
                            <AirbnbRating
                                count={7}
                                reviews={["Terrible", "Malo", "Regular", "Medianamente Bueno", "Bueno", "Muy Bueno", "Excelente"]}
                                defaultRating={7}
                                size={30}
                                onFinishRating={ (number) => setSatisfaccion(number) }
                            />
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.textUsers}>¿Regresaría a nuestro Restaurante?</Text>
                            <Switch value={regresaria} onValueChange={ () => setRegresaria(!regresaria) }/>
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.textUsers}>¿Qué tal estuvo la comida?</Text>
                            <AirbnbRating
                                count={7}
                                reviews={["Terrible", "Malo", "Regular", "Medianamente Bueno", "Bueno", "Muy Bueno", "Excelente"]}
                                defaultRating={7}
                                size={30}
                                onFinishRating={ (number) => setComida(number) }
                            />
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.textUsers}>¿Qué mejoraría?</Text>
                            <Checkbox.Item 
                                label="Velocidad"
                                labelStyle={{...styles.textUsers, color: 'white'}}
                                uncheckedColor={SECONDARY_COLOR}
                                color={PRIMARY_COLOR}
                                status={ mejorarVelocidad ? "checked" : "unchecked" } 
                                onPress={ () => setMejorarVelocidad(!mejorarVelocidad) }/>
                            <Checkbox.Item 
                                label="Limpieza" 
                                labelStyle={{...styles.textUsers, color: 'white'}}
                                uncheckedColor={SECONDARY_COLOR}
                                color={PRIMARY_COLOR}
                                status={ mejorarLimpieza ? "checked" : "unchecked" } 
                                onPress={ () => setMejorarLimpieza(!mejorarLimpieza) }/>
                            <Checkbox.Item 
                                label="Trato" 
                                labelStyle={{...styles.textUsers, color: 'white'}}
                                uncheckedColor={SECONDARY_COLOR}
                                color={PRIMARY_COLOR}
                                status={ mejorarTrato ? "checked" : "unchecked" } 
                                onPress={ () => setMejorarTrato(!mejorarTrato) }/>
                        </View>
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
                    <TouchableOpacity
                        onPress={handleEnviarEncuesta}
                        style={styles.buttonUser}
                        disabled={!habilitarBotonEnviarEncuesta}
                    >
                        <Text style={styles.textUsers}>Enviar Encuesta</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>}
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      backgroundColor:"black"
    },
    formMarco: {
      marginHorizontal: 30,
      height: windowHeight * 0.9,
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
      paddingBottom: 10
    },
    vwImg:{
      height: windowHeight * 0.2,
      borderRadius: 40,
      width: windowWidth * 0.8,
    },
    Img:{
      maxHeight: "100%",
      maxWidth: "100%"
    },
    vwLogin:{
      height: windowHeight * 0.3,
      width: windowWidth * 0.8,
      marginTop: windowHeight * 0.05
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
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      width: windowWidth * 0.8,
    },
    buttonUsers:{
      width: windowWidth * 0.8,
      height: windowHeight * 0.20,
      justifyContent: "space-evenly",
      alignItems: 'center',
      marginBottom: windowHeight * 0.05,
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
        color: PRIMARY_COLOR,
    },
    errorMessage:{
      color:"red"
  },
  });