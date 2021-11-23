import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fonts, width, colors } from '../../assets/strings'

const TabView = (props) => {
    const [isSelected, setIsSelected] = useState(1)
    const [listTab, setListTab] = useState([])

    const onPressTab = (id) => {
        props.onPressTab && props.onPressTab(id)
    }

    return (
        <View style={styles.tabContainer}>
            {
                props.listTab.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={{
                                // backgroundColor: item.isSelected ? colors.default : "#F5F5F5",
                                // borderRadius: 20,
                                width: (width - 14 * 2) / props.listTab.length - (10 * 2),
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: 4,
                                borderBottomColor: item.isSelected ? colors.accent : "#F5F5F5",
                                borderBottomWidth: 1,
                            }}
                            onPress={() => {
                                onPressTab(item.id)
                            }}
                        >
                            <Text style={{ ...fonts.fontMedium, color: item.isSelected ? colors.accent : "#BFBFBF" }}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default TabView

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: 'white',
        marginHorizontal: 14,
        padding: 10,
        borderRadius: 20,
        width: width - 14 * 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

})
