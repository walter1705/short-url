# SCRUM Planning - URL Shortening Service

## 📊 Project Overview

**Project Name:** URL Shortening Service  
**Start Date:** December 2025  
**Team Size:** 1 Developer  
**Sprint Duration:** 1 week sprints  
**Methodology:** Scrum/Agile

## 🎯 Product Vision

Create a simple, efficient, and reliable URL shortening service that allows users to create, manage, and track shortened URLs through a RESTful API with an optional frontend interface.

## 📋 Product Backlog

### Epic 1: Core API Development

Priority: HIGH

#### User Stories

1. **As a user, I want to create a short URL so that I can share a compact link**

   - Acceptance Criteria:
     - POST `/shorten` endpoint accepts valid URLs
     - Returns unique short code (6 characters alphanumeric)
     - Validates URL format
     - Returns 201 on success, 400 on invalid input
   - Story Points: 5
   - Status: ✅ Completed

2. **As a user, I want to retrieve the original URL from a short code**

   - Acceptance Criteria:
     - GET `/shorten/:shortCode` returns original URL
     - Returns 200 on success, 404 if not found
     - Increments access counter
   - Story Points: 3
   - Status: ✅ Completed

3. **As a user, I want to update an existing short URL**

   - Acceptance Criteria:
     - PUT `/shorten/:shortCode` updates URL
     - Validates new URL format
     - Updates `updatedAt` timestamp
     - Returns 200 on success, 404 if not found, 400 on invalid input
   - Story Points: 3
   - Status: ✅ Completed

4. **As a user, I want to delete a short URL**

   - Acceptance Criteria:
     - DELETE `/shorten/:shortCode` removes entry
     - Returns 204 on success, 404 if not found
   - Story Points: 2
   - Status: ✅ Completed

5. **As a user, I want to view statistics for my short URLs**
   - Acceptance Criteria:
     - GET `/shorten/:shortCode/stats` returns access count
     - Includes all URL metadata
     - Returns 200 on success, 404 if not found
   - Story Points: 3
   - Status: ✅ Completed

### Epic 2: Frontend Development

Priority: MEDIUM

6. **As a user, I want a web interface to create short URLs**

   - Acceptance Criteria:
     - Simple form to input long URL
     - Displays generated short code
     - Shows full short URL for copying
   - Story Points: 5
   - Status: ✅ Completed

7. **As a user, I want to see all my created short URLs**

   - Acceptance Criteria:
     - List view of all short URLs
     - Shows original URL, short code, and stats
     - Includes edit and delete actions
   - Story Points: 5
   - Status: 🔄 In Progress

8. **As a user, I want automatic redirects from short URLs**
   - Acceptance Criteria:
     - Clicking short URL redirects to original
     - Increments access counter
     - Handles 404 gracefully
   - Story Points: 3
   - Status: ✅ Completed

### Epic 3: Data Persistence & Enhancement

Priority: LOW

9. **As a developer, I want to persist data in a database**

   - Acceptance Criteria:
     - Replace in-memory storage with database (SQLite/PostgreSQL)
     - Implement proper migrations
     - Maintain API compatibility
   - Story Points: 8
   - Status: 📝 Planned

10. **As a user, I want custom short codes**

    - Acceptance Criteria:
      - Optional `customCode` parameter in POST request
      - Validates uniqueness
      - Falls back to random generation if taken
    - Story Points: 3
    - Status: 📝 Planned

11. **As a user, I want expiration dates for short URLs**
    - Acceptance Criteria:
      - Optional `expiresAt` field
      - Returns 410 Gone after expiration
      - Automatic cleanup of expired URLs
    - Story Points: 5
    - Status: 📝 Planned

## 🏃 Sprint Planning

### Sprint 1: Core API (Week 1)

**Goal:** Implement all CRUD operations for URL shortening API

**Sprint Backlog:**

- ✅ Set up project structure
- ✅ Implement POST `/shorten` endpoint
- ✅ Implement GET `/shorten/:shortCode` endpoint
- ✅ Implement PUT `/shorten/:shortCode` endpoint
- ✅ Implement DELETE `/shorten/:shortCode` endpoint
- ✅ Implement GET `/shorten/:shortCode/stats` endpoint
- ✅ Add input validation
- ✅ Add error handling

**Sprint Review:**

- All core endpoints implemented and functional
- Proper error handling in place
- Ready for frontend integration

### Sprint 2: Frontend & Polish (Week 2)

**Goal:** Create user-friendly interface and improve UX

**Sprint Backlog:**

- ✅ Create basic HTML structure
- ✅ Implement URL creation form
- ✅ Display generated short codes
- 🔄 Create URL list/management view
- ✅ Add styling and responsive design
- ✅ Implement redirect functionality
- 🔄 Add copy-to-clipboard feature

**Current Status:** In Progress

### Sprint 3: Future Enhancements (Backlog)

**Goal:** Add database persistence and advanced features

**Sprint Backlog:**

- 📝 Integrate database (SQLite/PostgreSQL)
- 📝 Add custom short codes
- 📝 Implement URL expiration
- 📝 Add rate limiting
- 📝 Add analytics dashboard
- 📝 Implement user authentication

## 📈 Metrics & KPIs

### Velocity

- Sprint 1: 16 story points completed
- Sprint 2: 13/18 story points (in progress)

### Definition of Done

- [ ] Code is written and follows style guide
- [ ] Unit tests written and passing
- [ ] API endpoints return correct status codes
- [ ] Error handling implemented
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed to development environment

## 🐛 Bug Tracking

### Active Bugs

None currently

### Resolved Bugs

None logged yet

## 🔄 Retrospective Notes

### Sprint 1 Retrospective

**What went well:**

- Quick setup with Bun runtime
- Clean API design
- Efficient development pace

**What could improve:**

- Add automated testing
- Better error messages
- API documentation

**Action Items:**

- Set up testing framework for Sprint 2
- Create OpenAPI/Swagger documentation

## 📅 Upcoming Milestones

- **v1.0.0** (Current Sprint): Complete frontend interface
- **v1.1.0** (Sprint 3): Database integration
- **v2.0.0** (Sprint 4+): Advanced features (auth, analytics, custom domains)

## 🔗 Resources

- [API Requirements Document](README.md)
- Backend Code: `backend/index.ts`
- Frontend Code: `frontend/`

---

**Last Updated:** December 19, 2025
