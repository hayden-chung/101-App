import * as OpenAnything from 'react-native-openanything';


export const openContactSupport = () => { 
    OpenAnything.Email('support@101.com')
    console.log('open')
}

