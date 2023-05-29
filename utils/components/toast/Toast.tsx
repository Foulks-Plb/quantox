import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const Toast = ({ toasts }: any) => {
  return (
    <div className="toast toast-end">
      {toasts.map((toast: any, i: number) => (
        <div key={i} className="alert alert-success">
          <div>
            <span>{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapToast = (state: any) => ({ ...state.toastReducer });

export default connect(mapToast)(Toast);
