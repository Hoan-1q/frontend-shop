import { ThemeKey } from "./themes";
import { LanguageKey } from "./languages";

export interface AppTheme {
  backgroundColor: string,
  highlightColor: string,
  highlightTextColor: string,
  buyButtonLink: string,
  textColor: string,
  lightTextColor: string,
  lightBottomColor: string,
  alternateMessageBackgroundColor: string,
  labelBgColor: string,
  activeColor: string,
  dangerColor: string,
  appColor: string,
  facebookColor: string,
  googleColor: string,
  inputColor: string,
  inputBorderColor: string,
}

export interface HomePageType {
  productLabel: string,
  labelViewAll: string,
  labelFashion: string,
  labelSave: string,
}

export interface advertisementType {
    label1: string,
    label2: string,
    labelBuy: string,
}

export interface userType {
  id: number,
  name: string,
  username: string,
  password: string,
  phone: string,
  address: string,
  email: string,
  avatar: string,
}

export interface productsType {
  id: number,
  avatar: string,
  price: number,
  title: string,
  category_id: number,
}
export interface productType {
  id: number,
  avatar: string,
  price: number,
  title: string,
  amount: string,
  content: string,
  images: [],
  category_id: number,
}

export interface CartType {
  id: number,
  title: string,
  avatar: string,
  price: number,
  quantity: number,
}


export interface CategoryType {
  id: number,
  name: string,
}


export interface AppConstants {
    selectedTheme: ThemeKey,
    selectedLanguage: LanguageKey,
    title: string,
    user: userType,
    carts: CartType[],
    products: productsType[],
    product: productType,
    categories: CategoryType[],
    recraftLogo: string,
    homePage: HomePageType,
    address: string,
    advertisement: advertisementType,
}

export interface ApplicationConfig {
    constants?: AppConstants
}

// @ts-ignore
const Logo = require("../images/recraftshoping-app-logo2.png")

export const defaultConfig: ApplicationConfig = {
    constants: {
      selectedTheme: ThemeKey.light,
      selectedLanguage: LanguageKey.en,
      title: "RecraftShoppify",
      recraftLogo: Logo,
      address: '',
      user: {
        id: 0,
        name: '',
        username: '',
        password: '',
        phone: '',
        address: '',
        email: '',
        avatar: '',
      },
      products: [],
      product: {
        id: 0,
        avatar: '',
        price: 0,
        title: '',
        amount: '',
        content: '',
        images:[],
        category_id: 0,
      },
      carts: [],
      categories: [],
      homePage: {
        productLabel: "NEW",
        labelViewAll: "View All",
        labelFashion: "FASHION",
        labelSave: "SALE",
      },
      advertisement: {
        label1: "SHOP",
        label2: "NOW",
        labelBuy: "BUY",
      },
    },
}
