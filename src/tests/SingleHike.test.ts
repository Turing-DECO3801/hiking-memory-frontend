import { getAHike } from "../api";

const email = "unittest@example.com";
const password = "test";
const hikeId = 36;

jest.setTimeout(10000)

describe("Get Single Hike Test", () => {

    test("Single Hike Data", async () => {
        const hike = await getAHike(hikeId, email, password) as any;

        expect(hike.memos).toBeTruthy();        
        expect(hike.hike).toBeTruthy();        
    })

    test("Audio Memos", async () => {
        const hike = await getAHike(hikeId, email, password) as any;

        expect(hike.memos[0].id).toBe(19);   
        expect(hike.memos[1].id).toBe(21);      
    })

    test("Audio Memos Coordinates", async () => {
        const hike = await getAHike(hikeId, email, password) as any;

        expect(hike.memos[0].longitude).toBe(-27.3121);   
        expect(hike.memos[0].latitude).toBe(153.005);      
    })

    test("Audio Memo Audio Reference", async () => {
        const hike = await getAHike(hikeId, email, password) as any;

        expect(hike.memos[0].audio).toBe('1664953635-unittest@example.com-audio-0.m4a');   
    })

    test("Audio Memo Logs", async () => {
        const hike = await getAHike(hikeId, email, password) as any;

        expect(hike.logs.ContentType).toBe('text/csv');
        expect(hike.logs.Body).toBeTruthy();
    })

    test("Audio Memo GPS Logs Data", async () => {
        const hike = await getAHike(hikeId, email, password) as any;

        expect(hike.logs.Body.type).toBe('Buffer');
        expect(hike.logs.Body.data.length).toBeGreaterThan(100);
    })
})
