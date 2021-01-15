import React from 'react';
import { View, Linking, Text ,ToastAndroid, TouchableOpacity} from 'react-native';
import { showMessage } from 'react-native-flash-message';


const LinkerComponent = ({baseUrl,url,color,text}) => {
    const background = {
            backgroundColor:color,
            borderRadius:20,
            
            padding:10,
            alignSelf: 'center',
            margin:10
        
    };
    const linkTo = () => {
        
        if (url == '' || url == null) {
          
            ToastAndroid.show(
                "There is nothing to retrive",
                ToastAndroid.LONG
              );
        }
        else
          {
              
         Linking.openURL(baseUrl + url)
          }      
    }
    return (
        <TouchableOpacity onPress={linkTo} style={{ margin: 5 }}>
            <View style={background }>
                <Text>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}


export { LinkerComponent };