#!/usr/bin/env node

/**
 * Environment Switcher Script
 * 
 * Usage:
 * node scripts/switch-env.js dev    # Switch to development
 * node scripts/switch-env.js prod   # Switch to production
 */

const fs = require('fs');
const path = require('path');

const envType = process.argv[2];

if (!envType || !['dev', 'prod'].includes(envType)) {
  console.log('Usage: node scripts/switch-env.js [dev|prod]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/switch-env.js dev   # Switch to development');
  console.log('  node scripts/switch-env.js prod  # Switch to production');
  process.exit(1);
}

const envLocalPath = path.join(__dirname, '..', '.env.local');

// Development configuration
const devConfig = `# API Configuration - Development
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1

# App Configuration
NEXT_PUBLIC_APP_NAME=Billio
NEXT_PUBLIC_APP_DESCRIPTION=Invoice Management System

# Production API URL (uncomment when deploying)
# NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api/v1
`;

// Production configuration
const prodConfig = `# API Configuration - Production
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api/v1

# App Configuration
NEXT_PUBLIC_APP_NAME=Billio
NEXT_PUBLIC_APP_DESCRIPTION=Invoice Management System

# Development API URL (uncomment for local development)
# NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
`;

try {
  if (envType === 'dev') {
    fs.writeFileSync(envLocalPath, devConfig);
    console.log('✅ Switched to DEVELOPMENT environment');
    console.log('   API URL: http://localhost:4000/api/v1');
  } else if (envType === 'prod') {
    fs.writeFileSync(envLocalPath, prodConfig);
    console.log('✅ Switched to PRODUCTION environment');
    console.log('   API URL: https://yourdomain.com/api/v1');
    console.log('');
    console.log('⚠️  Remember to update the domain in .env.local with your actual domain!');
  }
  
  console.log('');
  console.log('🔄 Restart your development server for changes to take effect:');
  console.log('   npm run dev');
  
} catch (error) {
  console.error('❌ Error switching environment:', error.message);
  process.exit(1);
}
