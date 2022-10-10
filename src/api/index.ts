import axios from "axios";

const URL = "http://ec2-13-54-55-236.ap-southeast-2.compute.amazonaws.com:8000/";

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

export const updateHikeName = async (value: string, id: number, email: string, password: string) => {
    let data = {};

    await axios.put(`${URL}hikes/${id}/name`, 
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

export const updateImage = async (value: Blob, memoId: number, email: string, password: string) => {
    let data = {};

    await axios.post(`${URL}memos/${memoId}/image`, 
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
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })

    return data;
}

export const getImageCollection = async (email: string, password: string) => {
    let data = {};

    await axios.get(`${URL}stats/path-collection`, 
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