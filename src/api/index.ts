import axios from "axios";
import { serverURL } from "../constants";

const URL = serverURL;
// const URL = "http://localhost:8000/";

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

export const setViewed = async (value: number, hikeId: number, email: string, password: string) => {
    let data = {};

    await axios.put(`${URL}hikes/${hikeId}/viewed/`, 
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

export const setDistance = async (value: number, hikeId: number, email: string, password: string) => {
    let data = {};

    await axios.put(`${URL}hikes/${hikeId}/distance/`, 
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

export const updateMemoTranscription = async (value: string, memoId: number, email: string, password: string) => {
    let data = {};

    await axios.post(`${URL}memos/${memoId}/transcription`, 
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

export const updateImage = async (value: any, memoId: number, email: string, password: string) => {
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