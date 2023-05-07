import { useState } from 'react';
import styles from './SideMenu.module.scss';
import Link from 'next/link';
import Dialog from '../dialog/Dialog';
import { signOut, useSession } from 'next-auth/react';
import SignIn from '../auth/signInForm/SignInForm';

const SideMenu = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  function toggleDialog() {
    if (session) {
      setDialogIsOpen(!dialogIsOpen);
    }
  }

  // signOut()

  return (
    <>
      <div className={styles.main}>
        <div className={styles.sideMenu}>
          <h1 className={styles.logoMenu}>Quantox</h1>
          <div className="text-center h-100">
              <div>
                <Link href="/home">Home</Link>
              </div>
              <div>
                <Link href="/history">history</Link>
              </div>
          </div>
          <div className="text-center mt-auto">
            <div className="card-body">
              <h5 className="card-title">Add transaction/action</h5>
              <button
                type="button"
                className="btn btn-light"
                onClick={toggleDialog}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div>
          <main>
            {session ? children: <SignIn /> }
          </main>
        </div>
        {dialogIsOpen ? <Dialog emitCloseDialog={toggleDialog} /> : null}
      </div>
    </>
  );
};

export default SideMenu;
