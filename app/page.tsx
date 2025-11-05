'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, Lock, Zap, Package, Code, CheckCircle, Copy, 
  Github, Twitter, BookOpen, Download, Star, Users, ChevronRight,
  Server, Database, Key, Cookie, RefreshCw, FileCode
} from 'lucide-react';

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen">
      {/* Animated Background Blobs */}
      <div className="blob w-[300px] h-[300px] bg-gradient-to-br from-primary to-secondary top-[10%] left-[5%]" style={{ animationDuration: '25s' }} />
      <div className="blob w-[400px] h-[400px] bg-gradient-to-br from-secondary to-primary bottom-[15%] right-[10%]" style={{ animationDuration: '30s' }} />
      <div className="blob w-[250px] h-[250px] bg-gradient-to-br from-primary to-secondary top-[50%] left-[80%]" style={{ animationDuration: '35s' }} />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-dark-secondary/80 border-b border-gray-800">
  <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-2 sm:gap-3">
      <img 
        src="/icon.png" 
        alt="Simple AuthX Logo" 
        className="w-7 h-7 sm:w-9 sm:h-9"
      />
      <h1 className="text-xl sm:text-2xl font-bold gradient-text">Simple AuthX</h1>
    </div>
    <nav className="flex gap-3 sm:gap-6 text-sm sm:text-base">
      <a href="#features" className="hover:text-secondary transition-colors">Features</a>
      <a href="#install" className="hover:text-secondary transition-colors">Install</a>
      <a href="/docs" className="hover:text-secondary transition-colors hidden sm:inline">Docs</a>
      <a href="https://github.com/Antonymwangi20/simple-authx" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors flex items-center gap-1 sm:gap-2">
        <Github size={18} /> <span className="hidden sm:inline">GitHub</span>
      </a>
</nav>
  </div>
</header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-3 sm:px-4 py-2 bg-dark-secondary rounded-full text-xs sm:text-sm">
            <span className="text-secondary">✨ v2.0.0</span> · Production Ready
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 gradient-text leading-tight">
            Secure & Lightweight<br />Auth for Node.js
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Simple AuthX provides JWT authentication, password hashing, and refresh token support with zero hassle. 
            Plug it into your Express app and secure your routes in minutes.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 px-4">
            <div className="bg-dark-secondary px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
              <Package size={14} className="text-secondary sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">npm v2.0.0</span>
            </div>
            <div className="bg-dark-secondary px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
              <Star size={14} className="text-yellow-500 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">MIT License</span>
            </div>
            <div className="bg-dark-secondary px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
              <Download size={14} className="text-primary sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Zero Config</span>
            </div>
            <div className="bg-dark-secondary px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
              <Users size={14} className="text-secondary sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Production Ready</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
            <a href="/docs" className="bg-secondary hover:bg-primary text-dark font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
              Get Started <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </a>
  <a href="https://github.com/Antonymwangi20/simple-authx" target="_blank" rel="noopener noreferrer" 
     className="bg-dark-secondary hover:bg-gray-800 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
    <Github size={16} className="sm:w-[18px] sm:h-[18px]" /> View on GitHub
  </a>
</div>
        </div>
      </section>

      {/* Quick Start Code */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center gradient-text">
            Get Started in 3 Simple Steps
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* Step 1 */}
            <div className="bg-dark-secondary rounded-xl p-4 sm:p-6 border border-gray-800">
              <div className="text-secondary font-bold text-lg mb-2">1. Install</div>
              <code className="text-xs sm:text-sm text-gray-300 block">npm install simple-authx</code>
            </div>
            
            {/* Step 2 */}
            <div className="bg-dark-secondary rounded-xl p-4 sm:p-6 border border-gray-800">
              <div className="text-secondary font-bold text-lg mb-2">2. Initialize</div>
              <code className="text-xs sm:text-sm text-gray-300 block">const auth = await createAuth();</code>
            </div>
            
            {/* Step 3 */}
            <div className="bg-dark-secondary rounded-xl p-4 sm:p-6 border border-gray-800">
              <div className="text-secondary font-bold text-lg mb-2">3. Protect</div>
              <code className="text-xs sm:text-sm text-gray-300 block">app.get('/api', auth.protect, ...)</code>
            </div>
          </div>

          <div className="bg-dark-secondary rounded-xl p-4 sm:p-6 md:p-8 border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-secondary" size={24} />
              <h4 className="text-xl sm:text-2xl font-bold">Complete Example</h4>
            </div>
            <div className="code-block">
              <pre className="text-xs sm:text-sm text-gray-300 overflow-x-auto">
                <code>{`import express from 'express';
import { createAuth } from 'simple-authx';

const app = express();
const auth = await createAuth();

// Mount authentication routes
app.use('/auth', auth.router);

// Protect your routes
app.get('/protected', auth.protect, (req, res) => {
  res.json({ user: req.user, message: 'Access granted!' });
});

app.listen(3000);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-text">Why Choose Simple AuthX?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Shield, title: 'JWT Authentication', desc: 'Access & refresh tokens with automatic rotation and reuse detection' },
            { icon: Lock, title: 'Password Security', desc: 'Built-in bcrypt/argon2 hashing with strength validation' },
            { icon: Cookie, title: 'Cookie-based Auth', desc: 'Secure httpOnly cookies with CSRF protection' },
            { icon: Database, title: 'Multiple Storage', desc: 'Memory, File, PostgreSQL, MongoDB, Redis adapters' },
            { icon: Key, title: 'MFA/2FA Ready', desc: 'TOTP, QR codes, and backup codes out of the box' },
            { icon: Server, title: 'Express Integration', desc: 'Auto-generated routes: /register, /login, /refresh, /logout' },
            { icon: RefreshCw, title: 'Token Rotation', desc: 'Automatic refresh token rotation for enhanced security' },
            { icon: Users, title: 'Session Management', desc: 'Multi-session support with device tracking' },
            { icon: FileCode, title: 'TypeScript Support', desc: 'Full type definitions included' },
          ].map((feature, i) => (
            <FeatureCard key={i} {...feature} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Installation */}
      <section id="install" className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 gradient-text">Get Started in Seconds</h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-dark-secondary rounded-xl p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-gray-400">Install via npm</span>
              <button
                onClick={() => copyToClipboard('npm install simple-authx')}
                className="text-secondary hover:text-primary transition-colors"
              >
                {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <code className="text-sm sm:text-lg text-secondary block">npm install simple-authx</code>
          </div>
          <a href="/docs" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-dark font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base">
            <BookOpen size={18} /> Read Full Documentation
          </a>
        </div>
      </section>

      {/* Documentation Preview */}
      <section id="docs" className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-text">Documentation</h2>
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <DocCard
            title="Basic Usage"
            code={`import { createAuth } from 'simple-authx';

// Zero-config setup
const auth = await createAuth();

// Mount routes
app.use('/auth', auth.router);

// Protect routes
app.get('/profile', auth.protect, (req, res) => {
  res.json({ user: req.user });
});`}
          />
          <DocCard
            title="Production Setup"
            code={`const auth = await createAuth({
  storage: 'postgres',
  postgres: {
    connectionString: process.env.DATABASE_URL
  },
  cookies: {
    refresh: true,
    secure: true,
    httpOnly: true
  },
  csrf: { enabled: true },
  plugins: {
    mfa: { issuer: 'MyApp' },
    password: { minStrength: 3 }
  }
});`}
          />
          <DocCard
            title="With MFA/2FA"
            code={`// Enable MFA for user
const { secret, qrCode, backupCodes } = 
  await auth.mfa.generateSecret();

// Verify MFA token
const isValid = auth.mfa.verifyToken(
  secret, 
  userToken
);`}
          />
          <DocCard
            title="Custom Storage"
            code={`import { PostgresAdapter } from 'simple-authx';

const adapter = new PostgresAdapter({
  connectionString: process.env.DATABASE_URL
});

const auth = await createAuth({
  adapter
});`}
          />
        </div>
      </section>

      {/* Features List */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-text">Complete Feature Set</h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              'JWT Access & Refresh Tokens',
              'Token Rotation & Reuse Detection',
              'Password Hashing (bcrypt/argon2)',
              'Cookie-based Authentication',
              'CSRF Protection',
              'Rate Limiting',
              'MFA/2FA Support',
              'Social OAuth (Google, GitHub, Facebook)',
              'Session Management',
              'Password Strength Validation',
              'Audit Logging',
              'Multiple Storage Adapters',
              'TypeScript Definitions',
              'Express Middleware',
              'Zero Configuration',
              'Production Ready',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 bg-dark-secondary p-3 sm:p-4 rounded-lg hover:bg-gray-800 transition-colors">
                <CheckCircle size={18} className="text-secondary flex-shrink-0 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-secondary p-1 rounded-2xl">
          <div className="bg-dark rounded-2xl p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Ready to Secure Your App?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
              Join developers who trust Simple AuthX for production authentication
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a href="#install" className="bg-secondary hover:bg-primary text-dark font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all hover:scale-105 text-sm sm:text-base">
                Get Started Now
              </a>
              <a href="https://github.com/Antonymwangi20/simple-authx" target="_blank" rel="noopener noreferrer"
                 className="bg-dark-secondary hover:bg-gray-800 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
                <Github size={18} /> Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-dark-secondary border-t border-gray-800 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold gradient-text mb-3 sm:mb-4">Simple AuthX</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Secure, lightweight authentication for Node.js applications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><a href="/docs" className="hover:text-secondary transition-colors">Documentation</a></li>
                <li><a href="https://github.com/Antonymwangi20/simple-authx/tree/main/examples" target="_blank" className="hover:text-secondary transition-colors">Examples</a></li>
                <li><a href="https://github.com/Antonymwangi20/simple-authx/blob/main/MIGRATION.md" target="_blank" className="hover:text-secondary transition-colors">Migration Guide</a></li>
                <li><a href="https://github.com/Antonymwangi20/simple-authx/blob/main/CHANGELOG.md" target="_blank" className="hover:text-secondary transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Community</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><a href="https://github.com/Antonymwangi20/simple-authx" target="_blank" className="hover:text-secondary transition-colors">GitHub</a></li>
                <li><a href="https://github.com/Antonymwangi20/simple-authx/issues" target="_blank" className="hover:text-secondary transition-colors">Issues</a></li>
                <li><a href="https://github.com/Antonymwangi20/simple-authx/discussions" target="_blank" className="hover:text-secondary transition-colors">Discussions</a></li>
                <li><a href="https://github.com/Antonymwangi20/simple-authx/blob/main/CONTRIBUTING.md" target="_blank" className="hover:text-secondary transition-colors">Contributing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h4>
              <div className="flex gap-3 sm:gap-4">
                <a href="https://github.com/Antonymwangi20" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>© 2025 Simple AuthX. MIT Licensed. Built with ❤️ by <a href="https://github.com/Antonymwangi20" target="_blank" className="text-secondary hover:text-primary">Antony Mwangi</a></p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay }: any) {
  return (
    <div 
      className="bg-dark-secondary p-4 sm:p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/20 border border-gray-800 animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="text-secondary mb-3 sm:mb-4" size={28} />
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-400">{desc}</p>
    </div>
  );
}

function DocCard({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-dark-secondary rounded-xl p-4 sm:p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        <button onClick={copyCode} className="text-gray-400 hover:text-secondary transition-colors flex-shrink-0">
          {copied ? <CheckCircle size={18} className="sm:w-5 sm:h-5" /> : <Copy size={18} className="sm:w-5 sm:h-5" />}
        </button>
      </div>
      <div className="code-block">
        <pre className="text-xs sm:text-sm text-gray-300 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
