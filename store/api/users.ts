import axios from "axios";

const serverIP = 'http://192.168.1.5:3000';

const login = async (username: string, password: string) => {
    const res = await axios.post(`${serverIP}/api/login`,  { data: {username, password} })
    if (res.status === 404) {
        alert('login fail')
        return
    }
    return(res.data);
}

const register = async (name: string, username: string, password: string,phone: string, email: string) => {
    const res = await axios.post(`${serverIP}/api/register`, {data : {name: name, username: username, password:password, phone: phone, email: email}})
    const data = res.data;
    return(data);
}

const editProfile = async (name: string, password: string, email: string, address: string, id: number) => {
    const res = await axios.put(`${serverIP}/api/edit-user`, { data: {name: name, password:password, address: address, email: email, id: id}})
    if (res.status === 200) {
        alert('updated profile');
    } else alert('upadte fail');
}
// const editProfile = async (name: string, password: string, email: string, address: string, id: number) => {
//     const res = await fetch(`${serverIP}/api/edit-user`, {
//         method: 'PUT', // or 'PUT'
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({data: {name: name, password:password, address: address, email: email, id: id}}),
//       })
//     if (res.status === 200) {
//         alert('updated profile');
//     } else alert('upadte fail');
// }

export {
    serverIP,
    login,
    register,
    editProfile,
}