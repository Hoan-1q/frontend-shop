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
    SET_NEW="SET_NEW",
    PUSH_IMAGES = "PUSH_IMAGES",
    REMOVE_IMAGE = "REMOVE_IMAGE",
    PUSH_PRODUCT_IMAGE = "PUSH_PRODUCT_IMAGE",
    SET_PRODUCTS_BY_SHOP = "SET_PRODUCTS_BY_SHOP",
    PUSH_FAVORITE = "PUSH_FAVORITE",
    REMOVE_FAVORITE = "REMOVE_FAVORITE",
    SET_AVATAR_PRO = "SET_AVATAR_PRO",
    REMOVE_AVATAR_PRO = "REMOVE_AVATAR_PRO",
    SET_MY_ORDER = "SET_MY_ORDER",
    RESET_CART = "RESET_CART",
    RESET_PRODUCT = "RESET_PRODUCT",
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
        RESET_PRODUCT: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    product: {}
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
        SET_PRODUCTS_BY_SHOP: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    productsByShop: action.payload
                },
            }
        },
        SET_NEW: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    news: action.payload
                },
            }
        },
        PUSH_IMAGES: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    images: [...state.constants?.images, action.payload]
                },
            }
        },
        PUSH_FAVORITE: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    favorite: [...state.constants?.favorite, action.payload]
                },
            }
        },
        REMOVE_FAVORITE: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    favorite: state.constants?.favorite.filter(item => item !== action.payload)
                },
            }
        },
        REMOVE_IMAGE: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    images: state.constants?.images.filter(item => item !== action.payload)
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
        PUSH_PRODUCT_IMAGE: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    proImages: [...state.constants?.proImages, action.payload]
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
        RESET_CART: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    carts: [],
                }
            };
        },
        REMOVE_TO_CARTS: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    carts: state.constants?.carts.filter(item => item !== action.payload)
                }
            };
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
        SET_AVATAR_PRO: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    avatarProADD: action.payload
                }
            };
        },
        REMOVE_AVATAR_PRO: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    avatarProADD: ''
                }
            };
        },
        SET_MY_ORDER: (state, action) => {
            return {
                ...state,
                constants: {
                    ...state.constants,
                    myOrder: action.payload
                }
            };
        },
    },
    initState
);

export const setUserAction = createAction("FETCH_USER_SUCCESS");
export const setNews = createAction("SET_NEW");
export const pushDataToCarts = createAction("PUSH_TO_CARTS");
export const remoeCart = createAction("REMOVE_TO_CARTS");
export const setCart = createAction("SET_CART");
export const setAddress = createAction("SET_ADDRESS");
export const setProductsAction = createAction("SET_PRODUCTS");
export const setProductAction = createAction("SET_PRODUCT");
export const setCategoriesAction = createAction("SET_CATEGORIES");
export const setThemeAction = createAction("SET_THEME");
export const setLanguageAction = createAction("SET_LANGUAGE");
export const pushImage = createAction("PUSH_IMAGES");
export const removeImage = createAction("REMOVE_IMAGE");
export const pushProductImage = createAction("PUSH_PRODUCT_IMAGE");
export const setProductsByShop = createAction("SET_PRODUCTS_BY_SHOP");
export const pushFavorite = createAction("PUSH_FAVORITE");
export const removeFavorite = createAction("REMOVE_FAVORITE");
export const setAvatarPro = createAction("SET_AVATAR_PRO");
export const removeAvatarPro = createAction("REMOVE_AVATAR_PRO");
export const setMyOrder = createAction("SET_MY_ORDER");
export const resetCart = createAction("RESET_CART");
export const resetProduct = createAction("RESET_PRODUCT");

export default configReducer;
