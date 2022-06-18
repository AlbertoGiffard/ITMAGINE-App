import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, SafeAreaView, Image } from "react-native"
import { AirbnbRating } from "react-native-ratings";
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, windowHeight, windowWidth } from "../../../estilos/globalStyle";

export const Encuesta = () => {

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.formMarco}>
              <SafeAreaView style={styles.form}>
                <View style={styles.vwImg}>
                    <Image source = {require("../../../assets/bar.png")} style={styles.Img}></Image>
                </View>
                <View style={styles.button}>
                    <Text style={styles.textUsers}>¿Qué tal estuvo la atención?</Text>
                    <AirbnbRating
                        count={7}
                        reviews={["Terrible", "Malo", "Regular", "Medianamente Bueno", "Bueno", "Muy Bueno", "Excelente"]}
                        defaultRating={7}
                        size={30}
                    />
                </View>
              </SafeAreaView>
            </View>
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
      marginTop: 40,
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