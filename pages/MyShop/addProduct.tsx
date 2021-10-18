import React from 'react';
import { RouteComponentProps } from 'react-router-native';
import { Dispatch } from 'redux';
import { View, ViewStyle, StyleSheet, TextStyle, TextInput, TouchableOpacity, ScrollView, Image, Button, ImageStyle, SafeAreaView, Platform } from 'react-native';
import { AppTheme, AppConstants } from '../../config/DefaultConfig';
import ThemedText from '../../components/UI/ThemedText';
import useConstants from '../../hooks/useConstants';
import RoundButton from '../../components/Base/RoundButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import { AppLanguage } from '../../config/languages';
import useLanguage from '../../hooks/useLanguage';
import { Formik } from 'formik';
import { editProfile, serverIP } from '../../store/api/users';
import { launchImageLibrary } from 'react-native-image-picker';
import { pushImage, pushProductImage, removeImage, resetProduct, setAvatarPro, setProductAction, setUserAction } from '../../store/reducers/config';
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { createProduct, getProductsByID } from '../../store/api/products';

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    location: any,
    history
}

// @ts-ignore
const AddProduct: React.FunctionComponent<Props> = ({
    dispatch,
    location,
    history
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();
    const language: AppLanguage = useLanguage();

    const [photo, setPhoto] = React.useState(null) as any;
    const [img, setImg] = React.useState(null) as any;
    const [avatar, setAvatar] = React.useState('') as any;

    React.useEffect(() => {
        const { id } = location.state
        dispatch(resetProduct());
        async function fetchMyAPI() {
            if (id) {
                const data = await getProductsByID(id);
                // setDataProduct(data[0]);
                dispatch(setProductAction(data));
            }
        }

        fetchMyAPI()
    }, [])


    const backButton = () => {
        history.push('/myShop')
    }

    const createFormData = (photo, body = {}) => {
        const data = new FormData();

        data.append('photo', {
            name: photo.assets[0].fileName,
            type: photo.assets[0].type,
            uri: photo.assets[0].uri,
        });

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });

        return data;
    };

    const handleChoosePhoto = async () => {
        launchImageLibrary({ noData: true }, async (response) => {
            if (response) {
                console.log(response);
                setPhoto((response));
                const res = await axios.post(
                    `${serverIP}/api/app-upload`,
                    createFormData(photo),
                );
                console.log(res.data);
                dispatch(setAvatarPro(res.data));
            }
        });
    };

    const submitButton = async (values: { title: string, content: string, category_id: string, sumary: string, amount: string, price: string }) => {
        const { title, content, category_id, sumary, amount, price } = values;
        const { proImages, avatarProADD } = constants;
        const { id } = constants.user;
        await createProduct(title, content, category_id, sumary, amount, price, avatarProADD, proImages, id);
        history.push('/myShop')
    }

    const onCloseAvatar = () => {
        setPhoto(null);
    }



    const onAddImages = () => {
        launchImageLibrary({ noData: true }, async (response) => {
            if (response) {
                dispatch(pushImage(response.assets[0].uri));
                setImg(response)
                const res = await axios.post(
                    `${serverIP}/api/app-upload`,
                    createFormData(img),
                );
                dispatch(pushProductImage(res.data));
            }
        });
    }

    const onCloseImages = (image) => {
        dispatch(removeImage(image))
    }

    const { title, content, amount, price, sumary, category_id } = constants.product

    return (
        <>
            <TouchableOpacity onPress={backButton}>
                <MaterialIcon name="arrow-left" size={30} color={theme.textColor} style={style.backIcon} />
            </TouchableOpacity>
            <ScrollView style={style.mainContainer}>
                <Formik
                    initialValues={{ title: title, content: content, category_id: category_id, sumary: sumary, amount: amount, price: price }}
                    onSubmit={values => submitButton(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={style.container}>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">Avatar</ThemedText>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {photo && (
                                    <>
                                        <Image
                                            source={{ uri: photo.assets[0].uri }}
                                            style={style.image}
                                        />
                                        <MaterialIcon onPress={onCloseAvatar} name="close" size={30} style={style.close_Image} />
                                    </>
                                )}
                                <Button title="Choose Photo" onPress={handleChoosePhoto} />
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">Images</ThemedText>
                            </View>
                            <View style={{ flex: 1, display: 'flex' }}>
                                {constants.images.length > 0 && constants.images.map((img, index) => (
                                    <View key={index} >
                                        <Image
                                            source={{ uri: img }}
                                            style={style.images_item}
                                        />
                                        <MaterialIcon onPress={() => onCloseImages(img)} name="close" size={30} style={style.close_Image} />
                                    </View>
                                ))}
                                <TouchableOpacity onPress={onAddImages}>
                                    <View style={style.addImages}>
                                        <MaterialIcon name="plus" size={30} style={style.addIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">Title product</ThemedText>
                            </View>
                            <View style={style.childContainer}>
                                <TextInput
                                    style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor }]}
                                    placeholderTextColor={theme.lightTextColor}
                                    placeholder='Title product'
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                />
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">Category</ThemedText>
                            </View>
                            <View>
                                <Picker
                                    selectedValue={values.category_id}
                                    style={{ height: 50, width: 350 }}
                                    onValueChange={(itemValue) => handleChange('category_id')(itemValue)}
                                >
                                    {constants.categories.map((category, index) => (
                                        <Picker.Item label={category.name} value={`${category.id}`} />
                                    ))}
                                </Picker>
                            </View>

                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">Content</ThemedText>
                            </View>
                            <View style={style.childContainer}>
                                <TextInput
                                    style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor }]}
                                    placeholderTextColor={theme.lightTextColor}
                                    placeholder="Content"
                                    value={values.content}
                                    onBlur={handleBlur('content')}
                                    onChangeText={handleChange('content')}
                                />
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">Sumary</ThemedText>
                            </View>
                            <View style={style.childContainer}>
                                <TextInput
                                    style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor }]}
                                    placeholderTextColor={theme.lightTextColor}
                                    placeholder='Sumary'
                                    value={values.sumary}
                                    onBlur={handleBlur('sumary')}
                                    onChangeText={handleChange('sumary')}
                                />
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">Price</ThemedText>
                            </View>
                            <View style={style.childContainer}>
                                <TextInput
                                    style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor }]}
                                    placeholderTextColor={theme.lightTextColor}
                                    placeholder='Price'
                                    value={values.price}
                                    onBlur={handleBlur('price')}
                                    onChangeText={handleChange('price')}
                                />
                            </View>
                            <View style={style.childContainer}>
                                <ThemedText style={style.inputLabel} styleKey="inputColor">Amount</ThemedText>
                            </View>
                            <View style={style.childContainer}>
                                <TextInput
                                    style={[style.inputContainer, { borderBottomColor: theme.inputBorderColor, color: theme.textColor }]}
                                    placeholderTextColor={theme.lightTextColor}
                                    placeholder='Amount'
                                    value={values.amount}
                                    onBlur={handleBlur('amount')}
                                    onChangeText={handleChange('amount')}
                                />
                            </View>
                            {/* <View style={style.childContainer}>
                                <ThemedText style={style.forgotPassword} styleKey="textColor" onPress={goToLogin}>{language.labelCheckAcc}</ThemedText>
                            </View> */}
                            <RoundButton label={language.labelSubmit} buttonStyle={{ minWidth: 230 }} onPress={handleSubmit} />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </>
    )
};

export default connect(({ dispatch }) => ({ dispatch }))(AddProduct);

interface Style {
    images_item: ImageStyle,
    mainContainer: ViewStyle,
    addImages: ViewStyle,
    container: ViewStyle;
    close_Image: ViewStyle;
    topContainer: ViewStyle;
    childContainer: ViewStyle;
    bottomContainer: ViewStyle;
    inputContainer: TextStyle;
    inputLabel: TextStyle;
    forgotPassword: TextStyle;
    title: TextStyle;
    Icon: TextStyle;
    leftContainer: ViewStyle;
    iconContainer: ViewStyle;
    containerBg: ViewStyle;
    containerImage: ViewStyle;
    backIcon: ViewStyle;
    imageStyle: ImageStyle;
    image: ImageStyle;
    addIcon: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
    addIcon: {
        top: 35,
        left: 35,
    },
    images_item: {
        width: 100,
        height: 100,
    },
    addImages: {
        width: 100,
        height: 100,
        color: 'black',
        borderWidth: 2,
        borderStyle: 'dashed',
    },
    close_Image: {
        top: 5,
        right: 5,
        position: 'absolute',
    },
    image: {
        width: 200,
        height: 200,
        position: 'relative',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    leftContainer: {
        alignItems: "flex-start",
        flex: 0,
    },
    imageStyle: {
        width: 100,
        height: 100,
    },
    container: {
        flex: 1,
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 16,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 50,
        marginBottom: 40,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
    },
    inputLabel: {
        width: "100%",
        fontSize: 13
    },
    childContainer: {
        flexDirection: 'row',
        justifyContent: "center",
    },
    forgotPassword: {
        marginTop: 30,
        marginBottom: 15,
        fontSize: 16,
    },
    inputContainer: {
        height: 40,
        marginTop: 10,
        width: "100%",
        marginBottom: 10,
        borderBottomWidth: 2,
        fontSize: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
    },
    iconContainer: {
        borderRadius: 6,
        margin: 12,
        minWidth: 50,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
    },
    Icon: {
        fontSize: 25,
        padding: 15,
        justifyContent: "center",
    },
    backIcon: {
        fontSize: 25,
        paddingTop: 20,
        paddingLeft: 25,
    }
});
