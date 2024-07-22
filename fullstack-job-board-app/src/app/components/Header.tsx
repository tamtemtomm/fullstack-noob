import Link from "next/link";
import {
  getSignInUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";

export default async function Header() {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();
  return (
    <header className="">
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href={"/"} className="font-bold text-xl">
          Job Board
        </Link>
        <nav className="flex gap-2 ">
          {!user && (
            <Link href={signInUrl} className= "rounded-md bg-gray-200 py-2 px-4">
              Login
            </Link>
          )}
          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit" className="rounded-md bg-gray-200 py-2 px-4">
                Log Out, {user.firstName}
              </button>
            </form>
          )}
          <Link href={"/new-listing"} className="rounded-md bg-blue-600 py-2 px-4 text-white">
            Post a Job
          </Link>
        </nav>
      </div>
    </header>
  );
}
