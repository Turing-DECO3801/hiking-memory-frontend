import axios from "axios";
import { transcriptURL, API_KEY } from "../constants";

const URL = transcriptURL;

/**
 * Creates the credentials for the API call to the Audio Transcription API
 */
const assembly = axios.create({
    baseURL: transcriptURL,
    headers: {
      authorization: API_KEY,
      "content-type": "application/json",
    },
})

/**
 * Sends a request to the API for the transcription
 * 
 * @param audioURL Any Audio URL to be transcribed
 * @returns The status of the transcription request and the ID of the request
 */
export const getTranscript = async (audioURL: string) => {
    const response = await assembly.post("/transcript", {
        audio_url: audioURL
    })
    
    return response;
}

/**
 * Checks to see if the transcription request has been completed
 * 
 * @param transcriptionId Transcription ID of the job request
 * @returns Object contain results of the transcription
 */
export const checkTranscriptionStatus = async (transcriptionId: any) => {
    const transcript = await assembly.get(`/transcript/${transcriptionId}`)
    
    return transcript;
}