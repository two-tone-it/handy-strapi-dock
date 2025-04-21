
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RenderConfig = () => {
  return (
    <Card className="border-l-4 border-l-amber-500">
      <CardHeader>
        <CardTitle>Render Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          For successful deployment on Render, you need to add the following to your project:
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-96 mb-4">
          <pre>{`# render.yaml
services:
  - type: web
    name: cms-handyman
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run start
    healthCheckPath: /
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: cms-handyman-db
          property: connectionString
      - key: ADMIN_JWT_SECRET
        generateValue: true
      - key: APP_KEYS
        generateValue: true
      - key: JWT_SECRET
        generateValue: true

databases:
  - name: cms-handyman-db
    plan: starter
`}</pre>
        </div>
        
        <p className="text-sm font-medium">Important Package.json settings:</p>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono text-sm overflow-auto max-h-60">
          <pre>{`"scripts": {
  "develop": "strapi develop",
  "start": "strapi start",
  "build": "strapi build",
  "strapi": "strapi"
},
"dependencies": {
  "@strapi/strapi": "^4.15.0",
  "@strapi/plugin-i18n": "^4.15.0",
  "@strapi/plugin-users-permissions": "^4.15.0",
  "pg": "^8.11.3"
}`}</pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenderConfig;
