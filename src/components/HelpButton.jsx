import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    "Upload and view PDF files",
    "Navigate through pages",
    "Reorder pages via drag and drop",
    "Merge PDFs",
    "Save and download modified PDFs",
    "Rename PDFs",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>PDF Editor Features</DialogTitle>
        </DialogHeader>
        <ul className="list-disc pl-5 space-y-2">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default HelpButton;