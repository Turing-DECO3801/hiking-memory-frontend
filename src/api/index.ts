import axios from "axios";

const URL = "http://ec2-13-54-55-236.ap-southeast-2.compute.amazonaws.com:8000/";

export const login = (email: string, password: string) => {
    axios.post(`${URL}auth/login`, { email: email, password: password })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}