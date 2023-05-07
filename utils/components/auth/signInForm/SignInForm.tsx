import { signIn } from 'next-auth/react';
import Styles from './signinform.module.scss';

export default function SignInForm() {
  function sign(event: any) {
    event.preventDefault();

    signIn('credentials', {
      redirect: false,
      email: event.target.email.value,
      password: event.target.password.value,
    });
  }

  return (
    <div className={Styles.formSignIn}>
      <form onSubmit={sign}>
        <div className="form-outline mb-4">
          <label className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
          <input type="password" name="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
    </div>
  );
}
