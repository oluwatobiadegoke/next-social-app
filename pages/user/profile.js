import { useSession } from "next-auth/client";
import Image from "next/image";

import Layout from "../../components/layout/Layout";
import ProfileForm from "../../components/Profile/ProfileForm";

const profile = () => {
  const [session] = useSession();

  return (
    <Layout>
      <section>
        <div className="w-full flex justify-center">
          <div className="w-64 h-64 profileDiv">
            {session?.user.profilePicture ? (
              <Image
                src={session.user.profilePicture}
                width={256}
                height={256}
                alt={session.user.name}
              />
            ) : (
              <p className="font-bold text-3xl  text-transparent bg-clip-text bg-gradient-to-br from-light-400 to-black-200">
                {session?.user?.name.slice(0, 1).toUpperCase()}
              </p>
            )}
          </div>
        </div>
        <ProfileForm />
      </section>
    </Layout>
  );
};

export default profile;
