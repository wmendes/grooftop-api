# Grooftop App Implementation Tasks

This document outlines the remaining tasks needed to complete the Grooftop app implementation, based on the current checklist status.

## Backend (API) Tasks

### Priority 1: Bookmark Functionality
1. Design and implement bookmark data model in the database
2. Create bookmark controller with the following endpoints:
   - POST /bookmarks - Add a rooftop to user's bookmarks
   - DELETE /bookmarks/:id - Remove a rooftop from user's bookmarks
   - GET /bookmarks - Get all bookmarked rooftops for the current user

### Priority 2: Advanced Search and Filtering
1. Enhance rooftop search functionality:
   - Implement search by rooftop name
   - Implement search by rooftop description
   - Implement search by rooftop address
2. Extend rooftop filtering using existing metadata:
   - Filter by activities (using existing /metadata/activities)
   - Filter by rental types (using existing /metadata/rental-types)
   - Filter by accessibility infrastructure (using existing /metadata/accessibility)
   - Filter by features (using existing /metadata/features)
   - Filter by facilities (using existing /metadata/facilities)
   - Filter by view types (using existing /metadata/view-types)
   - Filter by guidelines (using existing /metadata/guidelines)
   - Filter by cancellation policies (using existing /metadata/cancellation-policies)
3. Implement sorting functionality:
   - Sort by price (ascending/descending)
   - Sort by rating (ascending/descending)
   - Sort by date added (newest/oldest)

### Priority 3: Partner Registration
1. Extend user model to include partner/owner status
2. Create partner registration flow
   - Add verification process for partners
   - Implement partner-specific fields and validation

### Priority 4: Authentication Improvements
1. Implement forgot password functionality
   - Create endpoint to send password reset email
   - Implement token generation for password reset
2. Implement reset password functionality
   - Create endpoint to validate reset token
   - Create endpoint to update password using token
3. Implement change password functionality
   - Create endpoint for authenticated users to change their password

## Frontend (Mobile App) Tasks

### Priority 1: Enhance Search and Filtering
1. Improve search screen UI and functionality
   - Connect to enhanced API search endpoints
   - Add advanced search options
2. Implement filter component with multiple criteria using existing metadata:
   - Fetch and display filter options from metadata endpoints
   - Create UI components for each metadata type:
     - Activities selector
     - Rental types selector
     - Accessibility options
     - Features checklist
     - Facilities checklist
     - View types selector
     - Guidelines filter
     - Cancellation policy filter
   - Add price range slider
   - Enhance capacity selector
3. Add sorting options to rooftop listings

### Priority 2: Implement Bookmark Functionality
1. Create bookmark button on rooftop detail screen
2. Add bookmarks tab in user profile or dedicated bookmarks screen
3. Implement bookmark management (add/remove)

### Priority 3: UI/UX Improvements
1. Conduct comprehensive style review
   - Ensure consistent styling across all screens
   - Fix any visual inconsistencies
2. Improve navigation
   - Review navigation flow
   - Ensure intuitive user journeys
3. Enhance responsiveness
   - Test on various device sizes
   - Fix any layout issues on different screen sizes

### Priority 4: Partner Registration
1. Create partner registration screen
2. Implement partner-specific profile fields
3. Add partner dashboard for managing rooftops

### Priority 5: Complete Authentication Features
1. Connect forgot password UI to API once implemented
2. Create reset password screen and functionality
3. Add change password option to user profile screen

## Testing Tasks

1. Create unit tests for new API endpoints
2. Implement integration tests for critical user flows
3. Conduct end-to-end testing of complete features
4. Perform cross-device testing for the mobile app

## Documentation Tasks

1. Update API documentation with new endpoints
2. Create user guide for new features
3. Document partner onboarding process
4. Create metadata reference guide for developers 