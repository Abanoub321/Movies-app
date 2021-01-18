import {Dimensions} from 'react-native';
export const Title = {
    flex: 1,
    alignSelf:'center',
    fontWeight: "bold",
    fontSize: 20,
    margin: 15,
    marginRight: 20
}
export const posterImage = {
    width: 250,
    height: Math.round(Dimensions.get('screen').height) / 2,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 15,
}

export const overView = {
    alignSelf: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    margin: 10,
    marginTop: 15,
    fontSize: 15,
    margin: 3,
}
export const rowDetail = {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 3,
}
export const detailsHeader = {
    color: 'blue',
    fontWeight: 'bold',
    marginRight: 3
}
export const centerdAboveDetail = {
    flexDirection: 'column',
    alignItems: 'center'
}
export const backgroundImage= {

    width: Math.round(Dimensions.get('screen').width),
    height: Math.round(Dimensions.get('screen').height) / 3,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    resizeMode: 'stretch',
}
export const   genreContainer= {
    flexDirection: 'row',
    marginLeft: 10,
    flexWrap: 'wrap'
}
export const buttons ={
    padding:8,
    backgroundColor:'#7E7777',
    borderRadius:10,
    marginBottom:15,
    minWidth:60,
    alignItems:'center'
}
export const buttonText ={
    color:'white'
}