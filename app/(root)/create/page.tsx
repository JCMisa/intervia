"use client";

import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowLeftIcon, ArrowRight, BrainIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/actions/users";
import { Button } from "@/components/ui/button";
import EducationForm from "./_components/EducationForm";
import KeyCompetenciesForm from "./_components/KeyCompetenciesForm";
import ExperienceLevelForm from "./_components/ExperienceLevelForm";
import SkillsForm from "./_components/SkillsForm";
import JobDescriptionForm from "./_components/JobDescriptionForm";
import IndustryForm from "./_components/IndustryForm";
import JobTitleForm from "./_components/JobTitleForm";

const CreateInterviewPage = () => {
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: "",
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    role: "",
    isPro: false,
    stripeConnectId: "",
    credits: 0,
    createdAt: "",
  });
  const [formData, setFormData] = useState<FormDataType>({
    jobTitle: "",
    industry: "",
    jobDescription: "",
    skills: "",
    experienceLevel: "",
    keyCompetencies: "",
    education: "",
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (!user?.success) return;
      setCurrentUser(user?.data as UserType);
    };
    getUser();
  }, []);

  const onHandleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log("user inputs: ", formData);
  };

  return (
    <>
      {(currentUser.isPro && currentUser.credits >= 5) ||
      (currentUser.isPro && currentUser.credits < 5) ||
      (!currentUser.isPro && currentUser.credits < 5) ? (
        <div className="relative">
          <Link
            href={"/dashboard"}
            className="flex items-center gap-2 absolute top-5 left-5 z-50 text-gray-500 dark:text-gray-400"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <p className="text-sm">Back to Dashboard</p>
          </Link>
          <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <div className="z-10 whitespace-pre-wrap">
              <Card className="w-auto">
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="p-10 rounded-xl shadow-lg flex flex-col gap-3">
                    {/* jobTitle: "", industry: "", jobDescription: "", skills: "",
                    experienceLevel: "", keyCompetencies: "", education: "", */}
                    {step === 1 ? (
                      <JobTitleForm
                        onHandleInputChange={(v) =>
                          onHandleInputChange("jobTitle", v)
                        }
                        formData={formData}
                      />
                    ) : step === 2 ? (
                      <IndustryForm
                        onHandleInputChange={(v) =>
                          onHandleInputChange("industry", v)
                        }
                        formData={formData}
                      />
                    ) : step === 3 ? (
                      <JobDescriptionForm
                        onHandleInputChange={(v) =>
                          onHandleInputChange("jobDescription", v)
                        }
                        formData={formData}
                      />
                    ) : step === 4 ? (
                      <SkillsForm
                        onHandleInputChange={(v) =>
                          onHandleInputChange("skills", v)
                        }
                        formData={formData}
                      />
                    ) : step === 5 ? (
                      <ExperienceLevelForm
                        onHandleInputChange={(v) =>
                          onHandleInputChange("experienceLevel", v)
                        }
                        formData={formData}
                      />
                    ) : step === 6 ? (
                      <KeyCompetenciesForm
                        onHandleInputChange={(v) =>
                          onHandleInputChange("keyCompetencies", v)
                        }
                        formData={formData}
                      />
                    ) : step === 7 ? (
                      <EducationForm
                        onHandleInputChange={(v) =>
                          onHandleInputChange("education", v)
                        }
                        formData={formData}
                      />
                    ) : null}
                    <div className="flex items-center justify-between gap-3 w-full mt-5">
                      {step !== 1 && (
                        <Button
                          className="w-full"
                          variant={"outline"}
                          onClick={() => setStep((prev) => prev - 1)}
                        >
                          <ArrowLeft /> Previous
                        </Button>
                      )}

                      <Button
                        className={`w-full ${step === 7 && "hidden"}`}
                        onClick={() => setStep((prev) => prev + 1)}
                        disabled={step >= 7}
                      >
                        Continue <ArrowRight />
                      </Button>

                      <Button
                        className={`w-full hidden ${step === 7 && "flex"}`}
                        onClick={() => console.log("generate ai response")}
                      >
                        <BrainIcon /> Generate
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-gray-500 dark:text-gray-400 text-xs">
                    Please ensure that the information you provide is accurate
                    and complete. This will help us generate the most relevant
                    and tailored interview questions for your preparation.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <DotPattern
              className={cn(
                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
              )}
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <Link
            href={"/dashboard"}
            className="flex items-center gap-2 absolute top-5 left-5 z-50 text-gray-500 dark:text-gray-400"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <p className="text-sm">Back to Dashboard</p>
          </Link>
          <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <div className="z-10 whitespace-pre-wrap">
              <Card className="w-80">
                <CardContent className="flex flex-col gap-2 p-4">
                  <CardTitle>You are out of Credits</CardTitle>
                  <CardDescription>
                    Please upgrade to PRO plan and come back again to prepare
                    your next job interview. Good luck!
                  </CardDescription>
                  <div className="mt-4 flex items-end justify-end">
                    <Link
                      href="/upgrade"
                      className="bg-purple-500 hover:bg-purple-600 transition-all ease-in-out rounded-lg p-2 px-6 text-xs"
                    >
                      Upgrade to PRO
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            <DotPattern
              className={cn(
                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateInterviewPage;
