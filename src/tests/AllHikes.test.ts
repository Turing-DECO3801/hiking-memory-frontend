import { getHikes } from "../api";

const email = "unittest@example.com";
const password = "test";

jest.setTimeout(10000)

describe("Get Hikes Test", () => {

    test("Obtain multiple hikes", async () => {
        const hikes = await getHikes(email, password) as HikeData[];

        expect(hikes.length).toBe(2);
    })

    test("Correct Pathname", async () => {
        const hikes = await getHikes(email, password) as HikeData[];

        expect(hikes[1].path_name).toBe("Test Path");
    })

    test("Correct Email Returned", async () => {
        const hikes = await getHikes(email, password) as HikeData[];

        expect(hikes[0].email).toBe(email);
    })

    test("Correct ID", async () => {
        const hikes = await getHikes(email, password) as HikeData[];

        expect(hikes[0].id).toBe(36);
        expect(hikes[1].id).toBe(37);
    })
})
