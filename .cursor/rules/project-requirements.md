# Construction Project Pricing Web Application

## Project Overview
A web-based application to assist in construction project pricing, with a focus on quantity calculations and cost estimation. The application will be developed in phases, starting with basic calculators for construction materials and expanding to comprehensive project cost management.

## Phase 1 Scope
Initial development focuses on material quantity calculators:
- Version 01: Tubular Pile Calculator
- Version 02: Sheet Pile Calculator
- Version 03: Cathodic Protection Anode Calculator

### Version 01 - Tubular Pile Calculator Requirements

#### Input Requirements
1. Multiple pile group creation and management
2. For each pile group:
   - Number of piles
   - Outer diameter
   - Wall thickness
   - Pile length
   - Paint length (0 if no painting required)

#### Output Requirements
1. Per pile group:
   - Individual group weight
   - Surface area for painting
2. Aggregate calculations:
   - Total weight across all pile groups
   - Total painting area required

#### Calculation Display
- Transparent calculation process shown to users
- Real-time updates as inputs change

## Future Phase Scope
The application will expand to include:
1. Cost Database
   - Material costs
   - Machinery and consumables
   - Manpower rates
   - Overhead costs
   - Temporary materials
   - Project preliminaries
   - Logistics costs

2. Historical Data Management
   - Cost tracking over time
   - Project reference data
   - Rate analysis

## Technical Requirements

### Performance
- Response time < 500ms for calculations
- Support for multiple concurrent users
- Mobile-responsive design

### Security
- User authentication and authorization
- Data encryption at rest and in transit
- Regular backups

### Scalability
- Modular design for easy feature addition
- Containerized deployment
- API-first approach

## Recommended Tech Stack

### Frontend
- **Framework**: Next.js 14 with React
  - Type safety with TypeScript
  - Server-side rendering for better performance
  - Built-in API routes
  - Easy deployment
  - Strong component ecosystem

### Backend
- **API**: Next.js API routes (initially)
  - Can be separated into dedicated backend later if needed
  - Easy integration with frontend
  - Serverless deployment option

### Database
- **Primary**: PostgreSQL
  - Strong data integrity
  - Complex query support
  - JSON support for flexible schemas
  - Time-series data capabilities for historical tracking

### Authentication
- NextAuth.js
  - Multiple authentication providers
  - Session management
  - Role-based access control

### Deployment
- Vercel (initial deployment)
  - Seamless Next.js deployment
  - Automatic HTTPS
  - Edge network
  - Easy preview deployments

### Development Tools
- ESLint & Prettier for code quality
- Jest & React Testing Library for testing
- GitHub Actions for CI/CD
- Docker for containerization

## Development Approach
1. Agile methodology with 2-week sprints
2. Feature-branch workflow
3. Test-driven development
4. Continuous integration and deployment
5. Regular security audits 