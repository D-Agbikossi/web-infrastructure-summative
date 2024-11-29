const request = require('supertest'); 
const app = require('../app'); 

describe('Cardio Blog API Tests', () => { 
	it('should fetch all articles', async () => { 
		const response = await request(app).get('/api/articles'); 
		expect(response.statusCode).toBe(200); 
		expect(response.body).toBeInstanceOf(Array); 
	}); 

	it('should register a new user', async () => { 
		const response = await request(app).post('/api/auth/signup').send({ 
			username: 'testuser', 
			password: 'testpassword123', 
		}); 
		expect(response.statusCode).toBe(201); 
	}); 

	it('should log in a user', async () => { 
		const response = await request(app).post('/api/auth/login').send({ 
			username: 'testuser', 
			password: 'testpassword123', 
		}); 
		expect(response.statusCode).toBe(200); 
		expect(response.body).toHaveProperty('token'); 
	}); 
});
