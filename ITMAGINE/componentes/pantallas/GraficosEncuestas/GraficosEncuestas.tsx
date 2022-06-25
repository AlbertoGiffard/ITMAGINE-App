import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { ActivityIndicator } from "react-native-paper";
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR, windowHeight, windowWidth } from "../../../estilos/globalStyle";
import { COLECCION_ENCUESTAS_CLIENTES } from "../../../services/colecciones";
import firebase from "../../../utils/firebase";
const firestore = firebase.firestore();

export const GraficoEncuestas = () => {
    const [cargando, setCargando] = useState<boolean>(true);

    const [dataRegresos, setDataRegresos] = useState<any[]>([]);

    const [labelsDias, setLabelsDias] = useState<string[]>([]);
    const [promediosSatisfaction, setPromediosSatisfaction] = useState<number[]>([]);
    const [promediosComida, setPromediosComida] = useState<number[]>([]);

    useEffect( () => {
        return firestore.collection( COLECCION_ENCUESTAS_CLIENTES ).onSnapshot(
            (snapshot) => {
                const datosEncuestas = snapshot.docs.map( doc => doc.data() as IEncuestaCliente );
                
                const regresarian = datosEncuestas.filter( encuesta => encuesta.regresaria ).length;
                const noRegresarian = datosEncuestas.filter( encuesta => !encuesta.regresaria ).length;

                const labelAux = datosEncuestas.map( encuesta => encuesta.fecha )
                    .filter( (valor, index, arr) => arr.indexOf(valor) == index );
                
                let promediosSatisfactionAux : number[] = [];
                let promediosComidaAux : number[] = [];

                labelAux.forEach( fecha => {
                    const enFecha = datosEncuestas.filter( encuesta => encuesta.fecha === fecha ).map( encuesta => encuesta.comida ).reduce( (prev, current) => prev + current );
                    const total = datosEncuestas.map( encuesta => encuesta.comida ).reduce( (prev, current) => prev + current );
                    promediosComidaAux.push( enFecha/total )
                } )

                labelAux.forEach( fecha => {
                    const enFecha = datosEncuestas.filter( encuesta => encuesta.fecha === fecha ).map( encuesta => encuesta.satisfaccion ).reduce( (prev, current) => prev + current );
                    const total = datosEncuestas.map( encuesta => encuesta.satisfaccion ).reduce( (prev, current) => prev + current );
                    promediosSatisfactionAux.push( enFecha/total )
                } )
                
                setDataRegresos ([
                    {name: "Si", cantidad: regresarian, color: PRIMARY_COLOR, legendFontColor: "#7F7F7F", legendFontSize: 15 },
                    {name: "No", cantidad: noRegresarian, color: SECONDARY_COLOR, legendFontColor: "#7F7F7F", legendFontSize: 15}
                ]);
                setLabelsDias (labelAux);
                setPromediosSatisfaction(promediosSatisfactionAux);
                setPromediosComida(promediosComidaAux);           
            },
            (error) => { setCargando(true); console.error(error) }
        )
        
    }, [] );

    useEffect( () => {
        if (labelsDias.length == 0 || dataRegresos.length == 0 || promediosComida.length == 0 || promediosSatisfaction.length == 0) setCargando(true);
        else setCargando(false)

    }, [labelsDias, dataRegresos, promediosComida, promediosSatisfaction] );

    return <>
        <KeyboardAvoidingView
      style = {styles.container}
        >
            <View style={styles.formMarco}>
                <SafeAreaView style={styles.form}>
                    <View style={styles.vwImg}>
                    <Image source = {require("../../../assets/bar.png")} style={styles.Img}></Image>
                    </View>
                    <ScrollView style={styles.vwSignup}>
                        { cargando ? 
                            <ActivityIndicator/> :
                            <>
                                <View style={styles.graphContainer}>
                                    <Text style={styles.textUsers}>Promedio Calificación Comida Por Día:</Text>
                                    <LineChart
                                    data={{
                                        labels: labelsDias,
                                        datasets: [
                                        {
                                            data: promediosComida
                                        }
                                        ]
                                    }}
                                    width={windowWidth}
                                    height={220}
                                    chartConfig={chartConfig}
                                    bezier
                                    />
                                </View>
                                <View style={styles.graphContainer}>
                                    <Text style={styles.textUsers}>Promedio Satisfacción Por Día:</Text>
                                    <BarChart
                                        data={{
                                            labels: labelsDias,
                                            datasets: [
                                            {
                                                data: promediosSatisfaction
                                            }
                                            ]
                                        }}
                                        width={windowWidth} // from react-native
                                        height={220}
                                        chartConfig={chartConfig}
                                    />
                                </View>
                                <View style={styles.graphContainer}>
                                    <Text style={styles.textUsers}>Porcentaje de clientes que volverían:</Text>
                                    <PieChart
                                        accessor="cantidad"
                                        data={
                                            dataRegresos
                                        }
                                        width={windowWidth} // from react-native
                                        height={220}
                                        chartConfig={chartConfig}
                                    />
                                </View>
                            </>}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </KeyboardAvoidingView>
    </>
}

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => PRIMARY_COLOR,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

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
    graphContainer: {
        margin: 5
    }
  });