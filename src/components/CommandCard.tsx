
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type CommandCardProps = {
  title: string;
  description: string;
  commands: {label: string; command: string}[];
  icon: React.ReactNode;
};

const CommandCard: React.FC<CommandCardProps> = ({ title, description, commands, icon }) => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Command has been copied to clipboard!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {commands.map((cmd, index) => (
          <div key={index}>
            <h3 className="text-sm font-semibold mb-2">{cmd.label}</h3>
            <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm flex justify-between items-center">
              <span>{cmd.command}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => copyToClipboard(cmd.command)}
                className="ml-2"
              >
                Copy
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommandCard;
