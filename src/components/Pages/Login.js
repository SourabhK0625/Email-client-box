import { useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import classes from './Login.module.css';
import { authActions } from '../../store/auth-slice';

const Login = () => {
  const history = useHistory()
  const emialInputRef = useRef()
  const passwordInputRef = useRef()
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.isAuthenticated);
  const token = useSelector(state => state.token);
  const email = useSelector(state => state.email);
  
 


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) =>{
    e.preventDefault()

    const enteredEmail = emialInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;
    setIsLoading(true)
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdSYqhSXI9dcoSWe9uHjlxISpKrZOK6fc'
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdSYqhSXI9dcoSWe9uHjlxISpKrZOK6fc'
    }
    fetch(url, {
      method:'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'content-Type': 'application/json'
      } 
    }).then(res => {
      setIsLoading(false)
      if(res.ok){
        return res.json()
      }else{
        return res.json().then(data => {
          let errorMessage = 'Authentication Failed';
          // if(data && data.error && data.error.message){
          //   errorMessage = data.error.message
          // }
          throw new Error(errorMessage);
          
        })
      }
    }).then((data) => {
        alert('User has successfully logged in')
        console.log('User has successfully signed up')
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('email',enteredEmail)
      
      history.replace('/Welcome')
      dispatch(authActions.login({token:data.idToken,email:enteredEmail}))
  })
    .catch((err) =>{
      alert(err.errorMessage)
    })
  }

  return (
    <>
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emialInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p> Sending Request...!</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          {/* <Link to='/forgotpassword'> Forgot Password?</Link> */}
        </div>
      </form>
    </section>
    </>
  );
};

export default Login;