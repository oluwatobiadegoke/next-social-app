import React, { useState } from "react";
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
        <p className="text-right text-sm font-bold">
          {isMember ? "Not" : "Already"} a member?{" "}
          <button className="text-light-600" onClick={toggleMember}>
            Sign {isMember ? "up" : "in"}
          </button>
        </p>
        <>{isMember ? <Signin /> : <Signup />}</>
      </section>

      <section className="bg-xpress bg-test-100 flex-1 bg-no-repeat bg-cover bg-center p-8">
        <p className="text-black-500 font-extrabold text-6xl">
          X<span className="text-light-400">.PRESS</span>
        </p>
      </section>
    </main>
  );
}
