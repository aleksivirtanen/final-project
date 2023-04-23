const { describe, test, expect, afterAll } = require("@jest/globals");
const supertest = require("supertest");

const connection = require("../db/pool");

const app = require("../app");

describe("SIGNUP users endpoint", () => {
  beforeAll(async () => {
    const deleteQuery = "DELETE FROM users WHERE email=?;";
    connection.query(deleteQuery, ["tony@stark.com"], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test("should signup user with valid credentials", async () => {
    const data = {
      name: "Tony Stark Wayne",
      email: "tony@stark.com",
      password: "password123",
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(data);

    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });

  test("should not create an user without email property", async () => {
    const user = {
      name: "Test User",
      password: "testi",
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(user);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"email" is required');
  });

  test("should not create an user without password property", async () => {
    const user = {
      name: "Test User",
      email: "test@user.com",
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(user);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"password" is required');
  });

  test("should not create an user with password shorter than 5 characters", async () => {
    const user = {
      name: "Test User",
      email: "test@user.com",
      password: "test",
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(user);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"password" length must be at least 5 characters long'
    );
  });

  test("should login user with valid credentials", async () => {
    const data = {
      name: "Tony Stark Wayne",
      email: "tony@stark.com",
      password: "password123",
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(data);

    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });
});

describe("RESETPASSWORD endpoint", () => {
  test("should allow users to reset their passwords", async () => {
    const email = {
      email: "seppo@raty.com",
    };

    const responseForgot = await supertest(app)
      .post("/api/users/forgotpassword")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(email);

    const { message, link } = responseForgot.body;

    const fields = link.split("/");
    const id = fields[fields.length - 2];
    const token = fields[fields.length - 1];

    const password = {
      password: "testi",
    };

    const response = await supertest(app)
      .put(`/api/users/resetpassword/${id}/${token}`)
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(password);

    expect(response.status).toEqual(200);
    expect(response.body.message).toContain("Password updated");
  });

  test("should not reset a password with less than 5 characters", async () => {
    const email = {
      email: "matti@meikalainen.com",
    };

    const responseForgot = await supertest(app)
      .post("/api/users/forgotpassword")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(email);

    const { message, link } = responseForgot.body;

    const fields = link.split("/");
    const id = fields[4];
    const token = fields[5];

    const password = {
      password: "test",
    };

    const response = await supertest(app)
      .put(`/api/users/resetpassword/${id}/${token}`)
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(password);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"password" length must be at least 5 characters long'
    );
  });
});
