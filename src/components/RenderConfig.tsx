
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
    startCommand: npx serve -s dist
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
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
},
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "serve": "^14.2.1"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.0.0",
  "vite": "^4.3.9"
}`}</pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenderConfig;
