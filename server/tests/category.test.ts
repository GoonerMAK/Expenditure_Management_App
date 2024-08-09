import supertest from "supertest";
import { app, server  } from "../src/index";
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe("---------------- category routes ----------------", ()=> {
    
    let token: string;
    let createdCategoryId: string;

    beforeAll(() => {
        token = jwt.sign({ id: "test-user-id" }, process.env.SECRET, { expiresIn: '1h' });
    });

    afterAll((done) => {
        server.close(done);
    });

    describe("GET /api/categories", () => {

        it("should return success code 200 and all categories", async () => {
            const response = await request.get('/api/categories').set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        })
    })


    describe("POST /api/categories", () => {

        it("should create a new category and return success code 201", async () => {
            const response = await request.post('/api/categories')
                .set('Cookie', `jwt=${token}`)
                .send({ category_name: "New Category" });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.category_name).toBe("New Category");
            createdCategoryId = response.body.id;
        });

        it("should return 400 for invalid request body", async () => {
            const response = await request.post('/api/categories')
                .set('Cookie', `jwt=${token}`)
                .send({});
            expect(response.status).toBe(400);
        });
    });


    describe("GET /api/categories/:id", () => {

        it("should return a category and success code 200", async () => {
            const response = await request.get(`/api/categories/${createdCategoryId}`)
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('category_name');
        });

        it("should return 404 for a non-existing category", async () => {
            const response = await request.get('/api/categories/Th15-15-N-R4ND0M-1D')
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(400);
        });
    });


    describe("PUT /api/categories/:id", () => {

        it("should update an existing category and return success code 200", async () => {
            const response = await request.put(`/api/categories/${createdCategoryId}`)
                .set('Cookie', `jwt=${token}`)
                .send({ category_name: "Updated Category" });
            expect(response.status).toBe(200);
            expect(response.body.category_name).toBe("Updated Category");
        });

        it("should return 400 for a non-existing category", async () => {
            const response = await request.put('/api/categories/Th15-15-N-R4ND0M-1D')
                .set('Cookie', `jwt=${token}`)
                .send({ category_name: "Updated Category" });
            expect(response.status).toBe(400);
        });
    });


    describe("DELETE /api/categories/:id", () => {

        it("should delete the created category and return success code 200", async () => {
            const response = await request.delete(`/api/categories/${createdCategoryId}`)
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(200);
        });

        it("should return 400 for a non-existing category", async () => {
            const response = await request.delete('/api/categories/Th15-15-N-R4ND0M-1D')
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(400);
        });
    });

})