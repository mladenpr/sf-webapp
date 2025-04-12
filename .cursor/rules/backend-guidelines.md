# Backend Development Guidelines

## API Structure

### RESTful Endpoints
```
/api/
├── auth/
│   ├── login
│   ├── logout
│   └── register
├── calculators/
│   ├── tubular-piles
│   ├── sheet-piles
│   └── anodes
├── projects/
└── materials/
```

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
```

## Database Schema

### Tables

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### PileGroups
```sql
CREATE TABLE pile_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  name VARCHAR(255) NOT NULL,
  pile_count INTEGER NOT NULL,
  outer_diameter DECIMAL(10,2) NOT NULL,
  wall_thickness DECIMAL(10,2) NOT NULL,
  pile_length DECIMAL(10,2) NOT NULL,
  paint_length DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Security Guidelines

### Authentication
1. Use JWT for API authentication
2. Implement refresh token rotation
3. Store tokens securely
4. Implement rate limiting
5. Use secure session management

### Data Protection
1. Encrypt sensitive data at rest
2. Use HTTPS for all API calls
3. Implement input validation
4. Sanitize database queries
5. Implement proper error handling

### Password Security
1. Use bcrypt for password hashing
2. Implement password complexity requirements
3. Implement account lockout
4. Require 2FA for sensitive operations
5. Regular security audits

## Error Handling

### Error Codes
```typescript
enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}
```

### Error Handling Best Practices
1. Use custom error classes
2. Implement proper logging
3. Return appropriate HTTP status codes
4. Provide meaningful error messages
5. Handle edge cases

## Validation

### Input Validation
1. Use Zod for schema validation
2. Validate request parameters
3. Validate request body
4. Validate file uploads
5. Implement custom validators

### Example Validation Schema
```typescript
const PileGroupSchema = z.object({
  name: z.string().min(1).max(255),
  pileCount: z.number().int().positive(),
  outerDiameter: z.number().positive(),
  wallThickness: z.number().positive(),
  pileLength: z.number().positive(),
  paintLength: z.number().min(0),
});
```

## Performance Optimization

### Database
1. Use proper indexes
2. Implement query optimization
3. Use connection pooling
4. Implement caching
5. Regular maintenance

### API
1. Implement rate limiting
2. Use proper pagination
3. Implement request caching
4. Optimize response payload
5. Use compression

## Testing Guidelines

### Unit Tests
1. Test business logic
2. Test validation
3. Test error handling
4. Test edge cases
5. Test database operations

### Integration Tests
1. Test API endpoints
2. Test authentication
3. Test authorization
4. Test data flow
5. Test error scenarios

### Example Test Structure
```typescript
describe('PileGroupService', () => {
  describe('createPileGroup', () => {
    it('should create a pile group successfully', async () => {
      // Test implementation
    });

    it('should validate input data', async () => {
      // Test implementation
    });

    it('should handle database errors', async () => {
      // Test implementation
    });
  });
});
```

## Logging

### Log Levels
1. ERROR: Application errors
2. WARN: Warning conditions
3. INFO: Informational messages
4. DEBUG: Debugging information
5. TRACE: Detailed debugging

### Logging Best Practices
1. Use structured logging
2. Include request ID
3. Include timestamp
4. Include context
5. Implement log rotation

## Documentation

### API Documentation
1. Use OpenAPI/Swagger
2. Document request/response format
3. Provide examples
4. Document error responses
5. Keep documentation updated

### Code Documentation
1. Use TSDoc for TypeScript
2. Document complex logic
3. Document business rules
4. Document assumptions
5. Document limitations 