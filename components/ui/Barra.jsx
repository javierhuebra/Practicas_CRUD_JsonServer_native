import { Text, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'; //lo saco de ract native paper


import Icon from 'react-native-vector-icons/Ionicons';

const BarraSuperior = ({navigation, route}) => {

    

    const handlePress = () => {
        navigation.navigate("NuevoCliente") //En este lugar se marca a donde irá la navegación
    }


    return (
        <Button
            onPress={ () => handlePress() }
            textColor='#FFF'
            icon='plus-circle'
        >
            CLIENTE
        </Button>
    )
}

const styles = StyleSheet.create({
    
});

export default BarraSuperior