import { updateHikeName, setFavourite, getAHike, updateMemoNotes } from "../api";

const email = "unittest@example.com";
const password = "test";
const hikeId = 36;

const newName = "New Path";
const defaultName = "Test Path";

jest.setTimeout(10000)

describe("Update Hike Details", () => {

    test("Update Hike Name", async () => {
        let queryStatus = await updateHikeName(newName, hikeId, email, password) as any;

        expect(queryStatus.result).toBeTruthy();
        
        queryStatus = await updateHikeName(defaultName, hikeId, email, password) as any;
        
        expect(queryStatus.result).toBeTruthy();
    })

    test("Set Favourite", async () => {
        let queryStatus = await setFavourite(1, hikeId, email, password) as any;

        expect(queryStatus.result).toBeTruthy();

        let hike = await getAHike(hikeId, email, password) as any;

        expect(hike.hike.favourite === 1).toBeTruthy();
        
        queryStatus = await setFavourite(0, hikeId, email, password) as any;
        
        expect(queryStatus.result).toBeTruthy();

        hike = await getAHike(hikeId, email, password) as any;

        expect(hike.hike.favourite === 0).toBeTruthy();
    })

    test("Update Memo Notes", async () => {
        let queryStatus = await updateMemoNotes("Update 1", hikeId, email, password) as any;

        expect(queryStatus.result).toBeTruthy();
    })
})
