const fetch = require('node-fetch');

describe('Testing GET API for users', () => {
    it('returns the status code 200 (success', async () => {
      const response = await fetch(`http://localhost:3000/api/users`);
      expect(response.status).toBe(200);
    });
  });

  describe('Testing GET API for specific userId', () => {
    it('returns the status code 200 (success and data', async () => {
      const response = await fetch(`http://localhost:3000/api/users/1`);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual({
        "id": 1,
        "username": "jazmygoreng",
        "email": "jazmygoreng@yahoo.com",
        "password": "$2a$10$i3Dn/VXJfDoOlx9cUozkceqHgh/ZwtBIJ9HVPSC5fh9qto2astBUe",
        "name": "J. Azmy",
        "telephone": "081288675500",
        "membershipStatus": false,
        "membershipDuration": 90,
        "role": "Customer",
        "address": "123 Main St, Cityville"
    });
  })});

  describe('Testing GET API for specific userId that doesnt exist', () => {
    it('returns the status code 404', async () => {
      const response = await fetch(`http://localhost:3000/api/users/999`);
      expect(response.status).toBe(404);
  })});

  describe('Testing POST, PATCH, and DELETE API for users', () => {
    it('returns the status code 201 (success', async () => {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": "testuser",
            "email": "testuser@gmail.coms",
            "name": "TESTUSER",
            "telephone": "893839",
            "password": "728sdsd3434*&*728827",
            "address": "u38483dfd4ndsjs"
          })
      });
      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.user.name).toBe("TESTUSER");
      expect(data.user.membershipStatus).toBe(false);
      expect(data.user.membershipDuration).toBe(0);

      const patchResponse = await fetch(`http://localhost:3000/api/users/${data.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "membershipStatus": true,
            "membershipDuration": 90
        })
      });

      expect(patchResponse.status).toBe(200);
      const patchData = await patchResponse.json();
      expect(patchData.user.name).toBe("TESTUSER");
      expect(patchData.user.membershipDuration).toBe(90);
      
      const userId = data.user.id;
      console.log(userId);
      const deleteResponse = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(deleteResponse.status).toBe(200);
    })});
          

  describe('Testing POST API for users with existing email', () => {
    it('returns the status code 409', async () => {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": "jazmykeren",
          "email": "jazmygoreng@yahoo.com",
          "password": "$2a$1565656",
          "name": "J. Azmy",
          "telephone": "081288675500",
          "address": "123 Main St, Cityville"
        })
      });
      expect(response.status).toBe(409);
    }
  )});

  describe('Testing POST API for users with existing username', () => {
    it('returns the status code 409', async () => {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": "jazmygoreng",
          "email": "jazmygoreng@gmail.com",
          "password": "$2a$1565656",
          "name": "J. Azmy",
          "telephone": "081288675500",
          "address": "123 Main St, Cityville"
        })
      });
      expect(response.status).toBe(409);
    }
  )});

  describe('Testing PATCH API for users with invalid userId', () => {
    it('returns the status code 404', async () => {
      const response = await fetch(`http://localhost:3000/api/users/999`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "membershipStatus": true,
          "membershipDuration": 90
        })
      });
      expect(response.status).toBe(404);
    }
  )}
  );

  describe('Testing DELETE API for users with invalid userId', () => {
    it('returns the status code 404', async () => {
      const response = await fetch(`http://localhost:3000/api/users/999`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      expect(response.status).toBe(404);
    }
  )}
  );

  describe('Testing PATCH API for users with missing userId on the URL', () => {
    it('returns the status code 400', async () => {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "membershipStatus": true,
          "membershipDuration": 90
        })
      });
      expect(response.status).toBe(405);
    }
  )}
  );