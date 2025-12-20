# URL Shortening Service 🔗

A RESTful API service for creating and managing shortened URLs with statistics tracking. Built with Node.js/TypeScript and includes a minimal frontend interface.

## 📋 Features

- **Create Short URLs**: Generate unique short codes for long URLs
- **Retrieve Original URLs**: Get the original URL from a short code
- **Update URLs**: Modify existing URL mappings
- **Delete URLs**: Remove short URL entries
- **Statistics Tracking**: Monitor access counts for each short URL
- **Frontend Interface**: Simple web UI for interacting with the API
- **Automatic Redirects**: Navigate from short URLs to original destinations

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) v1.2.14 or higher (or Node.js 18+)

### Installation

```bash
# Install dependencies
bun install
```

### Running the Application

```bash
# Start the backend server
cd backend
bun run index.ts

# The API will be available at http://localhost:3000
```

### Frontend

Open `frontend/index.html` in your browser or serve it with a local server.

## 📚 API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

#### 1. Create Short URL

**POST** `/shorten`

Create a new short URL from a long URL.

**Request Body:**

```json
{
  "url": "https://www.example.com/some/long/url"
}
```

**Response:** `201 Created`

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

**Error Response:** `400 Bad Request` - Invalid URL format

---

#### 2. Retrieve Original URL

**GET** `/shorten/:shortCode`

Get the original URL from a short code.

**Response:** `200 OK`

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

**Error Response:** `404 Not Found` - Short code not found

---

#### 3. Update Short URL

**PUT** `/shorten/:shortCode`

Update the destination URL for an existing short code.

**Request Body:**

```json
{
  "url": "https://www.example.com/some/updated/url"
}
```

**Response:** `200 OK`

```json
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid URL format
- `404 Not Found` - Short code not found

---

#### 4. Delete Short URL

**DELETE** `/shorten/:shortCode`

Remove a short URL entry.

**Response:** `204 No Content` - Successfully deleted

**Error Response:** `404 Not Found` - Short code not found

---

#### 5. Get URL Statistics

**GET** `/shorten/:shortCode/stats`

Retrieve access statistics for a short URL.

**Response:** `200 OK`

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z",
  "accessCount": 10
}
```

**Error Response:** `404 Not Found` - Short code not found

## 🏗️ Project Structure

```
short-url/
├── backend/
│   ├── index.ts          # Main API server
│   ├── package.json      # Backend dependencies
│   └── tsconfig.json     # TypeScript configuration
├── frontend/
│   ├── index.html        # Frontend interface
│   ├── index.js          # Frontend logic
│   └── styles.css        # Styling
├── README.md
└── SCRUM.md             # Project planning and sprints
```

## 🛠️ Technology Stack

- **Backend**: Node.js/TypeScript with Bun runtime
- **API Style**: RESTful
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Data Storage**: In-memory (can be extended to use database)

## 📝 Example Usage

### Using cURL

```bash
# Create a short URL
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.example.com/very/long/url"}'

# Get original URL
curl http://localhost:3000/shorten/abc123

# Update URL
curl -X PUT http://localhost:3000/shorten/abc123 \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.example.com/updated/url"}'

# Get statistics
curl http://localhost:3000/shorten/abc123/stats

# Delete URL
curl -X DELETE http://localhost:3000/shorten/abc123
```
