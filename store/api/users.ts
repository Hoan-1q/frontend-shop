const server = 'http://192.168.1.2:3000';

const login = async (username: string, password: string) => {
    const res = await fetch(`${server}/api/login`, {
      method: 'POST', // or 'PUT'
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password}),
      })
    if (res.status === 404) {
        alert('login fail')
        return
    }
    const data = await res.json();
    return(data);
}

const register = async (name: string, username: string, password: string,phone: string, email: string) => {
    const res = await fetch(`${server}/api/register`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({name: name, username: username, password:password, phone: phone, email: email})
    })
    const data = await res.json();
    return(data);
}

const editProfile = async (name: string, password: string, email: string, address: string, id: number) => {
    console.log(name, password, email, address);
    const res = await fetch(`${server}/api/edit-user`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({name: name, password:password, address: address, email: email, id: id})
    })
    if (res.status === 200) {
        alert('updated profile');
    } else alert('upadte fail');
}

export {
    login,
    register,
    editProfile,
}