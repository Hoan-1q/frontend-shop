import React from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, TouchableOpacity, Image } from 'react-native';
import { AppConstants, AppTheme, productType } from '../../config/DefaultConfig';
import useTheme from "../../hooks/useTheme";
import { Dispatch } from 'redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ThemedText from '../../components/UI/ThemedText';
import { RouteComponentProps } from 'react-router-native';
import { Avatar, Icon } from 'react-native-elements';
import useConstants from '../../hooks/useConstants';
import { serverIP } from '../../store/api/users';
import { deleteProductsByID, getAllProducts } from '../../store/api/products';
import { setProductsByShop } from '../../store/reducers/config';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history
}

const MyShopOrder: React.FunctionComponent<Props> = ({
    dispatch,
    history,
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();

    const [productUser, setProductUser] = React.useState([]) as any;

    const backButton = () => {
        history.push('/profile')
    }

    const onAddProduct = () => {
        history.push({
            pathname: "/addProduct",
            state: {
            id: ''
            }
        })
    }
    const onOrder = () => {
        history.push('/order')
    }

    React.useEffect(() => {
        async function fetchMyAPI() {
            const res = await getAllProducts();
            const array = res as any;
            const proByShop = array.filter((pro) => pro.user_id === constants.user.id);
            dispatch(setProductsByShop(proByShop))
        }

        fetchMyAPI()
    }, [])

    const onDeletePro = async(id) => {
        await deleteProductsByID(id);
        const res = await getAllProducts();
        const array = res as any;
        const proByShop = array.filter((pro) => pro.user_id === constants.user.id);
        dispatch(setProductsByShop(proByShop))
    }

    const onClickProduct = (id) => {
        history.push({
            pathname: "/addProduct",
            state: {
            id: id
            }
        })
    }


    const { name, avatar } = constants.user;
    return (
        <>
            <View style={[style.contentContainer, { borderColor: theme.lightTextColor }]}>
                <View style={style.container}>
                    <View style={[style.childContainer, style.leftContainer]}>
                        <TouchableOpacity onPress={backButton}>
                            <MaterialIcon name="arrow-left" size={30} color={theme.textColor} style={style.backIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={[style.childContainer, style.leftContainer]}>
                        <TouchableOpacity onPress={onOrder}>
                            <MaterialIcon name="order-bool-descending-variant" size={30} color={theme.textColor} style={style.backIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={[style.childContainer, style.leftContainer]}>
                        <TouchableOpacity onPress={onAddProduct}>
                            <MaterialIcon name="plus" size={30} color={theme.textColor} style={style.backIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.container}>
                    <View style={[style.childContainer, style.leftContainer]}>
                        <Avatar
                            rounded
                            source={{
                                uri:
                                    `${serverIP}/${avatar}`,
                            }}
                        />
                    </View>
                    <View style={[style.childContainer, {paddingLeft: 50}]}>
                        <ThemedText styleKey="textColor" style={style.content}>{name}</ThemedText>
                    </View>
                </View>
                <View style={style.container}>
                    {constants.productsByShop.map((pro) => (
                        <>
                        <TouchableOpacity onPress={() => onClickProduct(pro.id)} >
                            <View style={[style.childContainer, style.leftContainer]}>
                                <Image source={{ uri: `${serverIP}/${pro.avatar}` }} style={{ borderRadius: 10, width: 50, height: 50 }} />
                            </View>
                        </TouchableOpacity>
                            <View style={[style.childContainer, { paddingLeft: 50 }]}>
                                <ThemedText styleKey="textColor" style={style.content}>{pro.title}</ThemedText>
                                <ThemedText styleKey="textColor" style={style.price}>{`${pro.price}VND`}</ThemedText>
                            </View>
                            <View style={[style.childContainer, style.leftContainer]}>
                                <MaterialIcon name="delete" size={30} onPress={() => onDeletePro(pro.id)} color={theme.textColor} style={style.backIcon} />
                            </View>
                        </>
                    ))}
                </View>
            </View>
        </>
    );
};

export default connect(({ dispatch }) => ({ dispatch }))(MyShopOrder);

interface Style {
    contentContainer: ViewStyle;
    container: ViewStyle;
    childContainer: ViewStyle;
    leftContainer: ViewStyle;
    rightContainer: ViewStyle;
    icon: ViewStyle;
    content: TextStyle;
    backIcon: ViewStyle;
    price: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
    contentContainer: {
        paddingTop: 10,
        paddingBottom: 30,
        borderBottomWidth: 1,
    },
    container: {
        paddingLeft: 15,
        paddingTop: 20,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    childContainer: {
        flex: 1,
        justifyContent: "center",
    },
    leftContainer: {
        alignItems: "flex-start",
        flex: 0,
    },
    rightContainer: {
        alignItems: "flex-end",
        flex: 0,
    },
    icon: {
        paddingTop: 5,
    },
    content: {
        fontSize: 18,
    },
    price: {
        fontSize: 15,
        color: 'red'
    },
    backIcon: {
        fontSize: 25,
        paddingTop: 20,
        paddingLeft: 25,
    }
});
