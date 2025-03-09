# ⚡ Newsletter Subscription Function (Appwrite)

This function handles newsletter subscriptions, confirmations, unsubscriptions, and autoresponders using Appwrite.

## 🧰 API Endpoints

### 📌 `POST /subscribe` - Subscribe to the newsletter
- Stores the user's email in the database.
- Sends a confirmation email with a unique token.

**Request Body**
```json
{
  "email": "user@example.com"
}
```

**Response**
* `200 OK` → `{ "message": "Check your inbox!" }`
* `400 Bad Request` → `{ "error": "Email is required" }`
* `500 Internal Server Error` → `{ "error": "Subscription failed" }`

---

### 📌 `GET /confirm?token=XYZ` - Confirm subscription
* Marks the user as confirmed.
* Sends a welcome email (Autoresponder 1).
* Schedules a follow-up email (Autoresponder 2) after 7 days.

**Query Parameters**
`token=XYZ123`

**Response**
* `200 OK` → `{ "message": "Subscription confirmed!" }`
* `400 Bad Request` → `{ "error": "Invalid token" }`
* `500 Internal Server Error` → `{ "error": "Confirmation failed" }`

---

### 📌 `POST /unsubscribe` - Unsubscribe from the newsletter
* Marks the user as unsubscribed but does not delete the record.

**Request Body**

``` json
{
"email": "user@example.com"
}
```

**Response**
* `200 OK` → `{ "message": "Unsubscribed successfully!" }`
* `400 Bad Request` → `{ "error": "User not found" }`
* `500 Internal Server Error` → `{ "error": "Unsubscribe failed" }`

---

### 📌 `GET /ping` - Health check
* Returns `"Pong"` to verify that the function is running.

**Response**
`Pong`

---

# ⚙️ Configuration

| Setting | Value |
|---------|-------|
| Runtime | Node.js (18.x) |
| Entrypoint | `src/main.js` |
| Build Commands | `npm install` |
| Permissions | `any` |
| Timeout (Seconds) | 15 |

---

## 🔒 Environment Variables

| Variable Name | Description |
|---------------|-------------|
| `APPWRITE_API_KEY` | API key for Appwrite Database and Mail services |
| `APPWRITE_PROJECT_ID` | Your Appwrite project ID |
| `APPWRITE_DATABASE_ID` | ID of the database used for storing subscribers |
| `APPWRITE_COLLECTION_ID` | ID of the collection storing subscribers |
| `APPWRITE_FUNCTION_ID` | Function ID (for direct execution via API) |
| `APPWRITE_API_ENDPOINT` | Appwrite API endpoint (`https://cloud.appwrite.io/v1`) |
| `SENDER_EMAIL` | Sender email address for confirmation messages |
| `WEBSITE_URL` | Base URL for your website (used in emails) |
| `DEBUG_MODE` | Set to `true` for full debug logging |

---

## 🚀 Features

✅ **Double Opt-in (GDPR Compliant)** – Confirmation link sent before activation.  
✅ **Autoresponders** – First email upon confirmation, second after 7 days.  
✅ **Unsubscribe Handling** – Users can opt out without data loss.  
✅ **Secure Logging** – Sensitive data is masked unless `DEBUG_MODE=true`.  
✅ **Modular Design** – Easy to extend with additional features.

---

## 🛠️ Future Improvements

* ⏳ Implement a cron job to process pending autoresponders.
* 📊 Add analytics for open rates and engagement.
* 🌍 Multi-language email support.

---

## 📜 License

This project is open-source and available under the MIT license.
