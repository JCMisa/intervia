"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserTypeSelection from "./UserTypeForm";
import CompanyForm from "./CompanyForm";

type UserSelectionType = "company" | "jobSeeker" | null;

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  const handleUserTypeSelection = (type: UserSelectionType) => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelection} />;
      case 2:
        return userType === "company" ? (
          <CompanyForm />
        ) : (
          <p>user is a job seeker</p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-5">
        <Link href={"/"} className="flex items-center cursor-pointer">
          <Image src={"/logo.svg"} alt="logo" width={60} height={60} />
          <Image
            src={"/logo-full.png"}
            alt="logo-full"
            width={200}
            height={200}
            className="-ml-3 hidden sm:block"
          />
        </Link>
      </div>

      <Card className="max-w-lg w-full">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
};

export default OnboardingForm;
