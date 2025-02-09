"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { CardFooter } from "@/app/components/ui/card";

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const router = useRouter();
  const handleLogout = async () => {
    localStorage.removeItem('token');
    router.push("/login");
  }


  return (
    <div className="h-screen grid grid-cols-[240px_1fr]">
      <nav className="border-r bg-gray-100/40 dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              className="flex items-center gap-2 font-semibold"
              href="/"
            >
              <LayoutDashboardIcon className="h-6 w-6" />
              <span className="">Musiimaker</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">

              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/dashboard/profile"
              >
                <ProfileIcon className="h-4 w-4" />
                Profile
              </Link>
              <button
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              onClick={handleLogout}
              >
                <LogoutIcon className="h-4 w-4" />
                Logout
              </button>
              <Link 
              className="flex items-center gap-3 rounded-lg py-2"
              href="/add-song">
              <CardFooter className="flex flex-col">
                <button className="w-full flex items-center gap-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  <ButtonIcon className="h-4 w-4" />
                  Add Song
                  </button>
              </CardFooter>
              </Link>
            </nav>
          </div>
        </div>
      </nav>
      <main className="flex flex-col overflow-scroll">{children}</main>
    </div>
  );
}

function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      >
      <circle cx="5.5" cy="17.5" r="2.5"/>
      <circle cx="17.5" cy="15.5" r="2.5"/>
      <path d="M8 17V5l12-2v12"/>
    </svg>
  );
}

function LogoutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
    <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/>
    </svg>
  );
}

function ProfileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ButtonIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );
}