const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

let token;
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
  let res = await request(server).post("/api/auth/login").send({
    username: "bubbles",
    password: "12345",
  });

  token = res.body.token;
});
afterAll(async () => {
  await db.destroy();
});

describe("[GET] /client/classes (auth client)", () => {
  let res;
  beforeEach(async () => {
    res = await request(server)
      .get("/api/client/classes")
      .set("Authorization", token);
  });

  it("returns status 200", async () => {
    expect(res.status).toBe(200);
  });
  it("returns 4 classes", () => {
    expect(res.body).toHaveLength(4);
  });
  it("returns the correct shape of data", () => {
    expect(res.body).toMatchSnapshot();
  });
});

describe("[GET] /client/classes/:class_id", () => {
  let res;
  beforeEach(async () => {
    res = await request(server)
      .get("/api/client/classes/2")
      .set("Authorization", token);
  });
  it("returns status 200", () => {
    expect(res.status).toBe(200);
  });
  it("does not return a class_id", () => {
    expect(res.body.class_id).not.toBeDefined();
  });
  it("returns Relaxing Yoga", () => {
    expect(res.body.class_name).toBe("Relaxing Yoga");
  });
  it("returns correct shape of data", () => {
    expect(res.body).toMatchSnapshot();
  });
});

describe("[POST] /client/classes/:class_id", () => {
  let class1
  let res;
  
  beforeEach(async () => {
    class1 = await db('classes').where('class_id', 1).first()

    res = await request(server)
      .post("/api/client/classes/1")
      .send()
      .set("Authorization", token);

  });
  it("returns status 201 for a successful reservation", () => {
    expect(res.status).toBe(201)
  });
  it("does not create a new reservation if a the class does not exist", async() => {
    res = await request(server)
    .post("/api/client/classes/5")
    .send()
    .set("Authorization", token);
    expect(res.status).toBe(404)
    expect(res.body.message).toBe("That class doesn't exist")
  });
  it("creates a reservation if the class exists", async () => {
    const resos = await db('reservations')
    const registeredClass = resos[4]
    expect(resos.length).toBe(5)
    expect(registeredClass.user_id).toBe(2)
    expect(registeredClass.class_id).toBe(1)
  });
  it("only allows a user to make a class reservation once", async () => {
    const res2 = await request(server)
    .post("/api/client/classes/1")
    .send()
    .set("Authorization", token);

    const reservations = await db('reservations')

    expect(res2.status).toBe(401)
    expect(res2.body.message).toBe("You have already registered for this class")
    expect(reservations).toHaveLength(5)
  });
  it("does not allow user to register for class if full", async () => {
    const fullClass = await request(server)
    .post("/api/client/classes/4")
    .send()
    .set("Authorization", token);

    expect(fullClass.status).toBe(401)
    expect(fullClass.body.message).toBe("Sorry, this class is full")
  });
  it("responds with class information", () => {
    expect(res.body).toBeDefined()
    expect(res.body).toMatchSnapshot()
  });
  it("increments the number of class_registered_clients by 1", async () => {
    expect(class1.class_registered_clients).toBe(0)

    const updatedClass = await db('classes').where('class_id', 1).first()
    expect(updatedClass.class_registered_clients).toBe(1)
  });
});

describe("[GET] /client/:user_id/classes", () => {
  let res;
  beforeEach(async () => {
    res = await request(server)
      .get("/api/client/2/classes")
      .set("Authorization", token);
    });
    it("returns status 200", () => {
      expect(res.status).toBe(200)
    });
    it("returns the number of auth user's own registered classes", () => {
      expect(res.body).toHaveLength(2)
    });
    // it("cannot access a different user's registered classes", async () => {
    //   res = await request(server)
    //   .get("/api/client/1/classes")
    //   .set("Authorization", token);
    //   expect(res.status).not.toBe(200)
    // });
    it("returns data in the correct shape", () => {
      expect(res.body).toMatchSnapshot();
    });
  });

describe("[GET] /client/:user_id/classes/:class_id", () => {
  let res;
  beforeEach(async () => {
    res = await request(server)
      .get("/api/client/2/classes/2")
      .set("Authorization", token);
    });
  it("returns status 200", () => {
    expect(res.status).toBe(200)
  });
  it("returns 1 class", () => {
    expect(res.body).toMatchObject({
      "class_id": 2,
      "reservation_id": 2,
      "class_name": "Relaxing Yoga",
      "class_type": "Yoga",
      "class_date": "2021-10-21T07:00:00.000Z",
      "class_time": "18:00:00",
      "class_registered_clients": 3
    })
  });
  it("returns correct class by class_id", () => {
    expect(res.body.class_id).toBe(2)
  });
  it("data is in the correct shape", () => {
    expect(res.body).toMatchSnapshot()
  });
  it("returns a 404 if not registered for that class", async () => {
    const lookForClass1 = await request(server)
    .get("/api/client/2/classes/1")
    .set("Authorization", token);
    expect(lookForClass1.status).toBe(404)
  })
});

describe("[DELETE] /client/:user_id/classes/:class_id", () => {
  let registeredClasses;
  let res;
  beforeEach(async () => {
    registeredClasses = await db('reservations as r').join('classes as c', 'r.class_id', 'c.class_id').where('r.user_id', 2)

    res = await request(server)
      .delete("/api/client/2/classes/2")
      .set("Authorization", token);
    });

  it("returns status 200", () => {
    expect(res.status).toBe(200)
  });
  it("returns deletion success message", () => {
    expect(res.body.message).toBe("Reservation deleted!")
  });
  it("user's number of registered classes is reduced by 1", async() => {
    const newRegisteredClasses = await db('reservations as r').join('classes as c', 'r.class_id', 'c.class_id').where('r.user_id', 2)
    expect(registeredClasses).toHaveLength(2)
    expect(newRegisteredClasses).toHaveLength(1)

  });
  it.todo("class's class_registered_clients is decremented by 1");
  it.todo("unable to route to class with deleted class_id");
});
