import * as React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Touchable from '../../components/touchable'
import { CITY_ID } from '../../helpers/regencies'
import { Colors, Typo } from '../../styles'
import BigList from "react-native-big-list";
import { Input } from '../../components'

const DomisiliScreen = ({ navigation, route }) => {
    const [filter, setFilter] = React.useState('')

    function _renderList(item, index) {
        return (
            <Touchable style={styles.list} onPress={() => navigation.navigate('CreateCV', { domisili: item?.kota })}>
                <Text style={styles.textCity}>{item?.kota}</Text>
            </Touchable>
        )
    }

    function _filteredList() {
        return CITY_ID.filter(function (item) {
            return item.kota.includes(filter.toUpperCase())
        })
    }


    return (
        <View style={styles.container}>
            <View style={{ margin: 8 }}>
                <Input
                    placeholder={'Cari Domisili / Kota'}
                    onChangeText={text => setFilter(text)}
                    value={filter} />
            </View>
            <BigList
                data={_filteredList()}
                renderItem={({ item, index }) => _renderList(item, index)}
                itemHeight={50} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.COLOR_WHITE
    },

    list: {
        paddingHorizontal: 14,
        paddingVertical: 16,
        borderBottomWidth: .5,
        borderBottomColor: Colors.COLOR_GRAY
    },

    //text

    textCity: {
        ...Typo.TextNormalRegular
    }

})

export default DomisiliScreen