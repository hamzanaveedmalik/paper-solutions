# Forth & Vale - Premium Leather Goods Manufacturing

A modern, responsive website for Forth & Vale, a premium leather goods manufacturing company specializing in private label and OEM services for brands in the UK, EU, and USA.

## 🏢 About Forth & Vale

Forth & Vale designs and manufactures premium leather wallets, card holders, belts, bags, and accessories. We provide OEM/Private Label services for fashion brands, corporate clients, and distributors worldwide.

**Key Services:**

- Private Label Manufacturing
- Custom Design Services
- Corporate Gifting Solutions
- Sample Services
- Volume Manufacturing (MOQ: 100 units)

## 🚀 Features

### Product Showcase

- **Comprehensive Product Catalog** - Wallets, bags, belts, accessories, and more
- **Interactive Product Details** - High-quality images, specifications, and pricing
- **Product Variants** - Multiple colors and styles for each product
- **Responsive Design** - Optimized for all devices

### Business Solutions

- **Quote Request System** - Streamlined quote generation with product selection
- **Sample Request Service** - Custom sample packs with product pre-selection
- **Price Calculator** - Dynamic pricing based on volume tiers
- **Lead Capture Forms** - Integrated contact and inquiry forms

### User Experience

- **Modern UI/UX** - Clean, professional design with luxury aesthetics
- **Fast Performance** - Optimized images and code splitting
- **SEO Optimized** - Structured data, meta tags, and sitemap
- **Accessibility** - WCAG compliant design patterns

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** Radix UI primitives with shadcn/ui
- **Routing:** React Router DOM
- **State Management:** React Query for server state
- **Forms:** React Hook Form with Zod validation
- **Email Service:** Resend API
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd forthvale-private-label
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Configure the following variables:

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GOOGLE_ANALYTICS_ID=your_ga_id
   VITE_CRISP_WEBSITE_ID=your_crisp_id
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx  # Main navigation
│   ├── Footer.tsx      # Site footer
│   ├── Hero.tsx        # Landing page hero
│   └── ...
├── pages/              # Page components
│   ├── products/       # Product category pages
│   ├── Index.tsx       # Homepage
│   ├── Quote.tsx       # Quote request page
│   └── ...
├── data/               # Static data and content
│   └── productDetails.ts
├── lib/                # Utility functions
│   ├── utils.ts        # General utilities
│   └── email.ts        # Email service
├── hooks/              # Custom React hooks
└── assets/             # Static assets
```

## 🎨 Design System

### Color Palette

- **Primary:** Deep Purple (#24104C)
- **Secondary:** Rich Brown (#4A3A2A)
- **Accent:** Cream Gold (#E6D4A8)
- **Neutral:** Warm White (#FDFCF9)

### Typography

- **Display Font:** Playfair Display (serif)
- **Body Font:** Inter (sans-serif)

### Components

- Custom design system built on Tailwind CSS
- Consistent spacing, colors, and typography
- Responsive breakpoints and layouts

## 📧 Email Integration

The site uses Resend API for email functionality:

- Quote requests
- Sample requests
- Contact form submissions
- Lead capture

## 🔍 SEO Features

- **Structured Data:** Organization and WebSite schema
- **Meta Tags:** Open Graph and Twitter Cards
- **Sitemap:** Auto-generated XML sitemap
- **Robots.txt:** Search engine directives
- **Performance:** Optimized images and lazy loading

## 📱 Responsive Design

- **Mobile First:** Optimized for mobile devices
- **Breakpoints:** sm, md, lg, xl, 2xl
- **Touch Friendly:** Appropriate touch targets
- **Performance:** Optimized for mobile networks

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 📊 Analytics & Tracking

- **Google Analytics:** User behavior tracking
- **Crisp Chat:** Live chat support
- **Form Analytics:** Lead tracking and conversion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by Forth & Vale Ltd.

## 📞 Contact

**Forth & Vale Ltd.**

- **Email:** hello@forthandvale.com
- **Website:** https://www.forthandvale.com
- **Address:** Milton Keynes, United Kingdom
- **Company Registration:** 16639558

---

Built with ❤️ for premium leather goods manufacturing
