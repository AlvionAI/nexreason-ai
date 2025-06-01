# 🔒 NexReason Security Documentation

## Overview

NexReason implements comprehensive security measures to protect against common web application vulnerabilities and ensure safe operation in production environments.

## Security Features Implemented

### 1. Input Validation & Sanitization
- **XSS Prevention**: All user inputs are sanitized using DOMPurify
- **Input Length Limits**: Questions limited to 2000 characters, profile fields to 200 characters
- **Suspicious Pattern Detection**: Blocks common attack vectors (script tags, javascript protocols, etc.)
- **Type Validation**: Strict validation of all input types and formats

### 2. Rate Limiting
- **API Endpoints**: 20 requests per 15-minute window per IP
- **Web Pages**: 100 requests per 15-minute window per IP
- **Automatic Cleanup**: Expired rate limit entries are automatically removed
- **Headers**: Rate limit information included in response headers

### 3. Security Headers
- **Content Security Policy (CSP)**: Prevents XSS and code injection
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Browser XSS protection
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features
- **HSTS**: Forces HTTPS in production (when enabled)

### 4. Request Filtering
- **Suspicious User Agents**: Blocks known bots and scrapers from API endpoints
- **Attack Pattern Detection**: Blocks requests with malicious patterns
- **Method Validation**: Only allows appropriate HTTP methods per endpoint

### 5. Error Handling
- **Information Disclosure Prevention**: Detailed errors only shown in development
- **Consistent Error Responses**: Standardized error format across all endpoints
- **Logging**: Security events are logged for monitoring

### 6. Environment Security
- **Environment Variables**: Sensitive data stored in environment variables
- **Gitignore**: Comprehensive gitignore prevents accidental secret commits
- **Production Optimizations**: Different security levels for development vs production

## Configuration

### Required Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Required
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Optional (defaults provided)
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional Security Configuration

```bash
# Rate Limiting (defaults shown)
RATE_LIMIT_WINDOW_MS=900000          # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100          # Page requests per window
RATE_LIMIT_API_MAX_REQUESTS=20       # API requests per window

# Production Security
FORCE_HTTPS=true                     # Force HTTPS redirects
DOMAIN=nexreason.com                 # Your production domain
```

## Security Best Practices

### For Development
1. Never commit `.env.local` or any files containing secrets
2. Use different API keys for development and production
3. Test security features regularly
4. Monitor console logs for security events

### For Production Deployment
1. **HTTPS Only**: Always use HTTPS in production
2. **Environment Variables**: Set all sensitive data as environment variables
3. **Domain Configuration**: Update CSP and CORS settings for your domain
4. **Monitoring**: Implement proper logging and monitoring
5. **Regular Updates**: Keep dependencies updated for security patches

### API Security
1. **Rate Limiting**: Monitor rate limit headers in responses
2. **Input Validation**: All inputs are automatically validated and sanitized
3. **Error Handling**: Errors don't expose sensitive information in production
4. **CORS**: Configure CORS settings for your specific domain

## Security Headers Explained

### Content Security Policy (CSP)
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
connect-src 'self' https://generativelanguage.googleapis.com;
```

- `default-src 'self'`: Only allow resources from same origin
- `connect-src`: Allow connections to Gemini API
- `img-src`: Allow images from same origin, data URLs, and HTTPS

### Rate Limiting Headers
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: When the rate limit window resets
- `Retry-After`: Seconds to wait before retrying (when rate limited)

## Monitoring & Logging

### Security Events Logged
- Rate limit violations
- Blocked suspicious requests
- Attack pattern detections
- API errors and exceptions

### Log Format
```
🚫 Blocked suspicious request from 192.168.1.1: curl/7.68.0
🔍 API Request received: question=Should I..., mode=analytical, locale=en
✅ API Response ready: prosCount=6, consCount=5
```

## Vulnerability Prevention

### XSS (Cross-Site Scripting)
- Input sanitization with DOMPurify
- Content Security Policy
- Output encoding
- Suspicious pattern detection

### CSRF (Cross-Site Request Forgery)
- SameSite cookie attributes
- Origin validation
- Custom headers requirement

### SQL Injection
- No direct database queries (using AI API only)
- Input validation and sanitization
- Pattern detection for SQL injection attempts

### DoS (Denial of Service)
- Rate limiting per IP
- Request size limits
- Automatic cleanup of expired data

### Information Disclosure
- Error messages sanitized in production
- No sensitive data in logs
- Security headers prevent information leakage

## Testing Security

### Manual Testing
```bash
# Test rate limiting
for i in {1..25}; do curl -X POST http://localhost:3000/api/analyze; done

# Test input validation
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"question":"<script>alert(1)</script>","mode":"analytical","locale":"en"}'

# Test suspicious patterns
curl -X GET "http://localhost:3000/../../../etc/passwd"
```

### Security Headers Check
Use tools like:
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [OWASP ZAP](https://www.zaproxy.org/)

## Incident Response

### If Security Issue Detected
1. **Immediate**: Block the attacking IP if possible
2. **Investigate**: Check logs for extent of the issue
3. **Patch**: Apply security fixes immediately
4. **Monitor**: Increase monitoring for similar attacks
5. **Update**: Review and update security measures

### Emergency Contacts
- Development Team: [Your team contact]
- Security Team: [Security team contact]
- Infrastructure: [Infrastructure team contact]

## Regular Security Maintenance

### Weekly
- Review security logs
- Check for failed requests
- Monitor rate limiting effectiveness

### Monthly
- Update dependencies (`npm audit`)
- Review security configurations
- Test security measures

### Quarterly
- Security audit
- Penetration testing
- Review and update security policies

## Compliance & Standards

This implementation follows:
- **OWASP Top 10** security guidelines
- **NIST Cybersecurity Framework** principles
- **Web Application Security** best practices
- **Privacy by Design** principles

## Support

For security-related questions or to report vulnerabilities:
- Email: security@nivaraai.com
- Create a private issue in the repository
- Contact the development team directly

## 📞 **Security Contact**

For security-related issues or vulnerabilities:
- Email: security@nivaraai.com
- Response time: Within 24 hours
- Severity classification: Critical, High, Medium, Low

## 👥 **Security Team**

**Maintained by**: Alvion AI Security Team

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Maintained by**: Alvion AI Security Team 