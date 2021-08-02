import React, { useState } from "react";
import { getSession } from "next-auth/client";
import Image from "next/image";

import Signup from "../components/signup/Signup";
import Signin from "../components/signin/Signin";

export default function Home() {
  const [isMember, setIsMember] = useState(true);

  const toggleMember = () => {
    setIsMember((isMember) => !isMember);
  };

  return (
    <main className="font-body h-screen w-full overflow-hidden flex bg-test-100">
      <section className="flex-1 p-8 bg-white">
        <p className="text-right text-sm font-bold text-indigo-500">
          {isMember ? "Not" : "Already"} a member?{" "}
          <button className="text-light-500" onClick={toggleMember}>
            Sign {isMember ? "up" : "in"}
          </button>
        </p>
        <>{isMember ? <Signin /> : <Signup />}</>
      </section>

      <section className="bg-indigo-500 bg-test-100 flex-1 p-8 flex items-center justify-center">
        <p className="text-light-400 font-extrabold text-9xl">X.PRESS</p>
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
