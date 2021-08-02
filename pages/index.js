import React, { useState } from "react";
import { getSession } from "next-auth/client";
import Image from "next/image";

import Signup from "../components/signup/Signup";
import Signin from "../components/signin/Signin";

export default function Home() {
  const [isMember, setIsMember] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  const toggleMember = () => {
    setIsMember((isMember) => !isMember);
  };

  return (
    <main className="font-body h-screen w-full overflow-hidden flex bg-test-100">
      <section className="flex-1 p-8 bg-white">
        <p className="text-right text-sm font-bold text-indigo-800">
          {isMember ? "Not" : "Already"} a member?{" "}
          <button className="text-green-500" onClick={toggleMember}>
            Sign {isMember ? "up" : "in"}
          </button>
        </p>
        <>
          {isMember ? (
            <Signin isSignup={isSignup} setIsSignup={setIsSignup} />
          ) : (
            <Signup setIsMember={setIsMember} setIsSignup={setIsSignup} />
          )}
        </>
      </section>

      <section className="bg-indigo-800 bg-test-100 flex-1 p-8 flex items-center justify-center">
        <p className="text-black-100 font-extrabold text-9xl">X.PRESS</p>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/user/home",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
