# NexReason - AI-Powered Decision Analysis

Transform complex decisions into clear insights with intelligent analysis across multiple thinking frameworks. Powered by Alvion AI.

## Features

- 🧠 **Multi-Framework Analysis**: Analytical, emotional, and creative thinking approaches
- 🌍 **Multilingual Support**: English, Turkish, Spanish, Russian
- 🚀 **AI-Powered**: Google Gemini integration for intelligent insights
- 🔒 **Secure**: Enterprise-grade security and rate limiting
- 📱 **Responsive**: Beautiful UI that works on all devices
- ⚡ **Fast**: Optimized for performance with Next.js 14

## Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production Deployment

#### Environment Variables

Set these environment variables in your hosting platform:

**Required:**
```bash
GEMINI_API_KEY=your-gemini-api-key-here
```

**Optional (for monetization and analytics):**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

#### Deploy to Vercel (Recommended)

1. **Fork this repository** or push to your GitHub
2. **Go to [Vercel](https://vercel.com)**
3. **Import your repository**
4. **Add environment variables** in Vercel dashboard
5. **Deploy!**

#### Deploy to Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Internationalization**: next-intl
- **Security**: Custom middleware with rate limiting

## Project Structure

```
nexreason/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── api/               # API endpoints
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility functions
├── messages/              # Translation files
├── i18n/                  # Internationalization config
└── middleware.ts          # Security middleware
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

---

**Powered by Alvion AI** ⚡ 