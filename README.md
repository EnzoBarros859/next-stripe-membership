# Next.js Stripe Membership

A modern membership/subscription management system built with Next.js 14, Stripe, and Tailwind CSS. This application provides a complete solution for handling user subscriptions, membership plans, and payment processing.

![image](https://github.com/user-attachments/assets/850fdb09-01e6-4743-8778-c90054005664)

## Features

- 🚀 Built with Next.js 14 (App Router)
- 💳 Stripe Integration for Payment Processing
- 🎨 Modern UI with Tailwind CSS
- 🔒 Server-side Rendering for Better Performance
- 🎨 Responsive Design
- 🔐 Secure Payment Handling
- 📊 Subscription Management
- 👥 Customer Management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.17 or later
- npm or yarn
- A Stripe account

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/next-stripe-membership.git
cd next-stripe-membership
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

## API Routes

### `/api/create-checkout-session`
- Creates a Stripe checkout session for subscription
- Method: POST
- Body: `{ priceId: string }`

### `/api/get-plans`
- Retrieves available subscription plans
- Method: GET

### `/api/get-customers`
- Retrieves list of customers
- Method: GET

### `/api/get-subscription`
- Retrieves subscription details for a customer
- Method: GET
- Query: `customerId: string`

## Features in Detail

### Membership Page
- Displays available subscription plans
- Modern card-based design
- Interactive subscription buttons
- Loading states and error handling
- Server-side rendered for better performance

### Subscription Management
- View subscription details
- Track billing cycles
- Monitor payment status
- View upcoming invoices
- Manage billing information

## Stripe Integration

The application uses Stripe for payment processing. Key features include:

- Secure payment processing
- Subscription management
- Customer portal integration
- Webhook handling for events
- Automatic invoice generation

## Development

### Running Tests
```bash
npm run test
# or
yarn test
```

### Building for Production
```bash
npm run build
# or
yarn build
```

### Running Production Build
```bash
npm start
# or
yarn start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All sensitive data is handled server-side
- Stripe handles all payment processing
- Environment variables for sensitive keys
- HTTPS enforced in production
- CSRF protection implemented

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)
