const { describe, expect, test, afterAll } = require("@jest/globals");
const supertest = require("supertest");
const connection = require("../db/pool");
const app = require("../app");

describe("GET items endpoint", () => {
  test("should return 200", (done) => {
    supertest(app).get("/api/items").expect(200).end(done);
  });

  test("should return json data", async () => {
    const response = await supertest(app)
      .get("/api/items")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          itemName: "Swiss Three Piece Mess Kit",
          category: "Camp Cooking and Field Stoves",
          price: 19.99,
        }),
        expect.objectContaining({
          id: 2,
          itemName: "Romanian Two Piece Mess Kit",
          category: "Camp Cooking and Field Stoves",
          price: 14.99,
        }),
      ])
    );
  });
});

describe("GET item by id endpoint", () => {
  const loggedInUser = {
    userId: "",
    email: "",
    token: "",
  };
  
  beforeAll(async () => {
    connection.query("DELETE FROM users WHERE email=?", [
      "john.wayne@domain.com",
    ]);
    const data = {
      name: "John Wayne",
      email: "john.wayne@domain.com",
      password: "password123",
    };
  
    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .send(data);
    loggedInUser.userId = response.body.userId;
    loggedInUser.email = response.body.email;
    loggedInUser.token = response.body.token;
  });
  test("should return 200 if item was found", (done) => {
    supertest(app).get("/api/items/1")
    .set("Accept", "application/json")
    .set("Authorization", "Bearer " + loggedInUser.token)
    .expect(200).end(done);
  });

  test("should return 200 and json if the item was found", async () => {
    const response = await supertest(app)
      .get("/api/items/1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        itemName: "Swiss Three Piece Mess Kit",
        category: "Camp Cooking and Field Stoves",
        price: 19.99,
      })
    );
  });
});

describe("GET myitems endpoint", () => {
  const loggedInUser = {
    userId: "",
    email: "",
    token: "",
  };
  
  beforeAll(async () => {
    connection.query("DELETE FROM users WHERE email=?", [
      "john.wayne@domain.com",
    ]);
    const data = {
      name: "John Wayne",
      email: "john.wayne@domain.com",
      password: "password123",
    };
  
    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .send(data);
    loggedInUser.userId = response.body.userId;
    loggedInUser.email = response.body.email;
    loggedInUser.token = response.body.token;
  });

  afterAll(async () => {
    const deleteQuery = `DELETE FROM items WHERE itemName LIKE 'Test MyItem' AND category LIKE 'Test MyCategory';`;
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test("should return 200 and json if users listings were found", async () => {
    const item = {
      itemName: "Test MyItem",
      category: "Test MyCategory",
      description: "description...",
      price: 10.55,
    };
  
    await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    const getResponse = await supertest(app)
      .get("/api/items/myitems")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)

    expect(getResponse.status).toEqual(200);
    expect(getResponse.headers["content-type"]).toMatch(/json/);
    expect(getResponse.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        itemName: "Test MyItem",
        category: "Test MyCategory",
        price: 10.55,
      })])
    );
  });
});

describe("POST item endpoint", () => {
  const loggedInUser = {
    userId: "",
    email: "",
    token: "",
  };

  beforeAll(async () => {
    connection.query("DELETE FROM users WHERE email=?", [
      "john.wayne@domain.com",
    ]);
    const data = {
      name: "John Wayne",
      email: "john.wayne@domain.com",
      password: "password123",
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .send(data);
    loggedInUser.userId = response.body.userId;
    loggedInUser.email = response.body.email;
    loggedInUser.token = response.body.token;
  });

  afterAll(async () => {
    const deleteQuery = `DELETE FROM items WHERE itemName LIKE 'Test Item' AND category LIKE 'Test Category';`;
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test("should create a new item", async () => {
    const item = {
      itemName: "Test Item",
      category: "Test Category",
      price: 10.55,
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.itemName).toEqual("Test Item");
    expect(response.body.category).toEqual("Test Category");
    expect(response.body.price).toEqual(10.55);
  });

  test("should not create an item without an itemName property", async () => {
    const item = {
      category: "Test Category",
      price: 10,
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"itemName" is required');
  });

  test("should not create an item without a category property", async () => {
    const item = {
      itemName: "Test Item",
      price: 10,
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"category" is required');
  });

  test("should not create an item with an empty itemName value", async () => {
    const item = {
      itemName: "",
      category: "Test Category",
      price: 10,
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"itemName" is not allowed to be empty');
  });

  test("should not create an item with an empty category value", async () => {
    const item = {
      itemName: "Test Item",
      category: "",
      price: 10,
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"category" is not allowed to be empty');
  });

  test("should not create an item with too short itemName", async () => {
    const item = {
      itemName: "Te",
      category: "Test Category",
      price: 10,
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"itemName" length must be at least 3 characters long'
    );
  });

  test("should not create an item with too short category", async () => {
    const item = {
      itemName: "Test Item",
      category: "Te",
      price: 10,
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"category" length must be at least 3 characters long'
    );
  });

  test("should not create an item without a price", async () => {
    const item = {
      itemName: "Test Item",
      category: "Test Category",
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"price" is required');
  });

  test("should not create an item with negative price", async () => {
    const item = {
      itemName: "Test Item",
      category: "Test Category",
      price: -10.11
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"price" must be a positive number');
  });

  test("should not create an item with price having more than 2 decimals", async () => {
    const item = {
      itemName: "Test Item",
      category: "Test Category",
      price: 10.111
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"price" must have no more than 2 decimal places');
  });

  test("should not create a duplicate item", async () => {
    const item = {
      itemName: "Swiss Three Piece Mess Kit",
      category: "Camp Cooking and Field Stoves",
      price: 19.99,
    };

    const response = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(item);

    expect(response.status).toEqual(400);
    expect(response.text).toContain("Item is in the database already");
  });
});

describe("DELETE items endpoint", () => {
  const loggedInUser = {
    userId: "",
    email: "",
    token: "",
  };

  beforeAll(async () => {
    connection.query("DELETE FROM users WHERE email=?", [
      "john.wayne@domain.com",
    ]);
    const data = {
      name: "John Wayne",
      email: "john.wayne@domain.com",
      password: "password123",
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .send(data);
    loggedInUser.userId = response.body.userId;
    loggedInUser.email = response.body.email;
    loggedInUser.token = response.body.token;
  });

  test("should delete the item by id", async () => {
    const item = {
      itemName: "Test Item Delete",
      category: "Test Category Delete",
      price: 10.55,
    };

    const postResponse = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .send(item);

    const postId = postResponse.body.id;

    const deleteResponse = await supertest(app)
      .delete(`/api/items/${postId}`)
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Accept", "application/json");

    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.text).toContain("Item deleted");
  });
});

describe("PUT item endpoint", () => {
  const loggedInUser = {
    userId: "",
    email: "",
    token: "",
  };

  beforeAll(async () => {
    connection.query("DELETE FROM users WHERE email=?", [
      "john.wayne@domain.com",
    ]);
    const data = {
      name: "John Wayne",
      email: "john.wayne@domain.com",
      password: "password123",
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .send(data);
    loggedInUser.userId = response.body.userId;
    loggedInUser.email = response.body.email;
    loggedInUser.token = response.body.token;
  });

  afterAll(async () => {
    const deleteQuery = `DELETE FROM items WHERE itemName LIKE 'Test Item Put Updated' AND category LIKE 'Test Category Put';`;
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test("should update item by id", async () => {
    const item = {
      itemName: "Test Item Put",
      category: "Test Category Put",
      description: "description...",
      price: 10.55,
    };

    const postResponse = await supertest(app)
      .post("/api/items")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .send(item);

    const postId = postResponse.body.id;

    const updatedItem = {
      id: postId,
      itemName: "Test Item Put Updated",
      price: 11.11,
    }

    const putResponse = await supertest(app)
      .put(`/api/items/${postId}`)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Content", "application/json")
      .send(updatedItem);

    expect(putResponse.status).toEqual(200);
    expect(putResponse.body).toEqual(expect.objectContaining({
      id: postId,
      itemName: "Test Item Put Updated",
      price: 11.11,
    }));
  });
});
