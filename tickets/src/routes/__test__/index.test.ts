import request from "supertest";
import { app } from "../../app";
const createTicket = () => {
    return request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "test",
            price: 10,
        })
        .expect(201);
};
it("can fetch a list of tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();
    const respones = await request(app).get(`/api/tickets`).set("Cookie", global.signin()).expect(200);
    expect(respones.body.length).toEqual(3);
});
