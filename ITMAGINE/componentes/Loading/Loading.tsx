import { useEffect, useState } from "react";
import { View } from "react-native";
import { Image, LinearProgress } from "react-native-elements";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../estilos/globalStyle";

export declare interface ILoadingProps {
    altoIcon : number,
    anchoIcon : number
};

const INTERVALO_CAMBIO_COLOR_MS = 100;

export const Loading = ( {altoIcon, anchoIcon} : ILoadingProps ) => {

    const [color, setColor] = useState<string>( PRIMARY_COLOR );

    useEffect( () => {

        setInterval( () => setColor( color === PRIMARY_COLOR ? SECONDARY_COLOR : PRIMARY_COLOR ), INTERVALO_CAMBIO_COLOR_MS );

    }, [color] );

    return (
        <>
            <Image
                style={ { width: anchoIcon, height: altoIcon } }
                source={require('../../assets/icon.png')} />
            <LinearProgress
                style={ { width: "90%" } }
                color={color} 
                variant={"indeterminate"} 
                trackColor={"#8f8f8f"}/>
        </>
    );

}