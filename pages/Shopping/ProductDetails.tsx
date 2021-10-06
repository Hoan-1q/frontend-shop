import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-native';
import { Dispatch } from 'redux';
import { View, ViewStyle, StyleSheet, TextStyle, ImageBackground, Text, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AppConstants, AppTheme, productsType } from '../../config/DefaultConfig';
import useConstants from '../../hooks/useConstants';
import RoundButton from '../../components/Base/RoundButton';
import useTheme from "../../hooks/useTheme";
import CarouselComponent from '../../components/common/Carousel';
import BackButton from '../../components/common/BackButton';
import CommonModal from '../../components/Modal/CommonModal';
import { AppLanguage } from '../../config/languages';
import useLanguage from '../../hooks/useLanguage';
import { getProductsByID } from '../../store/api/products';
import { connect } from 'react-redux';
import { pushDataToCarts } from '../../store/reducers/config';

var screenWidth = Dimensions.get('window').width; //full width

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history: any,
    location: any,
}

// @ts-ignore
const ImagePath = require("../../images/shopping.jpg")
// @ts-ignore
const ImageShopping = require("../../images/shoppingGirl.jpg")

const productData = {
    name: "Apple AirPods Pro",
    price: "$20",
    // images: [ImagePath, ImageShopping, ImagePath, ImageShopping],
    // idealFor: 'woman',
    // color: ['red', 'blue', 'black', 'green'],
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
}

const ProductDetails: React.FunctionComponent<Props> = ({
    dispatch,
    history,
    location,
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();
    const language: AppLanguage = useLanguage();
    const [open, setOpen] = useState(false);
    const [dataProduct, setDataProduct] = useState({});
    const [quatity, setQuatity] = useState(1);
    
    React.useEffect(() => {
        const { id } = location.state
        async function fetchMyAPI() {
        const data = await getProductsByID(id);
        setDataProduct(data[0]);
        // dispatch(setProductsAction(data));
        }

        fetchMyAPI()
    }, [])

    const backButton = () => {
        console.log('test');
        history.push('/shopping/')
    }

    const checkout = () => {
        history.push('/checkout/')
    }

    const onClickAddToCart = () => {
        const { id } = location.state
        const { price, title } = dataProduct as any
        dispatch(pushDataToCarts({ 
            id,
            title,
            price,
            quatity,
         }))
        console.log(constants.carts);
        setOpen(true)


    }

    // const openModal = () => {
        
    // }

    const closeModal = () => {
        setOpen(false)
    }

    const selectColors = (color: any[]) => {
        return (<View style={style.productColorRow}>
            {color.map((color, index) => {
                return <TouchableOpacity key={index} style={[style.productColor, { backgroundColor: color }]}></TouchableOpacity>
            })}
        </View>)
    }

    const selectSizes = (size: any[]) => {
        return (<View style={style.productSizesRow}>
            {size.map((size, index) => {
                return <TouchableOpacity key={index}><Text style={[style.productSize]}>{size}</Text></TouchableOpacity>
            })}
        </View>)
    }

    const renderImageList = (images: any[]) => {
        return (images.map((img, index) => {
            return (<View key={index} style={style.carouselRow}>
                    <ImageBackground source={img} style={{ width: '100%', height: '100%', opacity: 0.7}} />
                </View>
            )
        }))
    }

    const dataImage = [
        {
            url: 'http://192.168.1.2:3000/1.jpg'
        },
        {
            url: 'http://192.168.1.2:3000/1.jpg'
        },
        {
            url: 'http://192.168.1.2:3000/1.jpg'
        },
    ]

    const { price, amount, content, title, images } = dataProduct as any

    const imagesArray = images.split(",");



    return (
            <View style={style.mainContainer}>
                <BackButton onPress={backButton} />
                <ScrollView>
                <View style={style.row1}>
                    {/* <Image style={[style.newItem]} source={ImagePath} /> */}
                    <CarouselComponent data={imagesArray} />
                </View>

                    <View style={style.row2}>
                        <View style={style.row2_Child}>
                            <Text style={style.productName}>{title}</Text>
                            <Text style={style.productPrice}>{price}</Text>
                            <Text style={style.productPrice}>{content}</Text>
                            {/* {selectColors(productData.color)} */}
                            {/* {selectSizes(productData.size)} */}
                        </View>

                    </View>

                <View style={style.row3}>
                    {amount > 0 
                    ? <RoundButton label={language.labelAddToCard} buttonStyle={[style.productButton, {backgroundColor: theme.highlightColor}]} onPress={onClickAddToCart}/>
                    : <RoundButton label="Sold out" buttonStyle={[style.productButton, {backgroundColor: theme.highlightColor}]} disable={true}/>
                }
                    <RoundButton label={language.labelBuyNow} buttonStyle={[style.productButton, {backgroundColor: theme.highlightColor}]} onPress={checkout}/>
                </View>
                </ScrollView>
                <CommonModal 
                    isOpen={open}
                    hideModal={closeModal}
                    submit={checkout}
                />
            </View>
    )
};

export default connect(({ dispatch}) => ({ dispatch }))(ProductDetails);

interface Style {
    mainContainer: ViewStyle;
    row1: ViewStyle;
    row2: ViewStyle;
    newItem: ViewStyle;
    carouselRow: TextStyle;
    row2_Child: ViewStyle;
    productName: TextStyle;
    productPrice: TextStyle;
    productColorRow: ViewStyle;
    productColor: ViewStyle;
    productSizesRow: ViewStyle;
    productSize: ViewStyle;
    row3: ViewStyle;
    productButton: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
    mainContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    newItem: {
        marginLeft: 6,
        marginRight: 6,
        width: 150,
        height: 120,
        borderRadius: 15
    },
    row1: {
        flex: 4,
        zIndex: -1,
        paddingTop: 50,
    },
    row2: {
        flex: 3,
        bottom: 5
    },
    carouselRow: {
        width: screenWidth,
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
    },
    row2_Child: {
        marginLeft: 12,
        marginRight: 12,
        overflow: 'hidden',
    },
    productName: {
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 2,
    },
    productPrice: {
        fontSize: 18,
        paddingTop: 2,
        paddingBottom: 12,
    },
    productColorRow: {
        flexDirection: 'row',
    },
    productColor: {
        height: 20,
        width: 20,
        borderRadius: 50,
        marginRight: 15,
        marginBottom: 20,

    },
    productSizesRow: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    productSize: {
        padding: 8,
        marginTop: 10,
        borderWidth: 1,
        marginRight: 15,
        minWidth: 80,
        textAlign: 'center',
    },
    row3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        position: 'absolute',
        bottom: 1,
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    productButton: {
        paddingLeft: 10,
        paddingRight: 10,
        minWidth: 140,
    }
});
