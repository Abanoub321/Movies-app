import {Dimensions} from 'react-native';
export const Title = {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    flexDirection: 'column',
    marginBottom: 15
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