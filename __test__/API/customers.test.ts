// GET all customer
describe('GET all customers', () => {
  it('returns a valid response', async () => {
    const response = await fetch(`http://localhost:3000/api/users/customers`);
    expect(response.status).toBe(200);
  });
});