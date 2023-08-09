import { useState } from 'react';
import styles from './sidemenu.module.scss';
import Link from 'next/link';
import Dialog from '../dialog/Dialog';
import { useSession } from 'next-auth/react';
import SignIn from '../auth/signInForm/SignInForm';
import Toast from '../toast/Toast';

const SideMenu = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  // const [toasts, setToasts] = useState<any>([]);

  // const showToast = (message: string) => {
  //   const newToast = {
  //     id: Date.now(),
  //     message: message,
  //   };

  //   setToasts([...toasts, newToast]);

  //   setTimeout(() => {
  //     removeToast(newToast.id);
  //   }, 5000);
  // };

  // const removeToast = (id: number) => {
  //   setToasts(toasts.filter((toast: any) => toast.id !== id));
  // };

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <main>{session ? children : <SignIn />}</main>
          <Dialog />
          <Toast/>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-40 bg-base-100 text-base-content relative">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/pool">Pool</Link>
            </li>
            <li>
              <Link href="/reward">Reward</Link>
            </li>
            <li>
              <Link href="/history">History</Link>
            </li>
            <div className="absolute bottom-0 inset-x-0 p-4">
              <label htmlFor="addToken" className="btn">
                Add token
              </label>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
