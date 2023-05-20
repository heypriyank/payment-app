# payment-app

react app URL: https://payments-app-bfef8.web.app
node server base url: https://payment-node.onrender.com/

apis: 
1. /auth/setup [POST]
  sample body: {
    "email": "123@test.com",
    "password": "123@123",
    "name": "test123",
    "currentBalance": 1000
}

2. /transactions?walletId=ee2ac2f4-2c19-458a-b881-f362a94b1cea&skip=0&limit=10&sort=amount&sortType=dec [GET]

3. /transact/e05c1d30-f6ea-40c4-8217-d1b1db545453 [GET]

4. /wallet/e05c1d30-f6ea-40c4-8217-d1b1db545453 [GET]


JWT TOKEN to test: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjZhNmMwODAzMTRmNGI1NTVkMWYzZSIsImlhdCI6MTY4NDQ0ODk2MCwiZXhwIjoxNjg1MDUzNzYwfQ.3ZG1ENXJaPp2Nkes51isfzlay1LeFy-4XcCnGZ9z5bs
