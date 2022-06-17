import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from "react";
<<<<<<< HEAD
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export declare interface ICargaProps {
    duracion_ms : number,
    siguientePantalla : string,
    parametrosParaSiguientePantalla : never
=======
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { BG_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, windowHeight, windowWidth } from "../../../estilos/globalStyle";
import { Loading } from "../../Loading/Loading";

export declare interface ICargaProps {
    duracion_ms? : number,
    siguientePantalla : string
>>>>>>> 552920e76bf688fb9ce8811bb2fe3287c53519ad
}

const ALTO_ICONO = windowWidth;
const ANCHO_ICONO = windowWidth;

const EXTRA_TRESHOLD = 50;
const TIEMPO_CARGA_POR_DEFECTO = 2500;

export const Carga = ( {route} : any ) => {

    //const navigation = useNavigation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
<<<<<<< HEAD
=======
    const isFocused = useIsFocused();
>>>>>>> 552920e76bf688fb9ce8811bb2fe3287c53519ad

    useEffect( () => {
        if (!isFocused) return

        const { siguientePantalla, duracion_ms } = route.params as ICargaProps;
        
<<<<<<< HEAD
        setTimeout( () => navigation.navigate( siguientePantalla), duracion_ms + EXTRA_TRESHOLD);
    }, [] );
=======
        const timeout= setTimeout( () => {
          console.log(`Navegando a ${siguientePantalla}`)
          navigation.replace( siguientePantalla )
          navigation.navigate( siguientePantalla );
        }, duracion_ms ?? TIEMPO_CARGA_POR_DEFECTO + EXTRA_TRESHOLD);

        return () => {
          console.log("Borrando componente");
          clearTimeout(timeout)
        }
    }, [isFocused] );
>>>>>>> 552920e76bf688fb9ce8811bb2fe3287c53519ad

    return (
        <View style={ styles.container }>
            <Loading
                altoIcon={ALTO_ICONO}
                anchoIcon={ANCHO_ICONO} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      backgroundColor: BG_COLOR
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