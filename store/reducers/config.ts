import { handleActions, createAction } from 'redux-actions';
import { ApplicationConfig, defaultConfig } from '../../config/DefaultConfig';
import { Reducer, ReducerState } from 'react';

enum ThemeActionType {
    SET_THEME = "SET_THEME",
    SET_LANGUAGE = "SET_LANGUAGE",
    FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
    SET_PRODUCTS = "SET_PRODUCTS",
    SET_CATEGORIES = "SET_CATEGORIES",
    PUSH_TO_CARTS = "PUSH_TO_CARTS",
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
        SET_CATEGORIES: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    categories: action.payload
                },
            }
        },
        PUSH_TO_CARTS: (state, action) => {
            const cartsData = state.constants?.carts;
            return {
                ...state,
                constants: {
                    ...state.constants,
                    carts: cartsData.push(action.payload)
                }
            };
        },
        SET_THEME: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    selectedTheme: action.payload
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
export const setProductsAction = createAction("SET_PRODUCTS");
export const setCategoriesAction = createAction("SET_CATEGORIES");
export const setThemeAction = createAction("SET_THEME");
export const setLanguageAction = createAction("SET_LANGUAGE");

export default configReducer;
