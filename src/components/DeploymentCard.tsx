
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type DeploymentCardProps = {
  platform: string;
  steps: string[];
  icon: React.ReactNode;
};

const DeploymentCard: React.FC<DeploymentCardProps> = ({ platform, steps, icon }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          <span className="ml-2">{platform} Deployment</span>
        </CardTitle>
        <CardDescription>
          How to deploy to {platform}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal pl-5 space-y-1">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default DeploymentCard;
