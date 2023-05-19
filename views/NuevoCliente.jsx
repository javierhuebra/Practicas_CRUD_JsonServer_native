
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper'

import globalStyles from '../styles/global'

import axios from 'axios'

import url from '../helpers/Variables'

//Toda la informacion que pasemos mediante react navigation se va guardando en route
const NuevoCliente = ({ navigation, route }) => {


    //console.log(route.params) tengo guardada la funcion en params

    const { setConsultarAPI } = route.params //destructuro asi me queda el nombre libre para no poner con puntos


    //campos para el formulario
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [empresa, setEmpresa] = useState('')

    const [alerta, setAlerta] = useState(false)



    //Detectar si estamos editando o no
    useEffect(() => {
        if (route.params.cliente) {
            const { nombre, telefono, correo, empresa } = route.params.cliente
            setNombre(nombre)
            setTelefono(telefono)
            setCorreo(correo)
            setEmpresa(empresa)
        }
    }, [])


    // almacena el cliente en la BD
    const guardarCliente = async () => {
        //Validar
        if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
            setAlerta(true)
            return
        }


        //Generar el cliente
        const cliente = { nombre, telefono, correo, empresa }


        //Si estamos editando o creando un nuevo cliente
        if (route.params.cliente) {

            const { id } = route.params.cliente
            cliente.id = id

            const editUrl = url + `/${id}`

            try{
                await axios.put(editUrl, cliente)
            }catch(error){
                console.log(error)
            }


        } else {
            //Guardar el cliente en la API 
            //La ruta la puse en modo numerico porque el celu no me lo tomaba como localhost
            try {
                await axios.post(url, cliente)
            } catch (error) {
                console.log(error)
            }
        }


        //Redireccionar
        navigation.navigate("Inicio")

        //Limpiar el form
        setNombre('')
        setTelefono('')
        setCorreo('')
        setEmpresa('')

        //Cambiar a true para que lo detecte el useEffect de inicio
        setConsultarAPI(true)
    }



    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}> {route.params.cliente ? 'Editar cliente' : 'Añadir Nuevo Cliente'}</Headline>
            <TextInput
                label="Nombre"
                onChangeText={(texto) => setNombre(texto)}
                value={nombre}
                style={styles.input}
            />

            <TextInput
                label="Teléfono"
                onChangeText={(texto) => setTelefono(texto)}
                value={telefono}
                style={styles.input}
            />

            <TextInput
                label="Correo"
                onChangeText={(texto) => setCorreo(texto)}
                value={correo}
                style={styles.input}
            />

            <TextInput
                label="Empresa"
                onChangeText={(texto) => setEmpresa(texto)}
                value={empresa}
                style={styles.input}
            />

            <Button
                icon="pencil-circle"
                mode='contained'
                onPress={() => guardarCliente()}
            >
                {route.params.cliente ? 'GUARDAR EDICIÓN' : 'GUARDAR CLIENTE'}
            </Button>

            <Portal>
                <Dialog
                    visible={alerta} //muestra si esta visible o no
                    onDismiss={() => setAlerta(false)} //para que se cierre cuando tocas la parte negra
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setAlerta(false)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente