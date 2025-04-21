
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type DeploymentCardProps = {
  platform: string;
  steps: string[];
  icon: React.ReactNode;
};

const DeploymentCard: React.FC<DeploymentCardProps> = ({ platform, steps, icon }) => {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          <span>{platform} Deployment</span>
        </CardTitle>
        <CardDescription>
          How to deploy to {platform}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal pl-5 space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="text-sm">{step}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default DeploymentCard;
