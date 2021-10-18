import axios from "axios";
import { CartType, userType } from "../../config/DefaultConfig";
import { serverIP } from "./users";

const getAllProducts = async () => {
    const res = await axios.get(`${serverIP}/api/products`)
    const data = res.data;
    return data;
}

const getAllCategory = async () => {
    const res = await axios.get(`${serverIP}/api/categories`)
    const data = res.data;
    console.log(data);
    return data;
}

const getAllMyOrder = async (id) => {
    const res = await axios.get(`${serverIP}/api/orders/${id}`)
    const data = res.data;
    return data;
}

const getProductsByID = async (id: number) => {
    const res = await axios.get(`${serverIP}/api/products/${id}`)
    const data = res.data;
    console.log(data);
    return data;
}

const deleteProductsByID = async (id: number) => {
    const res = await axios.delete(`${serverIP}/api/products/${id}`)
    const data = res.data;
    console.log(data);
    return data;
}

const createProduct = async (title: string, content: string, category_id: string, sumary: string, amount: string, price: string, avatarProADD: string, proImages:[], id: number) => {
    console.log(title, content, category_id, sumary, amount, price, avatarProADD, proImages);
    const res = await axios.post(`${serverIP}/api/add-product`, {data: { title: title, avatar: avatarProADD, images: proImages, price: price, amount: amount, sumary: sumary, content: content, category: category_id, userID: id }})
    const data = res.data;
    console.log(data);
    return data;
}

const createNewOrder = async (user: userType, address: string, cart: CartType[], price_total: number) => {
    const res = await axios.post(`${serverIP}/api/create-order`, {data: { user: user , address: address, cart: cart, total: price_total } })
    const data = res.data;
    console.log(data);
    return data;
}



export {
    getAllProducts,
    getAllCategory,
    getProductsByID,
    createNewOrder,
    createProduct,
    deleteProductsByID,
    getAllMyOrder,
}