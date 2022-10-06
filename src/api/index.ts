import axios from "axios";

const URL = "http://ec2-13-54-55-236.ap-southeast-2.compute.amazonaws.com:8000/";

export const login = (email: string, password: string) => {
    axios.post(`${URL}auth/login`, { email: email, password: password })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export const getHikes = async (email: string, password: string) => {
    let data = {};

    console.log(email);
    console.log(password);

    axios.get(`${URL}hikes/`, 
        {
            headers: {
                "Content-Type": "application/json",
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

// const signup = async (email: string, password: string, name: string) => {
//     let success = false;

//     const data = await axios.post(`${serverURL}auth/signup`,
//       { email: email, password: password, name: name }
//     )
//     .then((res) => {
//       success = res.data;
//       if (success) {
//         setAuthed(true);
//         navigate("/");
//         setEmail(email);
//         setPassword(password);
//       } else {
//         setAuthed(false);
//       }
//     })
//     .catch((err) => {
//       setAuthed(false);
//       console.log(err);
//     })

//     return success;
//   }