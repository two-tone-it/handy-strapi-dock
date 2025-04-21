
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExampleStructure = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Strapi Structure</CardTitle>
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
    </Card>
  );
};

export default ExampleStructure;
