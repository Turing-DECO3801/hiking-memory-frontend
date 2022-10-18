import axios from "axios";
import { serverURL } from "../constants";

const URL = serverURL;

/**
 * Gets All Hike data for a user if the user credentials match those
 * in the database
 * 
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns An Array of All Hike data for the particular user
 */
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

/**
 * Gets a single Hike data for a user if the user credentials match those
 * in the database
 * 
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns A single Hike data for the particular user
 */
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

/**
 * Updates the name of the hike
 * 
 * @param value Name of the hike
 * @param id ID of the hike entry
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns Returns the status of the API call
 */
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

/**
 * Updates the favourited status of the particular Hike given is ID
 * 
 * @param value Status of favourited
 * @param hikeId ID of the hike entry
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns Returns the status of the API call
 */
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

/**
 * Updates the view status of the hike
 * 
 * @param value Status of viewed
 * @param hikeId ID of the hike entry
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns A single Hike data for the particular user
 */
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

/**
 * Updates the distance recorded by the Google Maps API of the hike
 * 
 * @param value Distance of the hike path
 * @param hikeId ID of the hike entry
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns Returns the status of the API call
 */
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

/**
 * Updates the memo notes recorded by the user for the particular audio recording
 * 
 * @param value Name of the hike
 * @param memoId ID of the memo entry
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns Returns the status of the API call
 */
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

/**
 * Updates the audio transcription of the user for the particular audio recording
 * 
 * @param value Value of the Audio Transcription
 * @param memoId ID of the memo entry
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns Returns the status of the API call
 */
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

/**
 * Updates the image  of the user for the particular audio recording
 * 
 * @param value Image Binary File
 * @param memoId ID of the memo entry
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns Returns the status of the API call
 */
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

/**
 * Gets a list of all the images that a particular user has
 * 
 * @param email User Email for Identification
 * @param password User Password for Identification
 * @returns An Array of all Audio Memos and connected Images
 */
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