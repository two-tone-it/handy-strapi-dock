
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DeploymentCardProps = {
  platform: string;
  steps: string[];
  icon: React.ReactNode;
  type?: "primary" | "secondary" | "warning";
};

const DeploymentCard: React.FC<DeploymentCardProps> = ({ platform, steps, icon, type = "primary" }) => {
  const borderColorClass = {
    primary: "border-l-primary",
    secondary: "border-l-blue-500",
    warning: "border-l-amber-500"
  }[type];

  return (
    <Card className={`border-l-4 ${borderColorClass}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{platform} Deployment</span>
          {type === "warning" && (
            <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-300">
              Special Config Needed
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          How to deploy to {platform}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal pl-5 space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="text-sm">{step}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default DeploymentCard;
