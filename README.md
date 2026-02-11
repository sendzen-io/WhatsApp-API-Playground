# WhatsApp API Playground

Make your first API request in minutes & learn the basics of the WhatsApp Business API platform by using this playground for testing and experimenting. This tool allows you to interactively test WhatsApp Business API endpoints, message templates, and explore the full capabilities of the WhatsApp Business Platform. 

This tool expects you to complete your WhatsApp Business Setup for the Cloud API. 

## Features

- **Interactive API Testing**: Test WhatsApp Business API endpoints with a user-friendly interface
- **Message Sending**: Send various types of messages (text, media, templates, interactive)
- **Real-time Responses**: View API responses and error messages in real-time
- **Built-in Documentation**: Integrated API documentation and examples

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Build Tool**: Turbo

##  Installation

### Prerequisites

- Node.js >= 20
- pnpm >= 10.15.0

### Setup

```bash
# Clone the repository
git clone https://github.com/sendzen-io/whatsapp-api-playground.git

# Navigate to the project directory
cd whatsapp-api-playground

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## Usage

### Getting Started

1. **Paste Access Token**: Simply paste your WhatsApp Business API access token in the input field from Facebook
2. **Auto-Discovery**: The system automatically fetches all businesses and phone numbers linked to your access token
3. **Select Resources**: Choose from the discovered businesses and phone numbers for testing
4. **Test Endpoints**: Use the interactive interface to test various API endpoints
5. **Send Messages**: Test message sending functionality with different message types

### Access Token Setup

1. **Get WhatsApp Business API Access**: Apply for WhatsApp Business API access through Facebook
2. **Generate Access Token**: Create a long-lived access token from your Facebook Developer Console
3. **Paste Token**: Simply paste your access token in the playground interface. This token is not stored anywhere and only goes to Meta for calling the APIs
4. **Auto-Discovery**: The system will automatically discover all your businesses and phone numbers
5. **Start Testing**: Begin testing with your discovered resources

### How Auto-Discovery Works

When you paste your access token, the playground automatically:
- Fetches all WhatsApp Business Accounts associated with your token
- Discovers all phone numbers linked to each business account
- Displays them in an easy-to-use dropdown interface
- Allows you to switch between different businesses and phone numbers seamlessly

## Supported Message Types

- **Text Messages**: Plain text messages
- **Media Messages**: Images, videos, documents, audio
- **Template Messages**: Pre-approved message templates
- **Interactive Messages**: Buttons, lists, and quick replies
- **Location Messages**: Send location information
- **Contact Messages**: Share contact information

## API Endpoints Covered

- `POST /messages` - Send messages
- `GET /message_templates` - List message templates

## Testing Features

- **Token-Based Access**: Simply paste your access token to get started instantly
- **Auto-Discovery**: Automatically discover all your businesses and phone numbers
- **Response Viewer**: Formatted view of API responses
- **Error Handling**: Detailed error messages and debugging information
- **Multi-Resource Support**: Switch between different businesses and phone numbers easily

## Documentation

### API Reference

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Message Templates Guide](https://developers.facebook.com/docs/whatsapp/message-templates)
- [Webhook Configuration](https://developers.facebook.com/docs/whatsapp/webhooks)

### Examples

The playground includes built-in examples for:

- Sending text messages
- sending media
- using templates
- Error scenarios

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Docker

```bash
# Build Docker image
docker build -t whatsapp-api-playground .

# Run container
docker run -p 3000:3000 whatsapp-api-playground
```

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Add new features or fix bugs
4. **Run tests**: `pnpm test`
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all linting passes

## Troubleshooting

### Common Issues

**Access Token Issues**
- Verify your access token is valid and not expired
- Ensure your token has the required WhatsApp Business API permissions
- Check if the token has access to the businesses you want to test
- Make sure you're using a long-lived access token (not a short-lived one)

**Auto-Discovery Problems**
- If businesses/phone numbers don't appear, check your token permissions
- Ensure your WhatsApp Business Account is properly set up
- Verify that phone numbers are verified and active
- Check if your token has access to the specific business accounts

**Template Issues**
- Templates must be approved before use
- Check template format and content guidelines
- Verify template parameters are correctly formatted

**Media Upload Problems**
- Check file size limits (typically 5MB for images, 16MB for videos, 100MB for Documents)
- Verify supported file formats
- Ensure proper media headers

### Getting Help

- Check the [Issues](https://github.com/sendzen-io/whatsapp-api-playground/issues) page
- Review the [Discussions](https://github.com/sendzen-io/whatsapp-api-playground/discussions) section
- Join our community Discord server

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)

## Support

- **Documentation**: [www.sendzen.io/docs](https://www.sendzen.io/docs)
- **Community**: [Discord](https://discord.gg/sendzen)
- **Email**: support@sendzen.io
- **Website**: [sendzen.io](https://sendzen.io)

---

**Made with ❤️ by the SendZen team**
