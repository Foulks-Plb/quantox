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
    <div className='grid h-screen place-items-center'>
    <div className={Styles.formSignIn}>
      <form onSubmit={sign}>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <label className="input-group">
            <span>Email</span>
            <input
              type="email"
              placeholder="pierre@gmail.com"
              className="input input-bordered w-full"
              name="email"
            />
          </label>
        </div>
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text">Your Password</span>
          </label>
          <label className="input-group">
            <span>Password</span>
            <input
              type="password"
              className="input input-bordered w-full"
              name="password"
              placeholder="*******"
            />
          </label>
        </div>

        <div className='flex justify-center'>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
        </div>
        
      </form>
    </div>
    </div>
  );
}
