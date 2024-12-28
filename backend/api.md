# Transactions API

## 1. **GET /**

**Description:**  
Health check route, returns "OK" when the server is functioning properly.

**Response:**

- **Status 200:**  
  `"OK"`

---

## 2. **GET /get**

**Description:**  
Retrieves all transactions. This route calls the `getTransactions` method from the controller.

**Query Parameters:**  
None.

**Response:**

- **Status 200:**  
  Returns a list of transactions (format depends on the implementation of the `getTransactions` method).

- **Status 500:**  
  If an error occurs while fetching transactions, it returns the message:  
  `"Error fetching transactions"`

---

## 3. **POST /upload**

**Description:**  
Receives a file containing transactions and processes it. Uses the `multer` library for file upload and calls the `uploadTransactions` method from the controller.

**Parameters:**

- **File (form field):**  
  File field name: `file`.

**Response:**

- **Status 200:**  
  If the upload is successful, the transactions will be processed.

- **Status 500:**  
  If an error occurs while processing the file, it returns the message:  
  `"Error uploading transactions"`

**Notes:**

- The file should be sent as part of the request body in the `multipart/form-data` format.
- The file is stored in memory, not on disk, due to the use of `multer.memoryStorage()`.

---

## Technical Notes:

- **Multer:** The `multer` library is used to handle file uploads. In this case, it is configured to store the file directly in memory (`memoryStorage`), meaning the file is accessed directly from RAM rather than being saved to disk.
  
- **Controllers (`transactionController`):**  
  - **`getTransactions(req, res)`**: Method responsible for returning the transactions.
  - **`uploadTransactions(req, res)`**: Method responsible for processing the uploaded file and storing the transactions contained therein and saving them in the database.

---
