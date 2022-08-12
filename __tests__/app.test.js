const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const agent = request.agent(app);

jest.mock('../lib/services/github');

describe('why-i-autha routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'not-real@example.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('should delete users to /api/v1/github', async () => {
    const res = await agent.delete('/api/v1/github/callback?code=42');
    expect(res.status).toBe(200);
  });

  it('should get a new post to /api/v1/posts', async () => {
    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.get('/api/v1/posts');
    expect(res.body).toEqual(expect.arrayContaining([
      {
        id: expect.any(String),
        posts: expect.any(String),
      }
    ]));
  });

  afterAll(() => {
    pool.end();
  });
});
