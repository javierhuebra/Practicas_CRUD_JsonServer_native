import React from 'react';

//Ignorar el mensaje de alerta que genera no pasar serializada la funcion
//Se ignora porque no interfiere pero hay que conocer como funciona bien para no cometer errores
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
//////////////////////////////////////////

import {
  
  StatusBar,
  StyleSheet,
  
} from 'react-native';

import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import BarraSuperior from './components/ui/Barra';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//Definir el tema de nuestro diseño

const theme = {    //DE ESTA MANERA SE ACCEDE A LAS PROPIEDADES DEL TEMA, SE COPIA Y DESPUES SE MODIFICA SI SE QUIERE
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    inverseOnSurface: '#06A715'

  }
}
/* console.log(theme.colors.inverseOnSurface) */

const App = () => {


  return (
    <>
      <PaperProvider theme={theme}> 
        <StatusBar
          barStyle='light-content'
          backgroundColor={theme.colors.inverseOnSurface}
        />

        <NavigationContainer>

          <Stack.Navigator
            initialRouteName='Inicio'

            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >

            <Stack.Screen
              name='Inicio'
              component={Inicio}

              //En esta parte se modifica el componente y se le agrega la barra
              options={({ navigation, route }) => ({  //Se usa mucho el return implicito "() => ({})"
                headerLeft: (props) => <BarraSuperior {...props}
                                        navigation={navigation}
                                        route={route}
                /> //Este componente se esta usando pero no es parte del stack por ende no "hereda" { navigation } ni { rute }
              })}

            />

            <Stack.Screen
              name='NuevoCliente'
              component={NuevoCliente}
              options={{
                title: 'Nuevo Cliente'
              }}
            />
            <Stack.Screen
              name='DetallesCliente'
              component={DetallesCliente}
              options={{
                title: 'Detalles Cliente'
              }}
            />


          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({

});

export default App;
