import { useState, useEffect } from 'react'

import { Text, StyleSheet, View, FlatList } from 'react-native'
import axios from 'axios'

import globalStyles from '../styles/global'

import { List, Headline, Button, FAB } from 'react-native-paper'

import url from '../helpers/Variables'

const Inicio = ({navigation}) => {

    //state de clientes
    const [clientes, setClientes] = useState([])

    //Para actualizar la lista de clientes
    const [ consultarAPI, setConsultarAPI ] = useState(true)

    useEffect(() => {
        const obenerClientesApi = async () => {
            try {
                const resultado = await axios.get(url)
                setClientes(resultado.data)
                setConsultarAPI(false)
            } catch (error) {
                console.log(error)
            }
        }

        if(consultarAPI){
            obenerClientesApi()
        }
        
    }, [consultarAPI])

    return (
        <View style={globalStyles.contenedor}>  
                                                                                                        
            <Button icon="plus-circle" onPress={() => navigation.navigate("NuevoCliente", { setConsultarAPI })}> 
                NUEVO CLIENTE
            </Button>

            <Headline style={globalStyles.titulo}>{clientes.length > 0 ? "Clientes" : "Aun no hay clientes"}</Headline>

            <FlatList
                data={clientes}
                keyExtractor={ cliente => (cliente.id).toString() } //Se le asigna el id como dice la doc en flatlist
                renderItem={({item}) => (
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                        onPress={() => navigation.navigate('DetallesCliente',{ item, setConsultarAPI })} //Le paso el item completo para detalles cliente
                    />
                )}
            />

            <FAB
                icon='plus'
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NuevoCliente", { setConsultarAPI })}
                color='#FFF'
            />
        </View>
    )
}


export default Inicio