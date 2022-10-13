import axios from "axios";
import { transcriptURL, API_KEY } from "../constants";

const URL = transcriptURL;

const assembly = axios.create({
    baseURL: transcriptURL,
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