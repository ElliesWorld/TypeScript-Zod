# Swedish Pastries Bakery Management System 
 The API supports full CRUD operations (Create, Read, Update, Delete).
## Description 
This project manages inventory for a bakery specializing in Swedish pastries. 

 ## Zod Schema Explanation 
- `PastrySchema`: Validates the structure of pastry objects, ensuring each has a 'name', and 'price'. 

**Example:**
```typescript
const PastrySchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required")
});

name: Must be a non-empty string 
price: Must be a non-empty string 
id: Is not included in schema because it's auto-generated

# Installation:

## Initialize project
npm init -y

## Install Zod
npm install zod

## Install Express 
npm install express

## Install TypeScript and nodemon
npm install -D typescript ts-node @types/express nodemon

add to package.json:
{
  "type": "module",
  "scripts": {
    "fix": "nodemon fix.ts"
  }
}

# To run: 
npm run fix

# Test with Insomnia
Server will start on:http://localhost:3000/

## GET /pastries
Purpose: Get all pastries
Method: GET
URL: http://localhost:3000/pastries
Response: Array with all pastries

## POST /pastries
Purpose: Add a new pastry
Method: POST
URL: http://localhost:3000/pastries
Body (JSON):
json  {
    "name": "Rhubarb pie",
    "price": "120"
  }
Response: Success message with created pastry

## PUT /pastries/:id
Purpose: Update existing pastry
Method: PUT
URL: http://localhost:3000/pastries/1
Body (JSON):
json  {
    "name": "Updated Princess cake",
    "price": "400"
  }
Response: Success message with updated pastry

## DELETE /pastries/:id
Purpose: Delete a pastry
Method: DELETE
URL: http://localhost:3000/pastries/1
Response: Success message