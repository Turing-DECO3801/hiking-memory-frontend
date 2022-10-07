import axios from "axios";

const URL = "http://ec2-13-54-55-236.ap-southeast-2.compute.amazonaws.com:8000/";

export const login = (email: string, password: string) => {
    axios.post(`${URL}auth/login`, { email: email, password: password })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export const getHikes = async (email: string, password: string) => {
    let data = {};

    await axios.get(`${URL}hikes`, 
        {
            headers: {
                email: email,
                password: password,
            }
        }
    )
    .then((res) => {
        data = res.data;
    })
    .catch((err) => {
        console.log(err);
    })

    return data;
}

export const getAHike = async (id: number, email: string, password: string) => {
    let data = {};

    await axios.get(`${URL}hikes/${id}/`, 
        {
            headers: {
                email: email,
                password: password,
            }
        }
    )
    .then((res) => {
        data = res.data;
    })
    .catch((err) => {
        console.log(err);
    })

    return data;
}

export const setFavourite = async (value: number, hikeId: number, email: string, password: string) => {
    let data = {};

    await axios.put(`${URL}hikes/${hikeId}/favourite/`, 
        {
            value: value
        },
        {
            headers: {
                email: email,
                password: password,
            }
        }
    )
    .then((res) => {
        data = res.data;
    })
    .catch((err) => {
        console.log(err);
    })

    return data;
}

export const updateMemoNotes = async (value: string, memoId: number, email: string, password: string) => {
    let data = {};

    await axios.post(`${URL}memos/${memoId}/notes`, 
        {
            value: value
        },
        {
            headers: {
                email: email,
                password: password,
            }
        }
    )
    .then((res) => {
        data = res.data;
    })
    .catch((err) => {
        console.log(err);
    })

    return data;
}