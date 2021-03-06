import React from 'react';
import { RouteComponentProps } from 'react-router-native';
import { View, ViewStyle, StyleSheet, ScrollView } from 'react-native';
import { AppConstants, AppTheme } from '../../config/DefaultConfig';
import useConstants from '../../hooks/useConstants';
import RoundButton from '../../components/Base/RoundButton';
import useTheme from "../../hooks/useTheme";

interface Props extends RouteComponentProps {
    data: any[],
}

// const typeList = ["Headphone", "Chargers", "Phone Cases"]

const CategoryList: React.FunctionComponent<Props> = ({
    data
}: Props) => {
    const constants: AppConstants = useConstants();
    const theme: AppTheme = useTheme();

    return (
        <View style={style.container}>
            <ScrollView style={style.typeList} horizontal={true} showsHorizontalScrollIndicator={false}>
                {data.map((res, index) => {
                    return <RoundButton key={index} buttonStyle={[style.typeListTab, { backgroundColor: theme.appColor, borderColor: theme.appColor }]} labelStyle={{ fontSize: 17, color: theme.highlightTextColor }} label={res.name} onPress={() => {alert(res)}} />
                })}
            </ScrollView>
        </View>
    )
};

export default CategoryList;

interface Style {
    container: ViewStyle;
    typeList: ViewStyle;
    typeListTab: ViewStyle;
}

const style: Style = StyleSheet.create<Style>({
 
    container: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },
    typeList: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    typeListTab: {
        minWidth: 120,
        marginRight: 20,
    }
});
