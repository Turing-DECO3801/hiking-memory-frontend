import axios from "axios";

const URL = "https://api.assemblyai.com/v2";

const API_KEY = "bbb21a36f52e4d1b96ede3bf9f41f963";

const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: API_KEY,
      "content-type": "application/json",
    },
})

export const getTranscript = async (audioURL: string) => {
    const response = await assembly.post("/transcript", {
        audio_url: audioURL
    })
    
    return response;
}

export const checkTranscriptionStatus = async (transcriptionId: any) => {
    const transcript = await assembly.get(`/transcript/${transcriptionId}`)
    
    return transcript;
}