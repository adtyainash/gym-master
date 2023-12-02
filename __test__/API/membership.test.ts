// GET all customer accounts
describe('GET all customer accounts', () => {
    it('returns a valid response', async () => {
      const response = await fetch(`http://localhost:3000/api/membership`);
      expect(response.status).toBe(200);
    });
});

describe('GET one membership', () => {
    it('returns the correct membership', async () => {
      const response = await fetch(`http://localhost:3000/api/membership/1`);
      const data = await response.json();
      expect(data).toEqual({
        "membershipId": 1,
        "name": 'SILVER',
        "price": 149999,
        "description": 'Get free pass for 1 months in every class and session',
        "duration": 30
      });
    });
});

describe('Testing GET API for specific membershipId that doesnt exist', () => {
    it('returns the status code 404', async () => {
      const response = await fetch(`http://localhost:3000/api/membership/999`);
      expect(response.status).toBe(404);
  })});
