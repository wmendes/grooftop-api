# Grooftop App Implementation Checklist

## Authentication

| Backend (API) | Frontend (Mobile App) |
| --- | --- |
| ✅ Register as a user | ✅ Register as a user |
| ❌ Register as a partner (rooftop owner) - No specific partner registration, only user registration | ❌ Register as a partner (rooftop owner) - No specific partner registration |
| ✅ Login | ✅ Login |
| ✅ Logout - Handled client-side with token removal | ✅ Logout - Handled client-side with token removal |
| ❌ Forgot password - Not implemented | 🔶 Forgot password - UI exists but not functional |
| ❌ Reset password - Not implemented | ❌ Reset password - Not implemented |
| ❌ Change password - Not implemented | ❌ Change password - Not implemented |

## Rooftop Management

| Backend (API) | Frontend (Mobile App) |
| --- | --- |
| ✅ Create a rooftop | ✅ Create a rooftop |
| ✅ Edit a rooftop | ✅ Edit a rooftop |
| ✅ Delete a rooftop | ✅ Delete a rooftop |
| ✅ View a rooftop | ✅ View a rooftop |
| ✅ View all rooftops | ✅ View all rooftops |

## Booking Management

| Backend (API) | Frontend (Mobile App) |
| --- | --- |
| ✅ Book a rooftop | ✅ Book a rooftop |
| ✅ Edit a booking | ✅ Edit a booking |
| ✅ Delete a booking | ✅ Delete a booking |
| ✅ View a booking | ✅ View a booking |
| ✅ View all bookings | ✅ View all bookings |

## Review Management

| Backend (API) | Frontend (Mobile App) |
| --- | --- |
| ✅ Create a review | ✅ Create a review |
| ✅ Edit a review | ✅ Edit a review |
| ✅ Delete a review | ✅ Delete a review |
| ✅ View a review | ✅ View a review |
| ✅ View all reviews | ✅ View all reviews |

## Bookmarks

| Backend (API) | Frontend (Mobile App) |
| --- | --- |
| ❌ Bookmark a rooftop - Not implemented | ❌ Bookmark a rooftop - Not implemented |
| ❌ Unbookmark a rooftop - Not implemented | ❌ Unbookmark a rooftop - Not implemented |
| ❌ View all bookmarks - Not implemented | ❌ View all bookmarks - Not implemented |

## Search and Filtering

| Backend (API) | Frontend (Mobile App) |
| --- | --- |
| ✅ Search for a rooftop - Basic filtering by city and capacity | 🔶 Search for a rooftop - Basic UI exists but limited functionality |
| ✅ Filter rooftops - Basic filtering by city and capacity | 🔶 Filter rooftops - Basic UI exists but limited functionality |
| ❌ Sort rooftops - Not implemented | ❌ Sort rooftops - Not implemented |

## Frontend Only

- ❌ Check style issues
- ❌ Check navigation issues
- ❌ Check responsiveness

## Advanced Search

| Backend (API) | Frontend (Mobile App) |
| --- | --- |
| ❌ Search by rooftop name | ❌ Search by rooftop name |
| ❌ Search by rooftop description | ❌ Search by rooftop description |
| ❌ Search by rooftop address | ❌ Search by rooftop address |
| ❌ Search by rooftop price | ❌ Search by rooftop price |
| ❌ Search by rooftop capacity | ❌ Search by rooftop capacity |
| ❌ Search by rooftop amenities | ❌ Search by rooftop amenities | 