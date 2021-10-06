const server = 'http://192.168.1.2:3000';

const getAllProducts = async () => {
    const res = await fetch(`${server}/api/products`)
    const data = await res.json();
    return data;
}

const getAllCategory = async () => {
    const res = await fetch(`${server}/api/categories`)
    const data = await res.json();
    console.log(data);
    return data;
}


const getProductsByID = async (id: number) => {
    const res = await fetch(`${server}/api/products/${id}`)
    const data = await res.json();
    return data;
}


export {
    getAllProducts,
    getAllCategory,
    getProductsByID,
}