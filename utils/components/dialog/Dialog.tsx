import styles from './dialog.module.scss';
import { useEffect, useState } from 'react';
import SingleToken from './singleToken/SingleToken';
import PoolForm from './poolForm/PoolForm';

export default function Dialog() {
  const [isOpen, setIsOpen] = useState(false);

  const [mode, setMode] = useState('token');

  return (
    <div>
      <input
        type="checkbox"
        id="addToken"
        className="modal-toggle"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="addToken"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex justify-center">
            <div className="tabs tabs-boxed justify-center">
              <a
                className={'tab ' + (mode === 'token' ? 'tab-active' : '')}
                onClick={() => setMode('token')}
              >
                Single token
              </a>
              <a
                className={'tab ' + (mode === 'pool' ? 'tab-active' : '')}
                onClick={() => setMode('pool')}
              >
                Pool
              </a>
            </div>
          </div>
          {mode === 'pool' && (
            <PoolForm
              setOpenEvent={(e: any) => {
                setIsOpen(e);
              }}
            />
          )}
          {mode === 'token' && (
            <SingleToken
              setOpenEvent={(e: any) => {
                setIsOpen(e);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
