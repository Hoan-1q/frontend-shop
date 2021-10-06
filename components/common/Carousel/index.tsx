import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import Carousel, { AdditionalParallaxProps, ParallaxImage } from 'react-native-snap-carousel';

var width = Dimensions.get('window').width; //full width

interface Props {
    data: any
};


const { width: screenWidth } = Dimensions.get('window')

const CarouselComponent: React.FunctionComponent<Props> = ({
    data
}) => {
    const [entries, setEntries] = React.useState([]);
    const carouselRef = React.useRef(null);

    React.useEffect(() => {
        console.log(data);
        setEntries(data);
      }, []);


    const renderItem =  (item: {item: any, index: number}, parallaxProps?: AdditionalParallaxProps | undefined ) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: `http://192.168.1.2:3000/${item.item}` }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    }
    
    return (
        <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    )
};

export default CarouselComponent;


const styles = StyleSheet.create({
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
  })