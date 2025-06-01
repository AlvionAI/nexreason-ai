# NexReason - Structured Decision-Making AI Assistant

A multilingual Next.js 14 web application that helps users make structured decisions using AI-powered analysis.

## 🌟 Features

- **Multiple Decision Modes**: Analytical, Emotional, and Creative approaches
- **Multilingual Support**: English, Turkish, Spanish, and Russian
- **AI-Powered Analysis**: Structured decision insights using Gemini AI
- **Modern UI**: Dark theme with gradient backgrounds and smooth animations
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd nexreason
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
# Create .env.local file and add your Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌍 Supported Languages

- English (en) - `/en`
- Turkish (tr) - `/tr` 
- Spanish (es) - `/es`
- Russian (ru) - `/ru`

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **AI Integration**: Google Gemini API
- **State Management**: React Hooks

## 📁 Project Structure

```
nexreason/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       └── analyze/
│           └── page.tsx
├── components/
│   └── Navigation.tsx
├── lib/
│   ├── gemini.ts
│   └── utils.ts
├── messages/
│   ├── en/
│   ├── tr/
│   ├── es/
│   └── ru/
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── types/
│   └── index.ts
└── middleware.ts
```

## 🎨 Design Features

- Dark mode aesthetic with gradient backgrounds
- Purple, cyan, and pink color scheme
- Smooth hover animations and transitions
- Glassmorphism card designs
- Responsive grid layouts

## 🔧 Configuration

The project uses several configuration files:

- `next.config.js` - Next.js and next-intl configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `middleware.ts` - Internationalization routing

## 📝 Usage

1. **Homepage**: Select your decision-making mode (Analytical, Emotional, or Creative)
2. **Analyze Page**: Enter your decision dilemma and get structured AI analysis
3. **Language Switching**: Use the language selector in the navigation

## 🤖 AI Integration

The app currently uses mock responses for demonstration. To integrate with actual Gemini API:

1. Get your API key from Google AI Studio
2. Update the `analyzeDecision` function in `lib/gemini.ts`
3. Replace mock responses with actual API calls

## 🌐 Deployment

Deploy on Vercel (recommended):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 