import { useState } from 'react';
import styles from './SideMenu.module.scss';
import Link from 'next/link';
import Dialog from '../dialog/Dialog';
import { signIn, signOut, useSession } from 'next-auth/react';

const SideMenu = ({ children }: { children: React.ReactNode }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )

  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   if (isMounted) {
  //   } else {
  //     setIsMounted(true);
  //   }
  // }, [isMounted]);

  function toggleDialog() {
    setDialogIsOpen(!dialogIsOpen);
  }

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
            {children}
          </main>
        </div>
        {dialogIsOpen ? <Dialog emitCloseDialog={toggleDialog} /> : null}
      </div>
    </>
  );
};

export default SideMenu;
