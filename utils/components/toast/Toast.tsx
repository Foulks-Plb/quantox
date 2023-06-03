import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const Toast = ({ toasts }: any) => {
  return (
    <div className="toast toast-end mr-4">
      {toasts.map((toast: any, i: number) => (
        <div key={i} className={"alert "+ toast.className}>
          <div>
            <span className='text-white'>{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapToast = (state: any) => ({ ...state.toastReducer });

export default connect(mapToast)(Toast);
