import { useState } from 'react';
import styles from './sidemenu.module.scss';
import Link from 'next/link';
import Dialog from '../dialog/Dialog';
import { useSession } from 'next-auth/react';
import SignIn from '../auth/signInForm/SignInForm';

const SideMenu = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* <label className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label> */}
          <main>{session ? children : <SignIn />}</main>
          <Dialog />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-40 bg-base-100 text-base-content relative">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/history">History</Link>
            </li>
            <div className="absolute bottom-0 inset-x-0 p-4">
              <label htmlFor="my-modal-3" className="btn">
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
