import { getSession, signOut } from "next-auth/client";

const index = () => {
  return (
    <main>
      <h1>This is the first contact.</h1>
      <button
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
      >
        sign out
      </button>
    </main>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default index;
