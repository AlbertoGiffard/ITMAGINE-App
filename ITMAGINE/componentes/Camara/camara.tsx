import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

export const Camara = ( { settearFoto, sacandoFoto, setSacandoFoto, setLeerQR } : any ) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState<Camera | null>(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <Text>Hubo un problema al obtener acceso a la cámara.</Text>
    }
    if (hasPermission === false) {
      return <Text>No ha otorgado permisos de acceso a la cámara.</Text>;
    }

    return (
        <View style={styles.container}>
          <Camera flashMode={"torch"} onBarCodeScanned={ (scanningResult) => {setLeerQR(scanningResult)} } ratio='1:1' style={styles.camera} type={type} ref={ ref => { setCamera(ref) } }>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={sacandoFoto}
                style={ sacandoFoto? styles.buttonDisabled : styles.button}
                onPress={() => {
                    setSacandoFoto(true);
                    camera?.takePictureAsync()
                        .then( ({uri}) => { settearFoto(uri)} )
                        .catch( e => {} );
                }}>
                <View style={styles.take} ></View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: "center"
    },
    camera: {
      flex: 0.5,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
      justifyContent: 'center'
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonDisabled: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        opacity: 0.5
    },
    take: {
      fontSize: 18,
      color: 'white',
      backgroundColor: '#C4C4C45E',
      borderColor: 'white',
      borderWidth: 5,
      width: 100,
      height: 100,
      borderRadius: 100
    },
  });