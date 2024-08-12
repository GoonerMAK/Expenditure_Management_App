import supertest from "supertest";
import { app, server } from "../../src/index";
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe("---------------- role routes ----------------", () => {
    
    let token: string;
    let createdRoleId: string;

    beforeAll(async () => {
        token = jwt.sign({ id: "test-user-id" }, process.env.SECRET, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await server.close();
    });


    describe("POST /api/roles", () => {

        it("should create a new role and return success code 201", async () => {
            const response = await request.post('/api/roles')
                .set('Cookie', `jwt=${token}`)
                .send({
                    role_name: "Test Role"
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.role_name).toBe("Test Role");
            createdRoleId = response.body.id;
        });

        it("should return 400 for invalid request body", async () => {
            const response = await request.post('/api/roles')
                .set('Cookie', `jwt=${token}`)
                .send({});
            expect(response.status).toBe(400);
        });
    });


    describe("PUT /api/roles/:id", () => {

        it("should update an existing role and return success code 200", async () => {
            const response = await request.put(`/api/roles/${createdRoleId}`)
                .set('Cookie', `jwt=${token}`)
                .send({
                    role_name: "Updated Role"
                });

            expect(response.status).toBe(200);
            expect(response.body.role_name).toBe("Updated Role");
        });

        it("should return 400 for invalid role ID", async () => {
            const response = await request.put('/api/roles/invalid-id')
                .set('Cookie', `jwt=${token}`)
                .send({
                    role_name: "Updated Role"
                });
            expect(response.status).toBe(400);
        });
    });


    describe("GET /api/roles", () => {

        it("should return success code 200 and all roles", async () => {
            const response = await request.get('/api/roles')
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });


    describe("GET /api/roles/:id", () => {

        it("should return a role entry and success code 200", async () => {
            const response = await request.get(`/api/roles/${createdRoleId}`)
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body.role_name).toBe("Updated Role");
        });

        it("should return 400 for invalid role ID", async () => {
            const response = await request.get('/api/roles/invalid-id')
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(400);
        });
    });


    describe("GET /api/roles/users/by-role", () => {

        it("should return success code 200 and users grouped by roles", async () => {
            const response = await request.get('/api/roles/users/by-role')
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });


    describe("DELETE /api/roles/:id", () => {

        it("should delete the created role and return success code 200", async () => {
            const response = await request.delete(`/api/roles/${createdRoleId}`)
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(200);
        });

        it("should return 400 for invalid role ID", async () => {
            const response = await request.delete('/api/roles/invalid-id')
                .set('Cookie', `jwt=${token}`);
            expect(response.status).toBe(400);
        });
    });

});
