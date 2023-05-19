
import { View, StyleSheet, Alert } from 'react-native'

import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper'

import globalStyles from '../styles/global'

import axios from 'axios'

import url from '../helpers/Variables'

const DetallesCliente = ({ navigation, route }) => {

    const { setConsultarAPI } = route.params

    const { nombre, telefono, correo, empresa, id } = route.params.item


    const mostrarConfirmacion = () => {
        Alert.alert(
            '¿Deseas eliminar este cliente?',
            'Un contacto eliminado no se puede recuperar',
            [
                { text: 'Si, eliminar', onPress: () => eliminarCliente() },
                { text: 'Cancelar', style: 'cancel' }
            ]
        )
    }


    const eliminarCliente = async () => {
        const urlEliminar = url + `/${id}`
        try{
            await axios.delete(urlEliminar)
        }catch(error){
            console.log(error)
        }

        //Redireccionar
        navigation.navigate('Inicio')

        //Volver a consultar
        setConsultarAPI(true)
    }

    

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
            <Text style={styles.texto}>Teléfono: <Subheading>{telefono}</Subheading></Text>
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>

            <Button
                icon='cancel'
                mode='contained'
                style={styles.boton}

                onPress={() => mostrarConfirmacion()}

            >
                ELIMINAR CLIENTE
            </Button>

            <FAB
                icon='pencil'
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NuevoCliente", { cliente: route.params.item, setConsultarAPI })}
                color='#FFF'
            />
            
        </View>
        //En el FAB cuando le paso cliente: route.params.item le estoy pasando el objeto cliente que seleccione y tambien le paso setConsultarAPI. En el boton agregar nuevo cliente no le paso eso
    )
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red'
    }
});

export default DetallesCliente