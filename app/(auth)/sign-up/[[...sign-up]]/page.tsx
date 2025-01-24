import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const SignUpPage = () => {
  return (
    <>
      <section className="bg-dark">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-dark lg:col-span-5 lg:h-full xl:col-span-4">
            <Image
              alt="image"
              src="/auth-bg.jpg"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              width={1000}
              height={1000}
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="text-white" href="#">
                <Image
                  src={"/logo.svg"}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="h-8 sm:h-10"
                />
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Intervia 👋🏻
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Join Intervia today! Sign up to start your journey towards
                interview excellence with customized AI-powered preparation and
                community support.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-8">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden mb-5">
                <a
                  className="inline-flex size-16 items-center justify-center rounded-full text-light-100 sm:size-20 bg-dark"
                  href="#"
                >
                  <Image
                    src={"/logo.svg"}
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="h-8 sm:h-10"
                  />
                </a>

                <h1 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl text-white">
                  Welcome to Intervia 👋🏻
                </h1>

                <p className="mt-4 leading-relaxed text-gray-400">
                  Join Intervia today! Sign up to start your journey towards
                  interview excellence with customized AI-powered preparation
                  and community support.
                </p>
              </div>

              <div className="flex items-center justify-center">
                <ClerkLoaded>
                  <SignUp />
                </ClerkLoaded>
                <ClerkLoading>
                  <LoaderCircleIcon className="w-5 h-5 animate-spin" />
                </ClerkLoading>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
