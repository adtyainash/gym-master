import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";
import Image from "next/image";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <Image src="/images/Logo_Horizontal.png" className="flex h-6 mt-4 mb-4 ml-4" alt='' width={176} height={24}/>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal p-0 items-center">
          {/* ... other menu items */}
          <li className="flex items-center">
            <Link className="inline-flex items-center" href="/">
              <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9" />
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/classes" className="inline-flex items-center">
              <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6M9 8h6m-6 3h6M4.996 5h.01m-.01 3h.01m-.01 3h.01M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" />
              </svg>
              <span>Classes</span>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/membership" className="inline-flex items-center">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
              <span>Subscription</span>
            </Link>
          </li>
          <li className="flex items-center">
            {session?.user ? (
              <SignOutButton />
            ) : (
              <Link href="/sign-in" className="inline-flex items-center">
                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
                </svg>
                <span>Login</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;