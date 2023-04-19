const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const controllers = require('../../controllers/authControllers');

const { DB_HOST_TEST, PORT } = process.env;

const {Users} = require('../../models/users');
const { types, string, object } = require('joi');
const { Types } = require('mongoose');

describe("test signup (authControllers.registerUser)", ()=>{

   let server = null; 

   beforeAll(async()=>{
     server = app.listen(PORT);
     await mongoose.connect(DB_HOST_TEST);
   })

   afterAll(async()=>{
     server.close();
     await mongoose.disconnect();
   })
   
   afterEach(async()=>{
     await Users.deleteMany({});
   })

   test("test register route with correct data", async()=>{
    const sendData = {
        email: "some@gmail.com",
        password: "123456"
    };

    const res = await request(app).post("/users/register").send(sendData);
    expect(res.statusCode).toBe(201);
    // expect(res.body).toContain("token");
    expect(res.body.user).toEqual({ email: sendData.email, subscription: "starter" });
    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
   });


})