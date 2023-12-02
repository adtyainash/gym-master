describe('Testing POST for purchase', () => {
    it('returns the status code 200 (success', async () => {
      const response = await fetch(`http://localhost:3000/api/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": 1,
            "membershipId": 2,
          })
      });
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.data.userId).toBe(1);
      expect(data.data.membershipId).toBe(2);
})});
