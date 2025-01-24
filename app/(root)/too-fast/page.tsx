"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TooFastRequestPage = () => {
  const router = useRouter();

  const [secondsRemaining, setSecondsRemaining] = useState(60);

  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining]);

  return (
    <main className="flex min-h-screen flex-1 flex-col px-5 xs:px-10 md:px-16 items-center justify-center">
      <h1 className="text-5xl font-bold text-center">
        Whoa, Slow Down There, Speedy!
      </h1>
      <p className="mt-3 max-w-xl text-center text-gray-500 dark:text-gray-400">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary pause on your excitement. 🚦 Chill for a bit, and try again
        shortly
      </p>
      {secondsRemaining !== 0 ? (
        <p className="mt-5 text-gray-500 dark:text-gray-400">
          Retry after:{" "}
          <span className="font-bold text-dark dark:text-light">
            {secondsRemaining}
          </span>{" "}
          seconds
        </p>
      ) : (
        <Button
          onClick={() => router.back()}
          className="mt-5 min-w-32 max-w-32"
        >
          Go Back
        </Button>
      )}
    </main>
  );
};
export default TooFastRequestPage;
