import axios from "axios";
import { CartType, userType } from "../../config/DefaultConfig";

const server = 'http://192.168.1.2:3000';

const getAllProducts = async () => {
    const res = await axios.get(`${server}/api/products`)
    const data = res.data;
    return data;
}

const getAllCategory = async () => {
    const res = await axios.get(`${server}/api/categories`)
    const data = res.data;
    console.log(data);
    return data;
}


const getProductsByID = async (id: number) => {
    const res = await axios.get(`${server}/api/products/${id}`)
    const data = res.data;
    console.log(data);
    return data;
}

const createNewOrder = async (user: userType, address: string, cart: CartType[], price_total: number) => {
    const res = await axios.post(`${server}/api/create-order`, {data: { user: user , address: address, cart: cart, total: price_total } })
    const data = res.data;
    console.log(data);
    return data;
}



export {
    getAllProducts,
    getAllCategory,
    getProductsByID,
    createNewOrder,
}