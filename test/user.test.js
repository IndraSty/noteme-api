import supertest from "supertest";
import { removeTestUser } from "./test-utils"
import { app } from "../src/application/app";


describe('POST /api/users', function () {
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can register new user', async () => {
        const result = await supertest(app)
            .post('/api/users')
            .send({
                email: 'indra@gmail.com',
                name: 'Indra',
                password: 'rahasia',
                confirmPassword: 'rahasia'
            });
            
            console.log(result.error)
            expect(result.status).toBe(200);
            expect(result.body.data.email).toBe('indra@gmail.com');
            expect(result.body.data.password).toBeUndefined();
    })
})