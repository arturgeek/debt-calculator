# Debt Calculator

A comprehensive debt calculator built with React, TypeScript, and shadcn/ui. This application provides accurate loan amortization calculations with a modern, responsive interface.

##  Features

- **Loan Amortization Calculator**: Calculate monthly payments, total interest, and complete payment schedules
- **Remaining Balance Calculator**: Determine remaining balance and payments after a specific number of months
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Optimized for desktop and mobile devices
- **TypeScript**: Full type safety and better development experience
- **CI/CD Pipeline**: Automated deployment with GitHub Actions and Vercel

## 🛠️ Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Query
- **Icons**: Lucide React
- **Deployment**: Vercel with GitHub Actions CI/CD

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Local Development
```bash
# Clone the repository
git clone https://github.com/arturgeek/debt-calculator.git

# Navigate to project directory
cd debt-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🏗️ Build & Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Automated Deployment
This project uses GitHub Actions for continuous integration and deployment:
- **Linting**: ESLint with TypeScript support
- **Build Verification**: Ensures the project builds successfully
- **Automatic Deployment**: Deploys to Vercel on push to main branch

## 🧮 Calculator Features

### Amortization Calculator
- Calculate monthly payment amounts
- View total interest paid over loan term
- Generate complete payment schedule
- Handle various loan types and terms

### Remaining Balance Calculator
- Calculate remaining balance after X months
- Determine remaining payments
- Useful for refinancing decisions

### Mathematical Precision
- Precise decimal arithmetic for financial calculations
- Proper rounding for currency display
- Input validation and error handling
- Edge case management (zero values, invalid inputs)

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface using shadcn/ui
- **Responsive Layout**: Works seamlessly on all device sizes
- **Accessibility**: Built with accessibility best practices
- **Dark/Light Mode**: Theme support (if implemented)
- **Form Validation**: Real-time input validation and error messages

## 📁 Project Structure

```
src/
├── components/
│   ├── AmortizationCalculator.tsx  # Main calculator logic
│   ├── AmortizationTable.tsx       # Results display
│   └── ui/                         # shadcn/ui components
├── pages/
│   ├── Index.tsx                   # Main application page
│   └── NotFound.tsx                # 404 page
├── hooks/                          # Custom React hooks
├── lib/                            # Utility functions
└── main.tsx                        # Application entry point
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- React best practices and hooks
- Component-based architecture

## 🖥️ Cursor IDE Support

This project includes comprehensive Cursor IDE configuration for enhanced development experience:

### Cursor Rules
The project includes `.cursor/rules/` configuration files that provide:
- **Project Standards**: Consistent coding patterns and best practices
- **Calculator Logic Standards**: Mathematical precision and financial calculation guidelines
- **React/TypeScript Standards**: Modern React patterns and TypeScript best practices
- **UI/Styling Standards**: shadcn/ui and Tailwind CSS conventions
- **Personal Development Context**: Learning-focused development approach

### Benefits for Contributors
- **Consistent Code Style**: Automated suggestions follow project standards
- **Learning-Focused**: Explanations and educational guidance
- **Type Safety**: Enhanced TypeScript support and suggestions
- **Component Patterns**: Best practices for React component development
- **Financial Calculations**: Specialized guidance for mathematical precision

### Getting Started with Cursor
1. **Install Cursor IDE**: Download from [cursor.sh](https://cursor.sh)
2. **Clone the repository**: The `.cursor/rules/` folder will be automatically detected
3. **Enhanced AI Assistance**: Get contextual suggestions based on project standards
4. **Learning Support**: Receive explanations and educational guidance while coding

## 🚀 Deployment

This project is automatically deployed to Vercel through GitHub Actions:

1. **Push to main branch** triggers the CI/CD pipeline
2. **Linting and build verification** ensure code quality
3. **Automatic deployment** to Vercel production environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

##  Acknowledgments

- **Initial Development**: This project was initially developed using [Lovable](https://lovable.dev), an AI-powered development platform
- **UI Components**: Built with [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components
- **Styling**: Powered by [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Icons**: Beautiful icons from [Lucide React](https://lucide.dev/)
- **IDE Support**: Enhanced development experience with [Cursor IDE](https://cursor.sh)

---

**Built with ❤️ using modern web technologies**