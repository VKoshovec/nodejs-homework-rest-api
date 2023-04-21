const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const { DB_HOST_TEST, PORT } = process.env;

describe("test signup (auth-router.loginUser)", ()=>{

   let server = null; 

   beforeAll(async()=>{
     server = app.listen(PORT);
     await mongoose.connect(DB_HOST_TEST);
   })

   afterAll(async()=>{
     server.close();
     await mongoose.disconnect();
   })
   
   it("test login route with correct data", async()=>{
    const sendData = {
        email: "papa@gmail.com",
        password: "123456"
    };

    const res = await request(app).post("/users/login").send(sendData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toEqual({ email: sendData.email, subscription: "starter" });
    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
   });

   it("test login route without data", async()=>{
    const sendData = {};

    const res = await request(app).post("/users/login").send(sendData);
    expect(res.statusCode).toBe(400);
   });


   it("test login route with incorrect data", async()=>{
    const sendData = {
        email: "papa@gmail.co",
        password: "12345"
    };

    const res = await request(app).post("/users/login").send(sendData);
    expect(res.statusCode).toBe(401);
   });


})