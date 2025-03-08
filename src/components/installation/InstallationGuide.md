# HYIP Platform Installation Guide

## System Requirements

- Node.js 16.x or higher
- MySQL 8.0 or PostgreSQL 13+
- Redis (optional, for caching)
- At least 2GB RAM and 1 CPU core

## Quick Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-org/hyip-platform.git
cd hyip-platform
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hyip_platform

# Mail Configuration
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_email@example.com
MAIL_PASSWORD=your_mail_password
MAIL_FROM=noreply@example.com

# Payment Gateway API Keys
BTC_GATEWAY_API_KEY=your_btc_gateway_api_key
BTC_GATEWAY_SECRET=your_btc_gateway_secret

# Security Settings
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Application Settings
APP_URL=http://localhost:3000
APP_PORT=3000
NODE_ENV=development
```

### Step 4: Set Up the Database

```bash
npm run setup:db
```

### Step 5: Start the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm run build
npm start
```

## Configuration Options

### Database Configuration

The platform supports MySQL and PostgreSQL databases. Configure your database connection in the `.env` file.

### Mail Server Settings

Configure your SMTP server details to enable email notifications for user registration, password reset, and withdrawal confirmations.

### Payment Gateway Integration

The platform supports multiple cryptocurrency payment gateways. You can configure API keys and settings for each gateway in the `.env` file.

### Security Settings

Configure security settings such as JWT secret, password hashing algorithm, and session timeout.

### Mining Pool Connections

If you're using the mining feature, configure your mining pool connections in the `.env` file.

## Admin Setup

After installation, you need to create an admin user to access the admin dashboard:

```bash
npm run create:admin
```

Follow the prompts to create your admin account.

## Customization

### Themes and Branding

You can customize the platform's appearance by editing the theme configuration in `src/config/theme.js`.

### Investment Plans

Configure investment plans in the admin dashboard or by editing the seed data in `src/database/seeds/investment-plans.js`.

### Affiliate Program

Configure affiliate program settings in the admin dashboard or by editing the configuration in `src/config/affiliate.js`.

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your database credentials in the `.env` file
   - Ensure your database server is running

2. **Payment Gateway Integration Issues**
   - Verify your API keys and secrets
   - Check the payment gateway documentation for any changes in their API

3. **Email Sending Failures**
   - Verify your SMTP server settings
   - Check if your SMTP server requires special authentication

### Getting Help

If you encounter any issues during installation or configuration, please contact our support team at support@hyipplatform.com or open an issue on our GitHub repository.

## Updating

To update the platform to the latest version:

```bash
git pull
npm install
npm run migrate
npm run build
```

## Security Recommendations

1. Always use HTTPS in production
2. Regularly update the platform and its dependencies
3. Enable two-factor authentication for admin accounts
4. Implement IP whitelisting for admin access
5. Regularly backup your database

## License

This software is licensed under the [MIT License](LICENSE).
