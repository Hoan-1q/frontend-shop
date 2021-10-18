import React from 'react';
import { RouteComponentProps } from 'react-router-native';
import { Dispatch } from 'redux';
import { View, ViewStyle, StyleSheet, ScrollView, Image, ImageStyle } from 'react-native';
import { AppConstants, AppTheme } from '../../config/DefaultConfig';
import useConstants from '../../hooks/useConstants';
import FooterNavigation from '../Footer/Index';
import useTheme from "../../hooks/useTheme";
import CategoryList from './CategoryList'
import ListedItem from './ListedItem'
import ProductAdvertisement from './ProductAdvertisement';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';


interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history
}

// @ts-ignore
const advertisementImage = require("../../images/shoppingFlipkart.jpg")

const Shopping: React.FunctionComponent<Props> = ({
    dispatch,
    history
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();

    const [value, setValue] = React.useState('');

    const setSearch = (value: string) => {
        setValue(value);
    }
 

    return (
        <View style={style.mainContainer}>
            {/* <View style={style.firstView}>
                <CategoryList data={constants.categories} />
            </View> */}
            <View style={[style.newItemBox, { shadowColor: theme.labelBgColor, backgroundColor: theme.appColor }]}>
                <Image style={[style.newItem]} source={advertisementImage} />
                {/* <View style={style.search} >
                    <SearchBar
                        placeholder="Type Here..."
                        platform="android"
                        onChangeText={() =>setSearch}
                        value={value}
                    />
                </View> */}
            </View>

            <View style={style.secondView}>

                <ScrollView style={style.listingItem}>
                    {constants.categories.map((category) => (
                        <>
                            {constants.products.filter((pro) => (pro.category_id === category.id)).length > 0
                                && (
                                    <View style={style.items} key={category.id}>
                                        <ListedItem history={history} category={category} productList={constants.products} />
                                    </View>
                                )
                            }
                        </>
                    ))}
                    {/* <View style={style.items}>
                        <ListedItem history={history} productList={constants.products}/>
                    </View> */}
                    <View style={style.items}>
                        <ProductAdvertisement
                            imageUrl={advertisementImage}
                            label1={constants.advertisement.label1}
                            label2={constants.advertisement.label2}
                            labelBuy={constants.advertisement.labelBuy}
                            onPress={() => { alert("buy") }}
                        />
                    </View>
                    {/* <View style={style.items}>
                        <ListedItem history={history} productList={constants.products}/>
                    </View>
                    <View style={style.items}>
                        <ListedItem history={history} productList={constants.products}/>
                    </View> */}
                </ScrollView>
            </View>
            <FooterNavigation history={history} />
        </View>
    )
};

export default connect(({ dispatch }) => ({ dispatch }))(Shopping);

interface Style {
    mainContainer: ViewStyle;
    firstView: ViewStyle;
    secondView: ViewStyle;
    items: ViewStyle;
    listingItem: ViewStyle;
    newItemBox: ViewStyle;
    newItem: ImageStyle;
    search: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
    mainContainer: {
        padding: 0,
        margin: 0,
        flex: 1,
    },
    search: {
        padding: 3,
        margin: 3,
        width: 400,
        position: 'absolute'
    },
    firstView: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingLeft: 15,
        paddingRight: 15,
    },
    secondView: {
        flex: 8,
        flexDirection: 'row',
        marginBottom: 65
    },
    listingItem: {
        flexDirection: 'column',
    },
    items: {
        flexDirection: 'row',
    },
    newItemBox: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 15,
        overflow: 'hidden',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        borderWidth: 0.1,
        elevation: 4,
    },
    newItem: {
        marginLeft: 6,
        marginRight: 6,
        height: 120,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
