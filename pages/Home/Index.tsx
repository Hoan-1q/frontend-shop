import React from 'react';
import { RouteComponentProps } from 'react-router-native';
import { Dispatch } from 'redux';
import { View, ViewStyle, StyleSheet, TextStyle, ImageBackground, Text, ImageStyle, Dimensions } from 'react-native';
import { AppConstants, AppTheme } from '../../config/DefaultConfig';
import useConstants from '../../hooks/useConstants';
import RoundButton from '../../components/Base/RoundButton';
import FooterNavigation from '../Footer/Index';
import useTheme from "../../hooks/useTheme";
import HomePageProducts from './HomePageProducts';
import { AppLanguage } from '../../config/languages';
import useLanguage from '../../hooks/useLanguage';
import Carousel, { AdditionalParallaxProps, ParallaxImage } from 'react-native-snap-carousel';
import { serverIP } from '../../store/api/users';
import { connect } from 'react-redux';
import { setNews } from '../../store/reducers/config';

var screenWidth = Dimensions.get('window').width; //full width
var screenHeight = Dimensions.get('window').height; //full width


interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history
}

// @ts-ignore
const ImagePath = require("../../images/shopping.jpg")

const Home: React.FunctionComponent<Props> = ({
    dispatch,
    history
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();
    const language: AppLanguage = useLanguage();

    const carouselRef = React.useRef(null);

    React.useEffect(() => {
        
    })


    const gotoProducts = () => {
        history.push('/shopping')
    }

    const renderItem = (item: { item: any, index: number }, parallaxProps?: AdditionalParallaxProps | undefined) => {
        return (
            <View style={style.item}>
                <ParallaxImage
                    source={{ uri: `${serverIP}/${item.item}` }}
                    containerStyle={style.imageContainer}
                    style={style.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    }

    const { news } = constants;

    return (
        <View style={style.mainContainer}>
            {/* <View style={style.fistView}>
                <ImageBackground source={ImagePath} style={{ width: '100%', height: '100%' }} >
                    <View style={style.fistViewContent}>
                        <Text style={[style.fistViewText, { color: theme.labelBgColor }]}>{constants.homePage.labelFashion}</Text>
                        <Text style={[style.fistViewText, { color: theme.labelBgColor }]}>{constants.homePage.labelSave}</Text>
                        <RoundButton buttonStyle={[style.fistViewButton, { backgroundColor: theme.dangerColor, borderColor: theme.dangerColor }]} labelStyle={{ fontSize: 17, color: theme.labelBgColor }} label={language.labelCheck} onPress={gotoProducts} />
                    </View>
                </ImageBackground>
            </View> */}
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={news}
                autoplayInterval={2000}
                autoplay={true}
                loop={true}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
            {/* <HomePageProducts history={history} /> */}
            <FooterNavigation history={history} />
        </View>
    )
};

export default connect(({ dispatch }) => ({ dispatch }))(Home);

interface Style {
    mainContainer: ViewStyle;
    fistView: ViewStyle;
    fistViewButton: ViewStyle;
    fistViewText: TextStyle;
    fistViewContent: ViewStyle;
    item: ViewStyle;
    imageContainer: ImageStyle;
    image: ImageStyle;
}

const style: Style = StyleSheet.create<Style>({
    item: {
        width: screenWidth - 60,
        height: screenHeight - 60,
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
        padding: 0,
        margin: 0,
        flex: 1,
    },
    fistView: {
        flex: 3,
        height: '100%',
    },
    fistViewText: {
        fontSize: 35,
        fontWeight: '900',
    },
    fistViewButton: {
        maxWidth: 180,
        textAlign: 'center',
        minWidth: 230,
    },
    fistViewContent: {
        position: 'absolute',
        bottom: 30,
        left: 20,
    },
});
