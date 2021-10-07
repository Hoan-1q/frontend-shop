import React from 'react';
import { View, ViewStyle, StyleSheet, TextStyle, Text, ScrollView } from 'react-native';
import { AppConstants, AppTheme, CategoryType, productsType } from '../../config/DefaultConfig';
import useConstants from '../../hooks/useConstants';
import useTheme from "../../hooks/useTheme";
import Product from './Product';

interface Props { 
    history: any;
    category: CategoryType;
    productList: productsType[]
}

// @ts-ignore
const ImagePath = require("../../images/shopping.jpg");


const Shopping: React.FunctionComponent<Props> = ({
    category,
    productList,
    history,
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();

    const goToDetails = (id: number) => {
        history.push({
            pathname: "/productDetails",
            state: {
            id: id
            }
        })
    }
    return (
        <View style={style.newItemList}>
            <View style={style.newItemListLabel}>
                <Text style={[style.leftLabel, { color: theme.labelBgColor }]}>{category.name}</Text>
            </View>
            <View style={style.newItemBoxContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {productList.filter((product) => (product.category_id === category.id)).map((res, index) => {
                        return (<View key={res.id}>
                            <Product 
                                imageUrl= {res.avatar}
                                goToDetails={() => goToDetails(res.id)}
                            />
                            <View style={style.productInfo}>
                                <Text style={style.productInfoText}>{res.title}</Text>
                                <Text style={[style.productInfoText, { color: theme.dangerColor }]}>Price {res.price} VND</Text>
                            </View>
                        </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
};

export default Shopping;

interface Style {
    secondView: ViewStyle;
    typeList: ViewStyle;
    newItemListLabel: ViewStyle;
    newItemList: ViewStyle;
    typeListTab: ViewStyle;
    leftLabel: TextStyle;
    rightLabel: TextStyle;
    newItemBoxContainer: ViewStyle;
    productInfo: ViewStyle;
    productInfoText: TextStyle;
}

const style: Style = StyleSheet.create<Style>({

    secondView: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    typeList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 10,
    },
    typeListTab: {
        textAlign: 'center',
        minWidth: 120,
    },
    newItemList: {
        flex: 2,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 10,
        height: 210
    },
    newItemListLabel: {
        flex: 1,
        flexDirection: 'row',
    },
    leftLabel: {
        flex: 1,
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'left',
        textTransform: 'capitalize',
        paddingLeft: 5,
    },
    rightLabel: {
        flex: 1,
        textAlign: 'right',
        justifyContent: 'center',
        paddingTop: 10,
        paddingRight: 5,
    },
    newItemBoxContainer: {
        flex: 5,
        overflow: 'hidden',
    },
    productInfo: {
        paddingLeft: 6,
        paddingRight: 8,
        fontSize: 20,
        maxWidth: 180,
    },
    productInfoText: {
        fontSize: 16,
        fontWeight: 'normal',
    }
});
