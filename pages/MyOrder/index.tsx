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
import { deleteProductsByID, getAllMyOrder, getAllProducts } from '../../store/api/products';
import { setMyOrder, setProductsByShop } from '../../store/reducers/config';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    history
}

const MyOrder: React.FunctionComponent<Props> = ({
    dispatch,
    history,
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();

    const [productUser, setProductUser] = React.useState([]) as any;

    const backButton = () => {
        history.push('/profile')
    }

    React.useEffect(() => {
        const { id } = constants.user;
        async function fetchMyAPI() {
            const res = await getAllMyOrder(id);
            console.log(res);
            dispatch(setMyOrder(res))
        }

        fetchMyAPI()
    }, [])

    console.log(constants.myOrder);

    return (
        <>
            <View style={[style.contentContainer, { borderColor: theme.lightTextColor }]}>
                <View style={style.container}>
                    <View style={[style.childContainer, style.leftContainer]}>
                        <TouchableOpacity onPress={backButton}>
                            <MaterialIcon name="arrow-left" size={30} color={theme.textColor} style={style.backIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                {constants.myOrder.map((order: any) => (
                    <View style={style.container}>
                        <View >
                            <ThemedText styleKey="textColor" style={style.content}>{order.product_name}</ThemedText>
                            <ThemedText styleKey="textColor" style={style.price}>{`${order.product_price}VND`}</ThemedText>
                        </View>
                        <View style={[style.childContainer, style.leftContainer]}>
                            {order.payment_status === 0 && <ThemedText styleKey="textColor" style={style.content}>Đang xử lý</ThemedText>}
                            <ThemedText styleKey="textColor" style={style.content}>{order.quantity}</ThemedText>
                        </View>
                    </View>
                ))}

            </View>
        </>
    );
};

export default connect(({ dispatch }) => ({ dispatch }))(MyOrder);

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
        paddingRight: 15,
        paddingTop: 15,
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
