import React from 'react';
import {useState,useEffect} from 'react';
import style from './logsignIn.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {auth,provider,Gitprovider} from '../../firebase';
import {  GithubAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup } from 'firebase/auth';
const LogSignIn = () => {
    //अवसर्पिणी
    const handleSignUp = () => {
        const container = document.getElementById('container');
        container.classList.add(style.rightPanelActive);
      };
      const handleSignIn = () => {
        const container = document.getElementById('container');
        container.classList.remove(style.rightPanelActive);
      };
    
      //Agni mul vistar
                const [email,setEmail]= useState('');
                const [password,setpassword]= useState('');
                const [error,setError]=useState(null);
                const [uperror,setupError]=useState(null);
    //signin ke liye
    const signIn =(e)=>{ 
      e.preventDefault();
      signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        // console.log(userCredential);
      }).catch((error)=>{
        setError(error.message);
        });
    } 
    //signUP ke liye
     const signup =(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        //   console.log(userCredential);
        }).catch((uperror)=>{
        setupError(uperror.message);
      });
      }
      //signinwithpopup
            //with google
        const [gvalue,setgValue]=useState('');
        const [gerror,setGerror]=useState('');
      const signInwithgoogle =()=>{
        signInWithPopup(auth,provider).then((data)=>{
          const email=data.user.email;
                setgValue(email)
                    localStorage.setItem("email",email);                    
        }).catch((error)=>{
          setGerror(error.message);
        }) }
         useEffect(()=>{
            setgValue(localStorage.getItem('email'))
              },[]);
         

                //with github
                const [gitvalue, setGitvalue] = useState(true);
                const [giterror, setGiterror] = useState(null);
                const signInWithGithub = () => {
                  signInWithPopup(auth, Gitprovider).then((result) => {
                      console.log("Shit");
                      setGitvalue(result.user);
                      const credential = GithubAuthProvider.credentialFromResult(result);
                       const token = credential.accessToken;
                       console.log("Token: " + token);
                    })
                    .catch((er) => {
                      setGiterror(er.code);
                    });
                  }

      return (
        <div className={style.body}>
    <div><h2 className={style.h2}>Welcome To Plasma Interview</h2>
        <div className={style.container} id="container">
        <div className={`${style.formContainer} ${style.signUpContainer}`}>
        <form className={style.form} onSubmit={signup}>
                <h1 className={style.h1} >Create Account</h1>
                <div className={style.socialContainer}>
                {gvalue ?(
                            <a className={`${style.a} ${style.social}`} onClick={signInwithgoogle} >
                             <i className="fab fa-google-plus-g"></i> </a>  
                          ):
                          (<p className={style.p}>{gerror}</p> )}
                 {gitvalue ?(<>
                        <a className={`${style.a} ${style.social}`} onClick={signInWithGithub} >
                            <i className="fab fa-github"></i>
                           </a>
                           <p className={style.p}>{giterror}</p>
                            <p className={style.p}>{gerror}</p></>
                           ):(
                             <p className={style.p}>{giterror}</p>
                         )} </div>
                <span className={style.span}>or use your email for registration</span>
                <input className={style.input} type="text" placeholder="Name" />
                <input className={style.input} type="email" name="email" placeholder='Enter your mail' 
                         value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                                  />  
                             <input className={style.input} type="password" name="password" placeholder='Enter your password' 
                             value={password}
                          onChange={(e)=>setpassword(e.target.value)}
                                  />
                                  <p className={style.p}>{uperror}</p>
                         <button className={style.button} type="submit" > Signup </button>
                     </form>
        </div>
        <div className={`${style.formContainer} ${style.signInContainer}`}>
         <form className={style.form} onSubmit={signIn}>
                <h1 className={style.h1}>Sign in</h1>
                <div className={style.socialContainer}>
                          {!gvalue ?(
                                   <a className={`${style.a} ${style.social}`} onClick={signInwithgoogle} >
                                      <i className="fab fa-google-plus-g"></i>
                                       </a> ):
                                  (<p className={style.p}>{gerror}</p> )
                                  }
                                  
                         {gitvalue ?(<>
                           <a className={`${style.a} ${style.social}`} onClick={signInWithGithub} >
                             <i className="fab fa-github"></i>
                           </a>
                            <p className={style.p}>{giterror}</p>
                            <p className={style.p}>{gerror}</p></>
                           ):(
                             <p className={style.p}>{giterror}</p>
                         )}
                </div>
                <span className={style.span}>or use your account</span>
                <input className={style.input} type="email" name="email" placeholder='Enter your mail' 
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                     />
                   <input className={style.input} type="password" name="password" placeholder='Enter your password' 
                               value={password}
                                  onChange={(e)=>setpassword(e.target.value)}
                                  /><a className={style.a} href="#">Forgot your password?</a>
                               <button className={style.button} type="submit" >Login In</button>
                               <div>{ error}</div>
              </form>
        </div>
        <div className={style.overlayContainer}>
            <div className={style.overlay}>
            <div className={`${style.overlayPanel} ${style.overlayLeft}`}>
        <h1 className={style.h1}>Welcome Back!</h1>
                    <p className={style.p}>To keep connected with us please login with your personal info</p>
                    <button className={`${style.button} ${style.ghost}`} id="signIn" onClick={handleSignIn} >Sign In</button>
                </div>
                <div className={`${style.overlayPanel} ${style.overlayRight}`}>
            <h1 className={style.h1}>Hello, Friend!</h1>
                    <p className={style.p}>Enter your personal details and start journey with us</p>
                    <button className={`${style.button} ${style.ghost}`}  id="signUp" onClick={handleSignUp} >Sign Up</button>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <p className={style.p}>
         Copyright &copy; { new Date().getFullYear()}  Created with <i className="fa fa-heart" />  by IPECians
        </p>
    </footer></div>
    </div>
  )
}
export default LogSignIn;