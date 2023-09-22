import * as OpenAnything from 'react-native-openanything';


export const openContactSupport = () => { // when this function is called, use the package function to open an email application. 
    OpenAnything.Email('support@101.com')
}

