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
  favorite: boolean,
  category_id: number,
}
export interface productType {
  id: number,
  avatar: string,
  price: string,
  title: string,
  amount: string,
  sumary: string,
  content: string,
  images: [],
  category_id: string,
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
    news: [],
    products: productsType[],
    productsByShop: productsType[],
    product: productType,
    categories: CategoryType[],
    recraftLogo: string,
    homePage: HomePageType,
    address: string,
    favorite: [],
    myOrder: [],
    images:[],
    avatarProADD:'',
    proImages:[],
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
      myOrder: [],
      avatarProADD: '',
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
      productsByShop: [],
      favorite: [],
      proImages: [],
      product: {
        id: 0,
        avatar: '',
        price: '',
        title: '',
        amount: '',
        sumary: '',
        content: '',
        images:[],
        category_id: '',
      },
      news: [],
      carts: [],
      categories: [],
      images: [],
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
