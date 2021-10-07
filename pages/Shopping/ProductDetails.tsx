import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-native';
import { Dispatch } from 'redux';
import { View, ViewStyle, StyleSheet, TextStyle, ImageBackground, Text, Dimensions, TouchableOpacity, Image, ScrollView, Platform, ImageStyle } from 'react-native';
import { AppConstants, AppTheme, productsType } from '../../config/DefaultConfig';
import useConstants from '../../hooks/useConstants';
import RoundButton from '../../components/Base/RoundButton';
import useTheme from "../../hooks/useTheme";
import CarouselComponent from '../../components/common/Carousel';
import BackButton from '../../components/common/BackButton';
import CommonModal from '../../components/Modal/CommonModal';
import Svg, { Rect } from 'react-native-svg';
import ContentLoader from 'react-native-masked-loader';
import { AppLanguage } from '../../config/languages';
import useLanguage from '../../hooks/useLanguage';
import { getProductsByID } from '../../store/api/products';
import { connect } from 'react-redux';
import { pushDataToCarts, setProductAction } from '../../store/reducers/config';
import Carousel, { AdditionalParallaxProps, ParallaxImage } from 'react-native-snap-carousel';

var screenWidth = Dimensions.get('window').width; //full width

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history: any,
    location: any,
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
    // const [dataProduct, setDataProduct] = useState({}) as any;
    const [quatity, setQuatity] = useState(1);
    const [loading, setLoading] = useState(true);
    const carouselRef = React.useRef(null);

    React.useEffect(() => {
        const { id } = location.state
        console.log(id);
        async function fetchMyAPI() {
            const data = await getProductsByID(id);
            // setDataProduct(data[0]);
            dispatch(setProductAction(data));
        }

        fetchMyAPI()
        setLoading(false);
    }, [])

    const backButton = () => {
        history.push('/shopping/')
    }

    const checkout = () => {
        history.push('/checkout/')
    }

    const onClickAddToCart = () => {
        const { id } = location.state
        const { price, title, avatar } = constants.product as any
        dispatch(pushDataToCarts({
            id,
            title,
            price,
            avatar,
            quatity,
        }))
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    function getMaskedElement() {
        return (
            <Svg height={250} width="100%" fill={'black'}>
                <Rect x="0" y="0" rx="8" ry="8" width="50%" height="16" />
                <Rect x="0" y="30" rx="9" ry="9" width="100%" height="128" />
                <Rect x="0" y="172" rx="4" ry="4" width="100%" height="8" />
                <Rect x="0" y="188" rx="4" ry="4" width="100%" height="8" />
                <Rect x="0" y="204" rx="4" ry="4" width="100%" height="8" />
            </Svg>
        );
    }

    const renderItem = (item: { item: any, index: number }, parallaxProps?: AdditionalParallaxProps | undefined) => {
        return (
            <View style={style.item}>
                <ParallaxImage
                    source={{ uri: `http://192.168.1.2:3000/${item.item}` }}
                    containerStyle={style.imageContainer}
                    style={style.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    }



    const { price, amount, content, title, images } = constants.product as any

    const MaskedElement = getMaskedElement();

    // const imagesArray = images.split(",");



    return (
        <View style={style.mainContainer}>
            {!loading && (
                <>
                    <BackButton onPress={backButton} />
                    <ScrollView>
                        <View style={style.row1}>
                            {/* <Image style={[style.newItem]} source={ImagePath} /> */}
                            <Carousel
                                ref={carouselRef}
                                sliderWidth={screenWidth}
                                sliderHeight={screenWidth}
                                itemWidth={screenWidth - 60}
                                data={images}
                                renderItem={renderItem}
                                hasParallaxImages={true}
                            />
                        </View>

                        <View style={style.row2}>
                            <View style={style.row2_Child}>
                                <Text style={style.productName}>{title}</Text>
                                <Text style={style.productPrice}>{price} VND</Text>
                                <Text style={style.content}>{content}</Text>
                                {/* {selectColors(productData.color)} */}
                                {/* {selectSizes(productData.size)} */}
                            </View>

                        </View>

                        <View style={style.row3}>
                            {amount > 0
                                ? <RoundButton label={language.labelAddToCard} buttonStyle={[style.productButton, { backgroundColor: theme.highlightColor }]} onPress={onClickAddToCart} />
                                : <RoundButton label="Sold out" buttonStyle={[style.productButton, { backgroundColor: theme.highlightColor }]} disable={true} />
                            }
                            <RoundButton label={language.labelBuyNow} buttonStyle={[style.productButton, { backgroundColor: theme.highlightColor }]} onPress={checkout} />
                        </View>
                    </ScrollView>
                    <CommonModal
                        isOpen={open}
                        hideModal={closeModal}
                        submit={checkout}
                    />
                </>
            )
            }

        </View>
    )
};

export default connect(({ dispatch }) => ({ dispatch }))(ProductDetails);

interface Style {
    mainContainer: ViewStyle;
    row1: ViewStyle;
    row2: ViewStyle;
    item: ViewStyle;
    imageContainer: ViewStyle;
    image: ImageStyle;
    content: TextStyle;
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
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
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
    content: {
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 2,
    },
    productName: {
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 2,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 18,
        paddingTop: 2,
        paddingBottom: 12,
        color: 'red',
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
