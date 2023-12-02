// GET all customer accounts
describe('GET all customer accounts', () => {
    it('returns a valid response', async () => {
      const response = await fetch(`http://localhost:3000/api/searchAccount`);
      expect(response.status).toBe(200);
    });
});

// GET customer account that contains "jazmy" in the username
describe('GET one customer account', () => {
    it('returns the correct account', async () => {
        const response = await fetch(`http://localhost:3000/api/searchAccount?q=jazmy`);
        const data = await response.json();
        expect(data).toEqual([{
            "id":1,
            "username":"jazmygoreng",
            "email":"jazmygoreng@yahoo.com",
            "password":"$2a$10$i3Dn/VXJfDoOlx9cUozkceqHgh/ZwtBIJ9HVPSC5fh9qto2astBUe",
            "name":"J. Azmy",
            "telephone":"081288675500",
            "membershipStatus":true,
            "membershipDuration":90,
            "role":"Customer",
            "address":"123 Main St, Cityville"
        }]);
    });
});

// GET account that has an Admin role
describe('GET admin account', () => {
    it('returns the correct account', async () => {
        const response = await fetch(`http://localhost:3000/api/searchAccount?q=inas`);
        const data = await response.json();
        expect(data).toEqual([]);
    });
});

// GET non-existing account
describe('GET non-existing account', () => {
    it('returns the correct account', async () => {
        const response = await fetch(`http://localhost:3000/api/searchAccount?q=ray`);
        const data = await response.json();
        expect(data).toEqual([]);
    });
});