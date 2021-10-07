import axios from "axios";

const server = 'http://192.168.1.2:3000';

const login = async (username: string, password: string) => {
    const res = await axios.post(`${server}/api/login`,  { data: {username, password} })
    if (res.status === 404) {
        alert('login fail')
        return
    }
    return(res.data);
}

const register = async (name: string, username: string, password: string,phone: string, email: string) => {
    const res = await axios.post(`${server}/api/register`, {data : {name: name, username: username, password:password, phone: phone, email: email}})
    const data = res.data;
    return(data);
}

const editProfile = async (name: string, password: string, email: string, address: string, id: number) => {
    const res = await axios.post(`${server}/api/edit-user`, { data: {name: name, password:password, address: address, email: email, id: id}})
    if (res.status === 200) {
        alert('updated profile');
    } else alert('upadte fail');
}

export {
    login,
    register,
    editProfile,
}