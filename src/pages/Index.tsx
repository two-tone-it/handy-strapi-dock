
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Code, Database, Docker, FileCode, Github, Laptop, Server } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: message,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Strapi CMS Docker Setup</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A production-ready Docker setup for Strapi CMS with PostgreSQL
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <Docker className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <CardTitle>Docker Setup</CardTitle>
              <CardDescription>Complete Docker configuration for development and production</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <Database className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle>PostgreSQL</CardTitle>
              <CardDescription>Integrated PostgreSQL database with proper configurations</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                <Server className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <CardTitle>Deployment Ready</CardTitle>
              <CardDescription>Ready for deployment to Railway, Render, or your own server</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Project Files</h2>
            <Tabs defaultValue="project-structure" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="project-structure">Structure</TabsTrigger>
                <TabsTrigger value="dockerfile">Dockerfile</TabsTrigger>
                <TabsTrigger value="docker-compose">Docker Compose</TabsTrigger>
                <TabsTrigger value="env">Environment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="project-structure" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileCode className="mr-2 h-5 w-5" /> 
                      Project Structure
                    </CardTitle>
                    <CardDescription>
                      The structure of your cms-handyman project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-96">
                      <pre>{`cms-handyman/
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── package.json
├── src/
│   ├── api/
│   │   ├── article/
│   │   │   ├── content-types/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   └── service/
│   │       ├── content-types/
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── services/
│   ├── config/
│   │   ├── admin.js
│   │   ├── database.js
│   │   ├── middlewares.js
│   │   └── server.js
│   └── index.js
└── README.md`}</pre>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="ml-auto" 
                      variant="outline"
                      onClick={() => copyToClipboard(`cms-handyman/
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── package.json
├── src/
│   ├── api/
│   │   ├── article/
│   │   │   ├── content-types/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   └── service/
│   │       ├── content-types/
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── services/
│   ├── config/
│   │   ├── admin.js
│   │   ├── database.js
│   │   ├── middlewares.js
│   │   └── server.js
│   └── index.js
└── README.md`, "Project structure has been copied to clipboard!")}
                    >
                      Copy to Clipboard
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="dockerfile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Docker className="mr-2 h-5 w-5" /> 
                      Dockerfile
                    </CardTitle>
                    <CardDescription>
                      Multi-stage Dockerfile for production
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-96">
                      <pre>{`# Stage 1: Dependencies
FROM node:18-alpine as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine as runner
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache vips-dev

ENV NODE_ENV=production

# Create a dedicated strapi user
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 --ingroup strapi strapi

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/favicon.ico ./favicon.ico
COPY --from=builder /app/public ./public
COPY --from=builder /app/database ./database

# Set proper permissions
RUN mkdir -p /app/.tmp && \
    chown -R strapi:strapi /app

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]`}</pre>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="ml-auto" 
                      variant="outline"
                      onClick={() => copyToClipboard(`# Stage 1: Dependencies
FROM node:18-alpine as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine as runner
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache vips-dev

ENV NODE_ENV=production

# Create a dedicated strapi user
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 --ingroup strapi strapi

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/favicon.ico ./favicon.ico
COPY --from=builder /app/public ./public
COPY --from=builder /app/database ./database

# Set proper permissions
RUN mkdir -p /app/.tmp && \
    chown -R strapi:strapi /app

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]`, "Dockerfile has been copied to clipboard!")}
                    >
                      Copy to Clipboard
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="docker-compose" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="mr-2 h-5 w-5" /> 
                      Docker Compose Files
                    </CardTitle>
                    <CardDescription>
                      Development and production docker-compose files
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">docker-compose.yml (Development)</h3>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-60 mb-6">
                      <pre>{`version: '3'

services:
  strapi:
    image: node:18-alpine
    container_name: cms-handyman
    working_dir: /app
    env_file: .env
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: \${DATABASE_NAME}
      DATABASE_USERNAME: \${DATABASE_USERNAME}
      DATABASE_PASSWORD: \${DATABASE_PASSWORD}
      NODE_ENV: development
    volumes:
      - ./:/app
    ports:
      - '1337:1337'
    command: sh -c "npm install && npm run develop"
    depends_on:
      - postgres
    networks:
      - strapi-network
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    container_name: cms-handyman-postgres
    platform: linux/amd64
    environment:
      POSTGRES_USER: \${DATABASE_USERNAME}
      POSTGRES_PASSWORD: \${DATABASE_PASSWORD}
      POSTGRES_DB: \${DATABASE_NAME}
    ports:
      - '5432:5432'
    volumes:
      - strapi-data:/var/lib/postgresql/data
    networks:
      - strapi-network
    restart: unless-stopped

volumes:
  strapi-data:

networks:
  strapi-network:
    driver: bridge`}</pre>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">docker-compose.prod.yml (Production)</h3>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-60">
                      <pre>{`version: '3'

services:
  strapi:
    container_name: cms-handyman
    build:
      context: .
      dockerfile: Dockerfile
    env_file: .env
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: \${DATABASE_NAME}
      DATABASE_USERNAME: \${DATABASE_USERNAME}
      DATABASE_PASSWORD: \${DATABASE_PASSWORD}
      NODE_ENV: production
    ports:
      - '1337:1337'
    depends_on:
      - postgres
    networks:
      - strapi-network
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    container_name: cms-handyman-postgres
    platform: linux/amd64
    environment:
      POSTGRES_USER: \${DATABASE_USERNAME}
      POSTGRES_PASSWORD: \${DATABASE_PASSWORD}
      POSTGRES_DB: \${DATABASE_NAME}
    volumes:
      - strapi-data:/var/lib/postgresql/data
    networks:
      - strapi-network
    restart: unless-stopped

volumes:
  strapi-data:

networks:
  strapi-network:
    driver: bridge`}</pre>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => copyToClipboard(`version: '3'

services:
  strapi:
    image: node:18-alpine
    container_name: cms-handyman
    working_dir: /app
    env_file: .env
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: \${DATABASE_NAME}
      DATABASE_USERNAME: \${DATABASE_USERNAME}
      DATABASE_PASSWORD: \${DATABASE_PASSWORD}
      NODE_ENV: development
    volumes:
      - ./:/app
    ports:
      - '1337:1337'
    command: sh -c "npm install && npm run develop"
    depends_on:
      - postgres
    networks:
      - strapi-network
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    container_name: cms-handyman-postgres
    platform: linux/amd64
    environment:
      POSTGRES_USER: \${DATABASE_USERNAME}
      POSTGRES_PASSWORD: \${DATABASE_PASSWORD}
      POSTGRES_DB: \${DATABASE_NAME}
    ports:
      - '5432:5432'
    volumes:
      - strapi-data:/var/lib/postgresql/data
    networks:
      - strapi-network
    restart: unless-stopped

volumes:
  strapi-data:

networks:
  strapi-network:
    driver: bridge`, "Development docker-compose.yml has been copied to clipboard!")}
                    >
                      Copy Development
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => copyToClipboard(`version: '3'

services:
  strapi:
    container_name: cms-handyman
    build:
      context: .
      dockerfile: Dockerfile
    env_file: .env
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: \${DATABASE_NAME}
      DATABASE_USERNAME: \${DATABASE_USERNAME}
      DATABASE_PASSWORD: \${DATABASE_PASSWORD}
      NODE_ENV: production
    ports:
      - '1337:1337'
    depends_on:
      - postgres
    networks:
      - strapi-network
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    container_name: cms-handyman-postgres
    platform: linux/amd64
    environment:
      POSTGRES_USER: \${DATABASE_USERNAME}
      POSTGRES_PASSWORD: \${DATABASE_PASSWORD}
      POSTGRES_DB: \${DATABASE_NAME}
    volumes:
      - strapi-data:/var/lib/postgresql/data
    networks:
      - strapi-network
    restart: unless-stopped

volumes:
  strapi-data:

networks:
  strapi-network:
    driver: bridge`, "Production docker-compose.prod.yml has been copied to clipboard!")}
                    >
                      Copy Production
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="env" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileCode className="mr-2 h-5 w-5" /> 
                      Environment Variables
                    </CardTitle>
                    <CardDescription>
                      Required environment variables for your Strapi app
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-96">
                      <pre>{`# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password

# Admin Panel JWT Configuration
ADMIN_JWT_SECRET=change_this_admin_secret_in_production

# Strapi Application Configuration
APP_KEYS=change_this_app_key1,change_this_app_key2,change_this_app_key3,change_this_app_key4
API_TOKEN_SALT=change_this_api_token_salt_in_production
JWT_SECRET=change_this_jwt_secret_in_production

# Strapi Config
STRAPI_TELEMETRY_DISABLED=true
STRAPI_LICENSE=UNLICENSED
NODE_ENV=development
HOST=0.0.0.0
PORT=1337

# Optional Email Configuration
# EMAIL_PROVIDER=sendgrid
# SENDGRID_API_KEY=your_sendgrid_api_key
# SENDGRID_DEFAULT_FROM=your-email@example.com
# SENDGRID_DEFAULT_REPLY_TO=your-email@example.com`}</pre>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="ml-auto" 
                      variant="outline"
                      onClick={() => copyToClipboard(`# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password

# Admin Panel JWT Configuration
ADMIN_JWT_SECRET=change_this_admin_secret_in_production

# Strapi Application Configuration
APP_KEYS=change_this_app_key1,change_this_app_key2,change_this_app_key3,change_this_app_key4
API_TOKEN_SALT=change_this_api_token_salt_in_production
JWT_SECRET=change_this_jwt_secret_in_production

# Strapi Config
STRAPI_TELEMETRY_DISABLED=true
STRAPI_LICENSE=UNLICENSED
NODE_ENV=development
HOST=0.0.0.0
PORT=1337

# Optional Email Configuration
# EMAIL_PROVIDER=sendgrid
# SENDGRID_API_KEY=your_sendgrid_api_key
# SENDGRID_DEFAULT_FROM=your-email@example.com
# SENDGRID_DEFAULT_REPLY_TO=your-email@example.com`, ".env.example has been copied to clipboard!")}
                    >
                      Copy to Clipboard
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Laptop className="mr-2 h-5 w-5" /> 
                Basic Commands
              </CardTitle>
              <CardDescription>
                Essential commands to manage your Docker Strapi setup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Development</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm">
                  <p>cp .env.example .env</p>
                  <p>docker-compose up</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Production</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm">
                  <p>cp .env.example .env</p>
                  <p># Edit .env with secure values</p>
                  <p>docker-compose -f docker-compose.prod.yml up -d</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Building the Image</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm">
                  <p>docker build -t cms-handyman:latest .</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" /> 
                Deployment Guide
              </CardTitle>
              <CardDescription>
                Quick deployment instructions for various platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Railway Deployment</h3>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Push your code to GitHub</li>
                  <li>Create a new project in Railway</li>
                  <li>Connect your GitHub repository</li>
                  <li>Add a PostgreSQL service from Railway's catalog</li>
                  <li>Configure the environment variables</li>
                  <li>Deploy</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Render Deployment</h3>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Push your code to GitHub</li>
                  <li>Create a new Web Service in Render</li>
                  <li>Connect your GitHub repository</li>
                  <li>Set the build command: <code>npm install && npm run build</code></li>
                  <li>Set the start command: <code>npm start</code></li>
                  <li>Create a PostgreSQL database in Render</li>
                  <li>Link the PostgreSQL database to your Web Service</li>
                  <li>Configure all required environment variables</li>
                  <li>Deploy</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Content Types Configuration</h2>
            <Tabs defaultValue="service" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="service">Service Content-Type</TabsTrigger>
                <TabsTrigger value="article">Article Content-Type</TabsTrigger>
              </TabsList>
              
              <TabsContent value="service" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Schema</CardTitle>
                    <CardDescription>
                      Configuration for the Service content type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-96">
                      <pre>{`// src/api/service/content-types/service/schema.json
{
  "kind": "collectionType",
  "collectionName": "services",
  "info": {
    "singularName": "service",
    "pluralName": "services",
    "displayName": "Service",
    "description": "Handyman services offered"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "richtext"
    },
    "active": {
      "type": "boolean",
      "default": true
    }
  }
}`}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="article" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Article Schema</CardTitle>
                    <CardDescription>
                      Configuration for the Article content type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-96">
                      <pre>{`// src/api/article/content-types/article/schema.json
{
  "kind": "collectionType",
  "collectionName": "articles",
  "info": {
    "singularName": "article",
    "pluralName": "articles",
    "displayName": "Article",
    "description": "Blog articles and news"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "content": {
      "type": "richtext",
      "required": true
    },
    "featured_image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"],
      "required": false
    },
    "publishedAt": {
      "type": "datetime"
    }
  }
}`}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Public Access Configuration</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" /> 
                  Routes Configuration
                </CardTitle>
                <CardDescription>
                  Setting up public access for Service and Article APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-96">
                  <pre>{`// src/api/service/routes/service.js
'use strict';

/**
 * service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::service.service', {
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  }
});`}</pre>
                  <div className="mt-6"></div>
                  <pre>{`// src/api/article/routes/article.js
'use strict';

/**
 * article router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::article.article', {
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  }
});`}</pre>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => copyToClipboard(`'use strict';

/**
 * service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::service.service', {
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  }
});`, "Service routes configuration has been copied to clipboard!")}
                >
                  Copy Service Routes
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => copyToClipboard(`'use strict';

/**
 * article router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::article.article', {
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  }
});`, "Article routes configuration has been copied to clipboard!")}
                >
                  Copy Article Routes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Clone the repository and set up your project</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm">
                  <p>git clone https://github.com/your-username/cms-handyman.git</p>
                  <p>cd cms-handyman</p>
                  <p>cp .env.example .env</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Run the development environment</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm">
                  <p>docker-compose up</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">Access your Strapi admin at http://localhost:1337/admin</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">3. Deploy to production</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm">
                  <p># Edit .env with secure values</p>
                  <p>docker-compose -f docker-compose.prod.yml up -d</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={() => window.open('https://github.com/new', '_blank')}
            className="bg-slate-800 hover:bg-slate-700 text-white"
          >
            Create GitHub Repository <Github className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
