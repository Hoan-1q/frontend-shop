import { handleActions, createAction } from 'redux-actions';
import { ApplicationConfig, defaultConfig } from '../../config/DefaultConfig';
import { Reducer, ReducerState } from 'react';

enum ThemeActionType {
    SET_THEME = "SET_THEME",
    SET_LANGUAGE = "SET_LANGUAGE",
    FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
    SET_PRODUCTS = "SET_PRODUCTS",
    SET_PRODUCT = "SET_PRODUCT",
    SET_ADDRESS = "SET_ADDRESS",
    SET_CATEGORIES = "SET_CATEGORIES",
    PUSH_TO_CARTS = "PUSH_TO_CARTS",
    SET_CART = "SET_CART",
    REMOVE_TO_CARTS = "REMOVE_TO_CARTS",
}

interface ThemeAction {
    type: ThemeActionType,
    payload: any,
}


type ConfigReducerType = Reducer<ApplicationConfig, ThemeAction>

const initState: ReducerState<ConfigReducerType> = defaultConfig;


const configReducer: ConfigReducerType = handleActions(
    {
        FETCH_USER_SUCCESS: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    user: action.payload
                },
            }
        },
        SET_PRODUCTS: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    products: action.payload
                },
            }
        },
        SET_PRODUCT: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    product: action.payload
                },
            }
        },
        SET_CATEGORIES: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    categories: action.payload
                },
            }
        },
        SET_ADDRESS: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    address: action.payload,
                },
            }
        },
        PUSH_TO_CARTS: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    carts: state.constants?.carts.concat(action.payload)
                }
            };
        },
        SET_CARTS: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    carts: action.payload,
                }
            };
        },
        REMOVE_TO_CARTS: (state, action) => {
            state.constants?.carts.splice(action, 1);
        },
        SET_THEME: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    selectedTheme: action.payload,
                }
            };
        },
        SET_LANGUAGE: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    selectedLanguage: action.payload
                }
            };
        },
    },
    initState
);

export const setUserAction = createAction("FETCH_USER_SUCCESS");
export const pushDataToCarts = createAction("PUSH_TO_CARTS");
export const remoeCart = createAction("REMOVE_TO_CARTS");
export const setCart = createAction("SET_CART");
export const setAddress = createAction("SET_ADDRESS");
export const setProductsAction = createAction("SET_PRODUCTS");
export const setProductAction = createAction("SET_PRODUCT");
export const setCategoriesAction = createAction("SET_CATEGORIES");
export const setThemeAction = createAction("SET_THEME");
export const setLanguageAction = createAction("SET_LANGUAGE");

export default configReducer;
