import { useEffect, useState } from "react";
import Link from "next/link";
import Dialog  from "../dialog/Dialog";

const SideMenu = ({ children }: { children: React.ReactNode }) => {
  

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
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
      <div className="d-flex position-relative">
      <div className="h-100">
        <h1>Quantox</h1>
        <ul>
      <li>
        <Link href="/home">Home</Link>
      </li>
      <li>
        <Link href="/history">History</Link>
      </li>
    </ul>
        <div className="text-center">
          <div className="card-body">
            <h5 className="card-title">Add transaction/action</h5>
            <button type="button" className="btn btn-light" onClick={toggleDialog}>Add</button>
          </div>
        </div>
      </div>
        <div>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">{children}</main>
        </div>
        {dialogIsOpen ? <Dialog emitCloseDialog={toggleDialog}/> : null}
      </div>
    </>
  );
  }

  export default SideMenu;