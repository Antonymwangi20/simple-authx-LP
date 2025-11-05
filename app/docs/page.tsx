'use client';

import { useState } from 'react';
import { 
  Shield, Lock, Zap, Package, Code, CheckCircle, Copy, 
  Github, BookOpen, Server, Database, Key, Cookie, RefreshCw, 
  FileCode, Terminal, Settings, AlertCircle, ChevronRight,
  Menu, X, Search, Home, Users, Layers
} from 'lucide-react';

export default function DocsPage() {
  const [copied, setCopied] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Home },
    { id: 'installation', title: 'Installation', icon: Package },
    { id: 'quick-start', title: 'Quick Start', icon: Zap },
    { id: 'configuration', title: 'Configuration', icon: Settings },
    { id: 'authentication', title: 'Authentication', icon: Lock },
    { id: 'storage', title: 'Storage Adapters', icon: Database },
    { id: 'mfa', title: 'MFA/2FA', icon: Key },
    { id: 'middleware', title: 'Middleware', icon: Layers },
    { id: 'api-reference', title: 'API Reference', icon: Code },
    { id: 'examples', title: 'Examples', icon: FileCode },
  ];

  const CodeBlock = ({ code, language = 'typescript', id }) => (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => copyToClipboard(code, id)}
          className="bg-secondary/20 hover:bg-secondary/30 p-2 rounded text-white"
        >
          {copied === id ? <CheckCircle size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="bg-dark-secondary p-4 rounded-lg overflow-x-auto border border-gray-800">
        <code className="text-sm text-gray-300">{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-dark-secondary/95 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-3">
                <img 
                    src="/icon.png" 
                    alt="Simple AuthX Logo" 
                    className="w-7 h-7 sm:w-9 sm:h-9"
                />
                <div>
                <h1 className="text-xl font-bold gradient-text">Simple AuthX</h1>
                <p className="text-xs text-gray-400">Documentation</p>
                </div>
            </div>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm hover:text-secondary transition-colors hidden sm:block">
              Home
            </a>
            <a href="https://github.com/Antonymwangi20/simple-authx" target="_blank" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Github size={20} />
            </a>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 
          bg-dark-secondary lg:bg-transparent border-r border-gray-800 lg:border-0
          transition-transform duration-300 z-40 overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 lg:p-0 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                    activeSection === section.id
                      ? 'bg-secondary/20 text-secondary'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          {/* Introduction */}
          {activeSection === 'introduction' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome to Simple AuthX</h1>
                <p className="text-xl text-gray-300">
                  A secure, lightweight, and production-ready authentication library for Node.js applications.
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Zap className="text-secondary" />
                  What is Simple AuthX?
                </h3>
                <p className="text-gray-300">
                  Simple AuthX provides everything you need for authentication: JWT tokens, password hashing, 
                  refresh token rotation, MFA/2FA, session management, and multiple storage adapters. 
                  It's designed to be plug-and-play with Express applications.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-dark-secondary p-6 rounded-lg border border-gray-800">
                  <img 
                    src="/icon.png" 
                    alt="Simple AuthX Logo" 
                    className="w-10 h-10 sm:w-16 sm:h-16"
                />
                  <h3 className="font-semibold mb-2">Secure by Default</h3>
                  <p className="text-sm text-gray-400">Built with security best practices</p>
                </div>
                <div className="bg-dark-secondary p-6 rounded-lg border border-gray-800">
                  <Zap className="text-primary mb-3" size={32} />
                  <h3 className="font-semibold mb-2">Zero Config</h3>
                  <p className="text-sm text-gray-400">Works out of the box</p>
                </div>
                <div className="bg-dark-secondary p-6 rounded-lg border border-gray-800">
                  <Code className="text-secondary mb-3" size={32} />
                  <h3 className="font-semibold mb-2">TypeScript</h3>
                  <p className="text-sm text-gray-400">Full type definitions included</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {[
                    'JWT access & refresh tokens with automatic rotation',
                    'bcrypt/argon2 password hashing',
                    'Cookie-based authentication with CSRF protection',
                    'Multiple storage adapters (Memory, File, PostgreSQL, MongoDB, Redis)',
                    'MFA/2FA with TOTP and backup codes',
                    'Express middleware and auto-generated routes',
                    'Session management with device tracking',
                    'Rate limiting and audit logging'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Installation */}
          {activeSection === 'installation' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 gradient-text">Installation</h1>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Using npm</h2>
                <CodeBlock 
                  id="install-npm"
                  code="npm install simple-authx"
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Using yarn</h2>
                <CodeBlock 
                  id="install-yarn"
                  code="yarn add simple-authx"
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Using pnpm</h2>
                <CodeBlock 
                  id="install-pnpm"
                  code="pnpm add simple-authx"
                />
              </div>

              <div className="bg-dark-secondary p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Package className="text-secondary" />
                  Requirements
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Node.js 16.x or higher</li>
                  <li>• Express.js 4.x or higher</li>
                  <li>• TypeScript 4.5+ (optional, for TypeScript projects)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Quick Start */}
          {activeSection === 'quick-start' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 gradient-text">Quick Start</h1>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Basic Setup</h2>
                <p className="text-gray-300 mb-4">
                  Get started with Simple AuthX in just a few lines of code:
                </p>
                <CodeBlock 
                  id="quick-basic"
                  code={`import express from 'express';
import { createAuth } from 'simple-authx';

const app = express();
const auth = await createAuth();

// Mount authentication routes
app.use('/auth', auth.router);

// Protect your routes
app.get('/protected', auth.protect, (req, res) => {
  res.json({ 
    user: req.user, 
    message: 'Access granted!' 
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Available Endpoints</h2>
                <p className="text-gray-300 mb-4">
                  Simple AuthX automatically creates these endpoints:
                </p>
                <div className="space-y-3">
                  {[
                    { method: 'POST', path: '/auth/register', desc: 'Register a new user' },
                    { method: 'POST', path: '/auth/login', desc: 'Login and get tokens' },
                    { method: 'POST', path: '/auth/refresh', desc: 'Refresh access token' },
                    { method: 'POST', path: '/auth/logout', desc: 'Logout and invalidate tokens' },
                    { method: 'GET', path: '/auth/me', desc: 'Get current user info' }
                  ].map((endpoint, i) => (
                    <div key={i} className="bg-dark-secondary p-4 rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-secondary/20 text-secondary px-3 py-1 rounded text-sm font-mono">
                          {endpoint.method}
                        </span>
                        <code className="text-primary">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-gray-400">{endpoint.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Register a User</h2>
                <CodeBlock 
                  id="quick-register"
                  code={`// POST /auth/register
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "username": "johndoe"
}`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <CodeBlock 
                  id="quick-login"
                  code={`// POST /auth/login
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

// Response
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "username": "johndoe"
  }
}`}
                />
              </div>
            </div>
          )}

          {/* Configuration */}
          {activeSection === 'configuration' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 gradient-text">Configuration</h1>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Full Configuration Example</h2>
                <CodeBlock 
                  id="config-full"
                  code={`import { createAuth } from 'simple-authx';

const auth = await createAuth({
  // Storage configuration
  storage: 'postgres',
  postgres: {
    connectionString: process.env.DATABASE_URL
  },

  // JWT configuration
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: '15m',
    refreshExpiresIn: '7d'
  },

  // Cookie configuration
  cookies: {
    enabled: true,
    refresh: true,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    domain: 'example.com'
  },

  // CSRF protection
  csrf: {
    enabled: true,
    secret: process.env.CSRF_SECRET
  },

  // Rate limiting
  rateLimit: {
    enabled: true,
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000
  },

  // Plugins
  plugins: {
    mfa: {
      enabled: true,
      issuer: 'MyApp',
      digits: 6
    },
    password: {
      minLength: 8,
      minStrength: 3,
      algorithm: 'bcrypt'
    },
    session: {
      enabled: true,
      maxSessions: 5
    }
  }
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
                <p className="text-gray-300 mb-4">
                  Recommended environment variables for production:
                </p>
                <CodeBlock 
                  id="config-env"
                  code={`# Required
JWT_ACCESS_SECRET=your-super-secret-access-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Database (choose one)
DATABASE_URL=postgresql://user:pass@localhost:5432/db
MONGODB_URI=mongodb://localhost:27017/myapp
REDIS_URL=redis://localhost:6379

# Optional
CSRF_SECRET=your-csrf-secret
PORT=3000
NODE_ENV=production`}
                />
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-amber-400">
                  <AlertCircle />
                  Security Best Practices
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Use strong, random secrets for JWT keys (at least 32 characters)</li>
                  <li>• Enable HTTPS in production (set secure: true for cookies)</li>
                  <li>• Rotate secrets periodically</li>
                  <li>• Use environment variables, never hardcode secrets</li>
                  <li>• Enable CSRF protection for cookie-based auth</li>
                </ul>
              </div>
            </div>
          )}

          {/* Authentication */}
          {activeSection === 'authentication' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 gradient-text">Authentication</h1>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Protecting Routes</h2>
                <CodeBlock 
                  id="auth-protect"
                  code={`// Protect a single route
app.get('/profile', auth.protect, (req, res) => {
  res.json({ user: req.user });
});

// Protect multiple routes
const protectedRouter = express.Router();
protectedRouter.use(auth.protect);

protectedRouter.get('/dashboard', (req, res) => {
  res.json({ message: 'Dashboard data' });
});

protectedRouter.get('/settings', (req, res) => {
  res.json({ message: 'User settings' });
});

app.use('/api', protectedRouter);`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Role-Based Access Control</h2>
                <CodeBlock 
                  id="auth-rbac"
                  code={`// Require specific role
app.get('/admin', 
  auth.protect, 
  auth.requireRole('admin'), 
  (req, res) => {
    res.json({ message: 'Admin only' });
  }
);

// Require any of multiple roles
app.get('/moderator', 
  auth.protect, 
  auth.requireRole(['admin', 'moderator']), 
  (req, res) => {
    res.json({ message: 'Admin or moderator' });
  }
);`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Custom User Fields</h2>
                <CodeBlock 
                  id="auth-custom"
                  code={`// Register with custom fields
const user = await auth.register({
  email: 'user@example.com',
  password: 'password123',
  username: 'johndoe',
  // Custom fields
  firstName: 'John',
  lastName: 'Doe',
  age: 25,
  preferences: {
    theme: 'dark',
    notifications: true
  }
});

// Access in protected routes
app.get('/profile', auth.protect, (req, res) => {
  res.json({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    preferences: req.user.preferences
  });
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Token Refresh</h2>
                <CodeBlock 
                  id="auth-refresh"
                  code={`// Manual token refresh
app.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  try {
    const { accessToken, refreshToken: newRefreshToken } = 
      await auth.refreshTokens(refreshToken);
    
    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Automatic refresh with cookies
// Set cookies.refresh: true in config
// Tokens are automatically refreshed via cookies`}
                />
              </div>
            </div>
          )}

          {/* Storage */}
          {activeSection === 'storage' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 gradient-text">Storage Adapters</h1>
              
              <p className="text-gray-300">
                Simple AuthX supports multiple storage backends for user data and tokens.
              </p>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Memory Storage (Development)</h2>
                <CodeBlock 
                  id="storage-memory"
                  code={`const auth = await createAuth({
  storage: 'memory'
});

// Data is stored in memory (lost on restart)
// Perfect for development and testing`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">File Storage</h2>
                <CodeBlock 
                  id="storage-file"
                  code={`const auth = await createAuth({
  storage: 'file',
  file: {
    path: './data',
    filename: 'users.json'
  }
});

// Data stored in JSON file
// Good for small applications`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">PostgreSQL</h2>
                <CodeBlock 
                  id="storage-postgres"
                  code={`const auth = await createAuth({
  storage: 'postgres',
  postgres: {
    connectionString: process.env.DATABASE_URL,
    // or
    host: 'localhost',
    port: 5432,
    database: 'myapp',
    user: 'postgres',
    password: 'password'
  }
});

// Automatically creates tables if they don't exist`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">MongoDB</h2>
                <CodeBlock 
                  id="storage-mongodb"
                  code={`const auth = await createAuth({
  storage: 'mongodb',
  mongodb: {
    uri: process.env.MONGODB_URI,
    database: 'myapp',
    userCollection: 'users',
    tokenCollection: 'tokens'
  }
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Redis</h2>
                <CodeBlock 
                  id="storage-redis"
                  code={`const auth = await createAuth({
  storage: 'redis',
  redis: {
    url: process.env.REDIS_URL,
    // or
    host: 'localhost',
    port: 6379,
    password: 'password',
    db: 0
  }
});

// Great for distributed systems and caching`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Custom Adapter</h2>
                <CodeBlock 
                  id="storage-custom"
                  code={`import { StorageAdapter } from 'simple-authx';

class MyCustomAdapter implements StorageAdapter {
  async saveUser(user) { /* ... */ }
  async findUser(query) { /* ... */ }
  async updateUser(id, data) { /* ... */ }
  async deleteUser(id) { /* ... */ }
  async saveToken(token) { /* ... */ }
  async findToken(query) { /* ... */ }
  async deleteToken(id) { /* ... */ }
}

const auth = await createAuth({
  adapter: new MyCustomAdapter()
});`}
                />
              </div>
            </div>
          )}

          {/* MFA */}
          {activeSection === 'mfa' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 gradient-text">MFA/2FA</h1>
              
              <p className="text-gray-300 mb-4">
                Simple AuthX provides built-in support for Multi-Factor Authentication using TOTP (Time-based One-Time Passwords).
              </p>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Enable MFA Plugin</h2>
                <CodeBlock 
                  id="mfa-config"
                  code={`const auth = await createAuth({
  plugins: {
    mfa: {
      enabled: true,
      issuer: 'MyApp',
      digits: 6,
      period: 30
    }
  }
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Generate MFA Secret</h2>
                <CodeBlock 
                  id="mfa-generate"
                  code={`app.post('/mfa/setup', auth.protect, async (req, res) => {
  const userId = req.user.id;
  
  const { secret, qrCode, backupCodes } = 
    await auth.mfa.generateSecret(userId);
  
  res.json({
    secret,      // TOTP secret key
    qrCode,      // Base64 QR code image
    backupCodes  // Array of backup codes
  });
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Verify MFA Token</h2>
                <CodeBlock 
                  id="mfa-verify"
                  code={`app.post('/mfa/enable', auth.protect, async (req, res) => {
  const { token, secret } = req.body;
  const userId = req.user.id;
  
  const isValid = auth.mfa.verifyToken(secret, token);
  
  if (isValid) {
    await auth.mfa.enableForUser(userId, secret);
    res.json({ message: 'MFA enabled successfully' });
  } else {
    res.status(400).json({ error: 'Invalid token' });
  }
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Login with MFA</h2>
                <CodeBlock 
                  id="mfa-login"
                  code={`app.post('/login-mfa', async (req, res) => {
  const { email, password, mfaToken } = req.body;
  
  try {
    const result = await auth.login({
      email,
      password,
      mfaToken
    });
    
    res.json(result);
  } catch (error) {
    if (error.code === 'MFA_REQUIRED') {
      res.status(200).json({ 
        mfaRequired: true,
        tempToken: error.tempToken 
      });
    } else {
      res.status(401).json({ error: error.message });
    }
  }
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Backup Codes</h2>
                <CodeBlock 
                  id="mfa-backup"
                  code={`// Use backup code
app.post('/mfa/verify-backup', async (req, res) => {
  const { userId, backupCode } = req.body;
  
  const isValid = await auth.mfa.verifyBackupCode(
    userId, 
    backupCode
  );
  
  if (isValid) {
    // Backup code is valid and consumed
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid backup code' });
  }
});

// Regenerate backup codes
app.post('/mfa/regenerate-backup', auth.protect, async (req, res) => {
  const backupCodes = await auth.mfa.regenerateBackupCodes(
    req.user.id
  );
  
  res.json({ backupCodes });
});`}
                />
              </div>
            </div>
          )}

          {/* Middleware */}
          {activeSection === 'middleware' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 gradient-text">Middleware</h1>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">auth.protect</h2>
                <p className="text-gray-300 mb-4">
                  Verify JWT token and add user to request object.
                </p>
                <CodeBlock 
                  id="mw-protect"
                  code={`app.get('/protected', auth.protect, (req, res) => {
  // req.user contains authenticated user
  res.json({ user: req.user });
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">auth.requireRole</h2>
                <p className="text-gray-300 mb-4">
                  Check if user has required role(s).
                </p>
                <CodeBlock 
                  id="mw-role"
                  code={`// Single role
app.get('/admin', 
  auth.protect, 
  auth.requireRole('admin'), 
  handler
);

// Multiple roles (OR)
app.get('/moderator', 
  auth.protect, 
  auth.requireRole(['admin', 'moderator']), 
  handler
);`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">auth.optional</h2>
                <p className="text-gray-300 mb-4">
                  Authenticate if token provided, but don't require it.
                </p>
                <CodeBlock 
                  id="mw-optional"
                  code={`app.get('/public', auth.optional, (req, res) => {
  if (req.user) {
    res.json({ 
      message: 'Hello ' + req.user.username,
      authenticated: true 
    });
  } else {
    res.json({ 
      message: 'Hello guest',
      authenticated: false 
    });
  }
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Custom Middleware</h2>
                <CodeBlock 
                  id="mw-custom"
                  code={`// Check if email is verified
const requireVerified = (req, res, next) => {
  if (!req.user.emailVerified) {
    return res.status(403).json({ 
      error: 'Email not verified' 
    });
  }
  next();
};

app.get('/verified-only', 
  auth.protect, 
  requireVerified, 
  (req, res) => {
    res.json({ message: 'Access granted' });
  }
);`}
                />
              </div>
            </div>
          )}

          {/* API Reference */}
          {activeSection === 'api-reference' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 gradient-text">API Reference</h1>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">createAuth(config)</h2>
                <p className="text-gray-300 mb-4">
                  Creates and initializes the authentication instance.
                </p>
                <CodeBlock 
                  id="api-create"
                  code={`const auth = await createAuth({
  storage: 'postgres',
  jwt: { ... },
  cookies: { ... },
  plugins: { ... }
});`}
                />
              </div>

              <div className="bg-dark-secondary rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 font-semibold">
                  Auth Methods
                </div>
                <div className="divide-y divide-gray-800">
                  {[
                    {
                      method: 'auth.register(data)',
                      desc: 'Register a new user',
                      returns: 'Promise<User>'
                    },
                    {
                      method: 'auth.login(credentials)',
                      desc: 'Login user and return tokens',
                      returns: 'Promise<{ user, accessToken, refreshToken }>'
                    },
                    {
                      method: 'auth.logout(token)',
                      desc: 'Logout user and invalidate token',
                      returns: 'Promise<void>'
                    },
                    {
                      method: 'auth.refreshTokens(refreshToken)',
                      desc: 'Refresh access token',
                      returns: 'Promise<{ accessToken, refreshToken }>'
                    },
                    {
                      method: 'auth.verifyToken(token)',
                      desc: 'Verify JWT token',
                      returns: 'Promise<User>'
                    },
                    {
                      method: 'auth.changePassword(userId, oldPass, newPass)',
                      desc: 'Change user password',
                      returns: 'Promise<void>'
                    },
                    {
                      method: 'auth.resetPassword(email)',
                      desc: 'Send password reset email',
                      returns: 'Promise<void>'
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-4">
                      <code className="text-secondary text-sm font-mono">
                        {item.method}
                      </code>
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Returns: <code>{item.returns}</code>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-secondary rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 font-semibold">
                  MFA Methods
                </div>
                <div className="divide-y divide-gray-800">
                  {[
                    {
                      method: 'auth.mfa.generateSecret(userId)',
                      desc: 'Generate MFA secret and QR code',
                      returns: 'Promise<{ secret, qrCode, backupCodes }>'
                    },
                    {
                      method: 'auth.mfa.verifyToken(secret, token)',
                      desc: 'Verify TOTP token',
                      returns: 'boolean'
                    },
                    {
                      method: 'auth.mfa.enableForUser(userId, secret)',
                      desc: 'Enable MFA for user',
                      returns: 'Promise<void>'
                    },
                    {
                      method: 'auth.mfa.disableForUser(userId)',
                      desc: 'Disable MFA for user',
                      returns: 'Promise<void>'
                    },
                    {
                      method: 'auth.mfa.verifyBackupCode(userId, code)',
                      desc: 'Verify and consume backup code',
                      returns: 'Promise<boolean>'
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-4">
                      <code className="text-secondary text-sm font-mono">
                        {item.method}
                      </code>
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Returns: <code>{item.returns}</code>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-secondary rounded-lg border border-gray-800 overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 font-semibold">
                  Middleware
                </div>
                <div className="divide-y divide-gray-800">
                  {[
                    {
                      method: 'auth.protect',
                      desc: 'Require authentication',
                      usage: 'app.get(\'/path\', auth.protect, handler)'
                    },
                    {
                      method: 'auth.optional',
                      desc: 'Optional authentication',
                      usage: 'app.get(\'/path\', auth.optional, handler)'
                    },
                    {
                      method: 'auth.requireRole(role)',
                      desc: 'Require specific role(s)',
                      usage: 'app.get(\'/path\', auth.requireRole(\'admin\'), handler)'
                    },
                    {
                      method: 'auth.router',
                      desc: 'Pre-built auth routes',
                      usage: 'app.use(\'/auth\', auth.router)'
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-4">
                      <code className="text-secondary text-sm font-mono">
                        {item.method}
                      </code>
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                      <pre className="text-gray-500 text-xs mt-2 bg-black/30 p-2 rounded overflow-x-auto">
                        <code>{item.usage}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Examples */}
          {activeSection === 'examples' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mb-4 gradient-text">Examples</h1>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Complete Express App</h2>
                <CodeBlock 
                  id="ex-complete"
                  code={`import express from 'express';
import { createAuth } from 'simple-authx';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize auth
const auth = await createAuth({
  storage: 'postgres',
  postgres: {
    connectionString: process.env.DATABASE_URL
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: '15m',
    refreshExpiresIn: '7d'
  },
  cookies: {
    enabled: true,
    refresh: true,
    secure: process.env.NODE_ENV === 'production'
  },
  plugins: {
    mfa: {
      enabled: true,
      issuer: 'MyApp'
    },
    password: {
      minLength: 8,
      minStrength: 3
    }
  }
});

// Mount auth routes
app.use('/auth', auth.router);

// Public route
app.get('/api/public', (req, res) => {
  res.json({ message: 'Public endpoint' });
});

// Protected route
app.get('/api/profile', auth.protect, (req, res) => {
  res.json({ user: req.user });
});

// Admin only route
app.get('/api/admin', 
  auth.protect, 
  auth.requireRole('admin'), 
  (req, res) => {
    res.json({ message: 'Admin area' });
  }
);

// MFA setup
app.post('/api/mfa/setup', auth.protect, async (req, res) => {
  try {
    const result = await auth.mfa.generateSecret(req.user.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: 'Internal server error' 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">With TypeScript</h2>
                <CodeBlock 
                  id="ex-typescript"
                  code={`import express, { Request, Response, NextFunction } from 'express';
import { createAuth, AuthUser } from 'simple-authx';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const app = express();
app.use(express.json());

const auth = await createAuth({
  storage: 'postgres',
  postgres: {
    connectionString: process.env.DATABASE_URL!
  }
});

app.use('/auth', auth.router);

app.get('/api/profile', 
  auth.protect, 
  (req: Request, res: Response) => {
    // req.user is typed as AuthUser
    res.json({ 
      userId: req.user!.id,
      email: req.user!.email 
    });
  }
);

app.listen(3000);`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Social OAuth Integration</h2>
                <CodeBlock 
                  id="ex-oauth"
                  code={`import { createAuth } from 'simple-authx';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const auth = await createAuth({
  storage: 'postgres',
  postgres: { connectionString: process.env.DATABASE_URL }
});

// Configure Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user
      let user = await auth.findUser({ 
        googleId: profile.id 
      });
      
      if (!user) {
        user = await auth.register({
          email: profile.emails[0].value,
          googleId: profile.id,
          username: profile.displayName,
          emailVerified: true
        });
      }
      
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
));

// OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { 
    session: false 
  }),
  async (req, res) => {
    const user = req.user;
    const tokens = await auth.generateTokens(user);
    res.json(tokens);
  }
);`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Rate Limiting</h2>
                <CodeBlock 
                  id="ex-ratelimit"
                  code={`import { createAuth } from 'simple-authx';
import rateLimit from 'express-rate-limit';

const auth = await createAuth({
  storage: 'redis',
  redis: { url: process.env.REDIS_URL },
  rateLimit: {
    enabled: true,
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000 // 15 minutes
  }
});

// Additional rate limiting for sensitive endpoints
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});

app.post('/auth/login', loginLimiter, async (req, res) => {
  try {
    const result = await auth.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">WebSocket Authentication</h2>
                <CodeBlock 
                  id="ex-websocket"
                  code={`import { Server } from 'socket.io';
import { createAuth } from 'simple-authx';

const auth = await createAuth({
  storage: 'redis',
  redis: { url: process.env.REDIS_URL }
});

const io = new Server(server, {
  cors: { origin: '*' }
});

// WebSocket authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const user = await auth.verifyToken(token);
    socket.data.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  const user = socket.data.user;
  console.log(\`User \${user.email} connected\`);
  
  socket.on('message', (data) => {
    // User is authenticated
    io.emit('message', {
      user: user.username,
      message: data
    });
  });
});`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
                <CodeBlock 
                  id="ex-email"
                  code={`import { createAuth } from 'simple-authx';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const auth = await createAuth({
  storage: 'postgres',
  postgres: { connectionString: process.env.DATABASE_URL }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send verification email
app.post('/auth/send-verification', auth.protect, async (req, res) => {
  const user = req.user;
  
  if (user.emailVerified) {
    return res.json({ message: 'Email already verified' });
  }
  
  // Generate verification token
  const token = crypto.randomBytes(32).toString('hex');
  await auth.saveVerificationToken(user.id, token);
  
  const verifyUrl = \`\${process.env.APP_URL}/verify?token=\${token}\`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify your email',
    html: \`
      <h1>Verify Your Email</h1>
      <p>Click the link below to verify your email:</p>
      <a href="\${verifyUrl}">Verify Email</a>
    \`
  });
  
  res.json({ message: 'Verification email sent' });
});

// Verify email
app.get('/auth/verify', async (req, res) => {
  const { token } = req.query;
  
  try {
    const userId = await auth.verifyEmailToken(token);
    await auth.updateUser(userId, { emailVerified: true });
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});`}
                />
              </div>

              <div className="bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Github className="text-secondary" />
                  More Examples
                </h3>
                <p className="text-gray-300 mb-4">
                  Find more examples and use cases in our GitHub repository:
                </p>
                <a 
                  href="https://github.com/Antonymwangi20/simple-authx/tree/main/simple-authx/examples"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-primary text-dark font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  View Examples on GitHub
                  <ChevronRight size={18} />
                </a>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-12 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                    src="/icon.png" 
                    alt="Simple AuthX Logo" 
                    className="w-10 h-10 sm:w-16 sm:h-16"
                />
                <span className="font-bold gradient-text">Simple AuthX</span>
              </div>
              <p className="text-sm text-gray-400">
                Secure, lightweight authentication for Node.js
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Documentation</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {sections.slice(0, 5).map(section => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className="hover:text-secondary transition-colors"
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="https://github.com/Antonymwangi20/simple-authx" target="_blank" className="hover:text-secondary transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Antonymwangi20/simple-authx/issues" target="_blank" className="hover:text-secondary transition-colors">
                    Issues
                  </a>
                </li>
                <li>
                  <a href="https://www.npmjs.com/package/simple-authx" target="_blank" className="hover:text-secondary transition-colors">
                    npm Package
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-secondary transition-colors">
                    Landing Page
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="https://github.com/Antonymwangi20/simple-authx/discussions" target="_blank" className="hover:text-secondary transition-colors">
                    Discussions
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Antonymwangi20/simple-authx/blob/main/CONTRIBUTING.md" target="_blank" className="hover:text-secondary transition-colors">
                    Contributing
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Antonymwangi20" target="_blank" className="hover:text-secondary transition-colors">
                    Author
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Simple AuthX. MIT Licensed. Built by <a href="https://github.com/Antonymwangi20" target="_blank" className="text-secondary hover:text-primary">Antony Mwangi</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}