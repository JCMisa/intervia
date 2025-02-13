import { Button } from "@/components/ui/button";
import { Building2Icon, UserRoundIcon } from "lucide-react";
import React from "react";

type UserSelectionType = "company" | "jobSeeker";

interface UserTypeSelectionProps {
  onSelect: (type: UserSelectionType) => void;
}

const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-bold text-3xl text-primary">
          Welcome! Lets get started
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Choose how you would like to use our platform!
        </p>
      </div>

      <div className="grid gap-4">
        <Button
          onClick={() => onSelect("company")}
          variant="outline"
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2Icon className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="semi-bold text-lg">Company / Organization</h3>
            <p>Post jobs and find exceptional talent</p>
          </div>
        </Button>

        <Button
          onClick={() => onSelect("jobSeeker")}
          variant="outline"
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserRoundIcon className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="semi-bold text-lg">Job Seeker</h3>
            <p>Find your dream job opportunity</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
