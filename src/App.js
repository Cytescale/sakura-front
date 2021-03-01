/* eslint-disable no-useless-constructor */

import axios from 'axios';
import React, { useState,useEffect  } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from 'firebase/app';
import * as firebase_cred from './fireabase_config'; 
import "firebase/auth";
import {Dropdown,Button,Alert,Spinner,Tab,Modal,Tabs} from 'react-bootstrap';
import Dashboard from './dash/dash';
import Lander from './land/land';
import AddLink from './land/addLink';
import Analytic  from './analytics/analytics';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/login.css';
import './style/dash.css';
import './App.css';
import qs from 'qs';

import { createGlobalStyle} from "styled-components"
import {ThemeProvider} from "styled-components";


import Notification from './noti/noti';
import './style/noti.css';

var LoggedUserId = null;
var NotiPool = [];



 const GlobalStylesDark = createGlobalStyle`
  body {
    --app-primary-color:#151515;
    --app-side-nav:rgb(14, 13, 13);
    --app-side-nav-text:#727272;
    --app-side-nav-butt-text:#fff;
    --app-side-nav-selec-butt: #323232;
    --app-top-nav:rgb(14, 13, 13);
    --app-sec-tit:#525252;
    --app-card-bg-color:#212121;
    --app-card-tit:#626262;
    --app-card-data:#fff;
    --main-bord-color:#323232;
    --app-text-color:#fff;
    --app_primary-box-shadow:0px 6px 10px rgb(0, 0, 0,0.09); 
  }
`;
const GlobalStylesLight = createGlobalStyle`
  body {
    --app-primary-color:#F3F5F9;
    --app-side-nav:#fff;
    --app-top-nav:#1F2631;
    --app-card-bg-color:#fff;
    --main-bord-color:#f1f1f1;
    --app-text-color:#2e2525; 


    --app-side-nav-text:#323232;
    --app-side-nav-tit-text:#718298;
    --app-side-nav-butt-text:#727272;

    --app-side-nav-selec-butt:  rgba(14, 152, 255, 0.06);;
  
    --app-sec-tit:#525252;
    --app-card-tit:#626262;
    --app-card-data:#000;
    --app_primary-box-shadow:0px 6px 15px rgb(0, 0, 0,0.03);
   
  }
`;

class LoginClass extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      uname: null,
      pass: null,
      errCode:false,
      isLoading:false,
      isSucess:false,
      LoginChoiceFlag:false,
    }
    this.switchEmailChoice = this.switchEmailChoice.bind(this);
    this.GoogleSignInit = this.GoogleSignInit.bind(this);
    this.EmailLoginForm = this.EmailLoginForm.bind(this);
  }

  componentWillUnmount(){
    
  }
  onUnameChange(event) {
    this.setState({uname: event.target.value})
  }
  onPassChange(event) {
      this.setState({pass: event.target.value})
  }
  loginSubmit(e){
    e.preventDefault();
    this.setState({errCode:false,isLoading:true})
    const user={
        uname:this.state.uname,
        pass:this.state.pass
    }
    console.log("DATA SUBMIT"+JSON.stringify(this.state));
        firebase.auth().signInWithEmailAndPassword(user.uname, user.pass).
        then((user) => {
            this.setState({errCode:false,isLoading:false,isSucess:true});
            this.props.cauUserCallback().then((res)=>{
              console.log("callback res"+JSON.stringify(res));
              if(res.pass===0){
                this.props.setLoggedFlag(false);
              }
              else if(res.pass===1){
                this.props.setLoggedFlag(true);
              }
              if(res.found===0){
                this.setState({errCode:true,isLoading:false,isSucess:false});
              }
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.setState({errCode:true,isLoading:false,isSucess:false})
          this.props.setLoggedFlag(false);
        });
}
  switchEmailChoice(){
    this.setState({LoginChoiceFlag:!this.state.LoginChoiceFlag});
  }

  GoogleSignInit(){
    var provider = new firebase.auth.GoogleAuthProvider();  
    this.googleSignInPopup(provider);
  }   
   googleSignInPopup(provider) {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        this.props.cauUserCallback().then((res)=>{
          if(res.pass===0){
            this.props.setLoggedFlag(false);
          }
          else if(res.pass===1){
            this.props.setLoggedFlag(true);
          }
          if(res.cauRes===0){
            this.setState({errCode:true,isLoading:false,isSucess:false});
          }

        });
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("NO NEW GOOGLE SIGNIIN errCode"+errorCode);
      });
  }
  
   googleSignInRedirectResult() {
    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          var token = credential.accessToken;
        }
        var user = result.user;

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }
  
   googleBuildAndSignIn(id_token) {
    var credential = firebase.auth.GoogleAuthProvider.credential(id_token);
    firebase.auth().signInWithCredential(credential).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
    
  }
  isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          
          return true;
        }
      }
    }
    return false;
  }
  onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.getAuthResponse().id_token);
        firebase.auth().signInWithCredential(credential).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }
  
  LoginChoiceForm(){
    return(<>
    <div className='login_frm_alt_cont'>
                  <div id='login_gog_butt_cont'>
                    <Button variant="light" id='login_fac_butt_cont_butt'><svg className='login_gog_butt_cont_butt_ico' viewBox='0 0 512 512'><path d='M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z' fillRule='evenodd'/></svg>
                    Login with Facebook</Button>
                  </div>
                  <div id='login_gog_butt_cont'>
                    <Button variant="light" onClick={this.GoogleSignInit} id='login_gog_butt_cont_butt'><svg className='login_gog_butt_cont_butt_ico' viewBox='0 0 512 512'><path d='M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z'/></svg>
                    Login with Google</Button>
                  </div>
                  
                  <div id='login_gog_butt_cont'>
                    <Button variant="light" id='login_git_butt_cont_butt'><svg className='login_gog_butt_cont_butt_ico' viewBox='0 0 512 512'><path d='M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z'/></svg>
                    Login with Github</Button>
                  </div>
                  <div id='login_gog_butt_cont'>
                    <Button variant="light" onClick={this.switchEmailChoice} id='login_em_butt_cont_butt'><svg className='login_gog_butt_cont_butt_ico' viewBox='0 0 512 512'><rect x='48' y='96' width='416' height='320' rx='40' ry='40' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M112 160l144 112 144-112'/></svg>
                    Login with Email</Button>
                  </div>
                  </div>

    </>)
  }
  EmailLoginForm(){
    return(
    <>
    <div className='login_frm_cont'>
    <div className='app_header_main_cont'> 
      <div className='dash_header_bdy_cont'>
                              <div className='dash_main_bdy_sub'>
                              <div className='dash_header_tit_cont'>Sakura</div>
                                <div className='dash_header_tit_cont_fill'></div>
                                  <div className='dash_header_butt_cont'>
                                  
                                   </div>
                                   </div>
     
                              </div>
      </div>
                  <form onSubmit={this.loginSubmit.bind(this)}>
                  <div className='l_f_c_e' id='l_f_c_u_c'>Email Address</div>
                  <div className='l_f_c_tt'id='l_f_c_u_f'><input type="email" disabled={this.state.isLoading} name='uname' onChange={this.onUnameChange.bind(this)} autoComplete='true' className="form-control" id='login_unm_txt' placeholder="" aria-label="username"  aria-describedby="basic-addon1"></input></div>
                  <div className='l_f_c_e' id='l_f_c_p_c'>Password</div>
                  <div className='l_f_c_tt'id='l_f_c_p_f'><input type="password" disabled={this.state.isLoading}  name='pass'onChange={this.onPassChange.bind(this)}  autoComplete='true' className="form-control" id='login_pass_txt' placeholder="" aria-label="password"  aria-describedby="basic-addon1"></input></div>
                  <div id='l_f_c_f_l_a'>By continuing, you agree to Cytescale's Terms and Conditions and Privacy Notice.</div>     
                  <Button id='l_f_c_b' type='submit' disabled={this.state.isLoading}>{!this.state.isLoading?<span>Log in to Sakura</span>:<Spinner animation="grow" variant="primary" />}</Button> 
                    {
                        this.state.errCode===true?<div id='app_login_alrt_cont'>
                        <Alert variant="danger">
                            Invalid username or password :(
                        </Alert>
                    </div>:this.state.isSucess===true?<div id='app_login_alrt_cont'>
                        <Alert variant="success">
                            Login Successfull
                        </Alert>
                    </div>:<span></span>   
                    }
                  <div id='l_f_c_f_c'><a href='#' id='l_f_c_f_l'>Forgot the password?</a></div></form>
                  <div id='login_gog_butt_cont'>
                    <Button variant="light" onClick={this.GoogleSignInit} id='login_gog_butt_cont_butt'><svg className='login_gog_butt_cont_butt_ico' viewBox='0 0 512 512'><path d='M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z'/></svg>
                    Login with Google</Button>
                  </div>
                  </div>

    </>);
  }
  render(){
    
    return(<>     
    
                  <div id='login_main_cont'><div id='login_main_body_cont'><div id='login_frm_cont_tit'>Login to Sakura</div>
                  {this.EmailLoginForm()}
                  </div></div>
    </>);  
}
}


export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLogged:null, 
      isLoading:false,
      notiCount:0, 
      leftNavHide:false,   
      isDark:false,
      currLink:0,
    }
    
    this.setLoading  = this.setLoading.bind(this);
    this.setLoggedFlag = this.setLoggedFlag.bind(this);
    this.checkLocalLogin = this.checkLocalLogin.bind(this);
    this.loginCallback = this.loginCallback.bind(this);
    this.loginSignOut = this.loginSignOut.bind(this);
    this.increNotiCount = this.increNotiCount.bind(this);
    this.decreNotiCount = this.decreNotiCount.bind(this);
    this.addNoti = this.addNoti.bind(this);
    this.hideLeftNav = this.hideLeftNav.bind(this);
    this.swtDarkMode = this.swtDarkMode.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }


  
AccTogg = React.forwardRef(({ children, onClick }, ref) => (
  <button
       id='dash_header_acc_butt'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <svg className='dash_header_butt_acc_ico' viewBox='0 0 512 512'><path fill='currentcolor' stroke='currentcolor' d='M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z'/></svg>
  </button>
));
HeadAccMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);
swtDarkMode(){
      this.setState({isDark:!this.state.isDark});
      console.log("Dark mode swt");
    }
hideLeftNav(){
      this.setState({leftNavHide:!this.state.leftNavHide});
    }
NotiCont(str,variant){
    return(<>
    {
         variant=="err"?
         <div className='app_noti_cont'  id='app_noti_err_cont'>
    {str}
    <div className='app_noti_butt_cont'>
    <button className='app_noti_butt'>
    <svg className='app_noti_butt_ico' id='app_noti_err_cont_ico' viewBox='0 0 512 512'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M320 320L192 192M192 320l128-128'/></svg>
    </button>
    </div>     
    </div>:
    <div className='app_noti_cont'>
    {str}
    <div className='app_noti_butt_cont'>
    <button className='app_noti_butt'  onClick={this.decreNotiCount}>
    <svg className='app_noti_butt_ico' viewBox='0 0 512 512'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M320 320L192 192M192 320l128-128'/></svg>
    </button>
    </div>     
    </div>
    }
    
    </>);
}
decreNotiCount(){
    NotiPool.pop();
    this.setState({notiCount:NotiPool.length,});
}
increNotiCount(){
    this.setState(
         {
              notiCount:this.state.notiCount+1,
         }
    )
}
addNoti(str,vari){
    console.log("notification pushed");
    NotiPool.push([str,vari]);
    this.setState({notiCount:NotiPool.length})
    setTimeout(
      function() {
          NotiPool.pop();
          this.decreNotiCount();
      }
      .bind(this),
      3000
  );
  }
async cauUser(user){
     //f = user found ; d = disabled ; i = account  inited;
   let final_res= {f:0,d:0,i:0}
   let res = await axios("http://localhost:8080/cauUser/", {
       method: 'POST',
       mode: 'no-cors',
       cache: 'no-cache',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
       },
       credentials: 'same-origin',
       redirect: 'follow',
       referrerPolicy: 'no-referrer', 
       data: qs.stringify(user)
     }).then(res=>{
      if(res.data===null||res.data==""){
        final_res= {f:0,d:0,i:0};
        console.error("YES cauUser No user found | pulling back");
        return final_res;
      }
      final_res={f:1,d:0,i:0};
      console.log("LOGIN RESPONSE"+JSON.stringify(res.data.user_id));      
      LoggedUserId  =res.data.user_id;
      return(final_res);
     }).catch(err=>{console.log(err)
        return(false);
    });
    return res;
 }
setLoading(val){this.setState({isLoading:val});}
setLoggedFlag = (val)=>{
  if(val)
  this.setState({isLogged:val})
  return "login flag to "+val;
  }
async checkLocalLogin(){
  let checkRes = {pass:0,found:0};
  console.log("LOGIN CHECK INIT");
  this.setLoading(true);
  await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("AUTH CHANGE CALL yes exist sign in | USER TOKEN "+user.uid);
        this.cauUser({"UID":user.uid}).then((res)=>{
          if(res){
            if(res.f===0){
              this.setLoading(false);
              this.loginSignOut();
              checkRes = {pass:0,found:0};
            }
            else if(res.f===1){
              this.setLoading(false);
              this.setLoggedFlag(true);
              checkRes = {pass:1,found:1};
            }
          }
          
        });
        return true;
      } else {
        this.setLoading(false);
        console.log("AUTH CHANGE CALL no exist sign in | USER TOKEN "+user);
        checkRes = {pass:0,cauRes:{}};
      }
    });
    return checkRes;
  }
loginSignOut(){
    firebase.auth().signOut().then(() => {
        console.log("YES SIGN OUT ");
        
    }).catch((error) => {
      console.log("NO SIGN OUT ");
    }); 
    this.setLoggedFlag(false);
    this.forceUpdate();
  }
loginCallback(){
    this.checkLocalLogin();
  }
componentWillMount(){
    if (!firebase.apps.length) {  firebase.initializeApp(firebase_cred.default);}
    else {
      firebase.app();
      console.log("firebase exist no init");
    }
    console.log("INIT LOGIN CHECK RES "+this.checkLocalLogin())
  }
componentDidMount(){
  }
loadingScreen(){
    return(<>
      <div id='app_load_cont'>
          <div id='app_load_sub_cont'>
          <div id='app_load_spn_cont'><Spinner animation="border" id='app_load_spin'variant="primary" /></div>
          Loading
          </div>
      </div>
    </>);
  }

setCurrentPage(int){
  this.setState({currLink:int});
}

  renderMainComponent(){
    return(
      <div id='app_full_main_cont'>
      <div id='app_full_strt_left_main_cont'>
                            <div className='main-circle'>
                              </div>

                              <div className='dash_header_butt_cont'>
                            <button id='dash_header_noti_butt'>
                          <svg className='dash_header_butt_acc_ico' viewBox='0 0 512 512'><path d='M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                          </button>
                                   <span className='dash_header_butt_pri_cont'>
                                        <Dropdown>
                                            <Dropdown.Toggle as={this.AccTogg} id="dropdown-custom-components"/>
                                            <Dropdown.Menu as={this.HeadAccMenu} className='dash_header_acc_menu_cont'>
                                            <div className='dash_noti_tit_cont'>Options</div>
                                                  {/* <div id='dast_opt_eml_txt'>Nikhil<br/> Wilayate</div> */}
                                                  <Dropdown.Item eventKey="1">Account</Dropdown.Item>
                                                  <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
                                                  <Dropdown.Item eventKey="1">Help</Dropdown.Item>
                                                  <button id='app_logout_butt' onClick={this.props.loginSignOut}>Sign Out</button>
                                            </Dropdown.Menu>
                                            </Dropdown>
                                       </span>
                             </div>


      </div>
      {/* style={{width:this.state.leftNavHide===false?'14%':'auto'}} */}
      <div id='app_full_left_main_cont' style={{width:this.state.leftNavHide===false?'14%':'auto',paddingTop:this.state.leftNavHide===true?'100px':'0px'}}  >
                            {this.state.leftNavHide===true?<span/>:<div className='dash_header_tit_cont'> 
                              Sakura</div>}
        <div id='app_full_left_lnk_cont_tit_cont'>
        <div id='app_full_left_lnk_cont_tit'>  {this.state.leftNavHide===true?<span/>:<span>Links</span>}</div>
          <div>
            <button  id='app_full_left_lnk_cont_tit_butt'>
          <svg id='app_full_left_lnk_cont_tit_butt_ico' style={{width:this.state.leftNavHide===false?'19px':'24px',height:this.state.leftNavHide===false?'19px':'24px'}}  viewBox='0 0 512 512'><title>Add Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M256 176v160M336 256H176'/></svg>
          {this.state.leftNavHide===true?<span/>:<span>Create Link</span>}</button>
          </div>
          </div>

          <div id='app_full_left_lnk_cont'>
            <div id='app_full_left_lnk_cont_tit'>  {this.state.leftNavHide===true?<span/>:<span>Overview</span>}</div>
              <div className='app_full_left_lnk_class_cont' id={this.state.currLink===1?'app_full_left_lnk_class_cont_selec':'app_full_left_lnk_class_cont_non_selec'} >
                <a  className='app_full_left_lnk_class' href="/dash">
                  <svg className='app_full_left_lnk_class_ico'  style={{width:this.state.leftNavHide===false?'19px':'24px',height:this.state.leftNavHide===false?'19px':'24px'}} viewBox='0 0 512 512'><title>Grid</title><rect x='48' y='48' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='288' y='48' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='48' y='288' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='288' y='288' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                  {this.state.leftNavHide===true?<span/>:<span>Dashboard</span>}</a></div>
              <div className='app_full_left_lnk_class_cont'  id={this.state.currLink===2?'app_full_left_lnk_class_cont_selec':'app_full_left_lnk_class_cont_non_selec'}>
                <a  className='app_full_left_lnk_class' href="/analytics">
                  <svg className='app_full_left_lnk_class_ico' style={{width:this.state.leftNavHide===false?'19px':'24px',height:this.state.leftNavHide===false?'19px':'24px'}}  viewBox='0 0 512 512'><title>Analytics</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M344 280l88-88M232 216l64 64M80 320l104-104'/><circle cx='456' cy='168' r='24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><circle cx='320' cy='304' r='24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><circle cx='208' cy='192' r='24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><circle cx='56' cy='344' r='24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                  {this.state.leftNavHide===true?<span/>:<span>Analytics</span>}</a></div>
              <div className='app_full_left_lnk_class_cont'  id={this.state.currLink===3?'app_full_left_lnk_class_cont_selec':'app_full_left_lnk_class_cont_non_selec'} >
                <a  className='app_full_left_lnk_class' href="/settings">
                  <svg className='app_full_left_lnk_class_ico' style={{width:this.state.leftNavHide===false?'19px':'24px',height:this.state.leftNavHide===false?'19px':'24px'}}  viewBox='0 0 512 512'><title>Settings</title><path d='M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                  {this.state.leftNavHide===true?<span/>:<span>Settings</span>}</a></div>
          </div>
          <div id='app_full_left_lnk_supp_main_cont'>
          <div id='app_full_left_lnk_cont_tit'>
            {this.state.leftNavHide===true?<span/>:<span>Support</span>}
            
            </div>
               <div className='app_full_left_lnk_class_cont' >
                <a  className='app_full_left_lnk_class' href="#">
                  <svg className='app_full_left_lnk_class_ico' style={{width:this.state.leftNavHide===false?'19px':'24px',height:this.state.leftNavHide===false?'19px':'24px'}}  viewBox='0 0 512 512'><title>Help</title><path d='M160 164s1.44-33 33.54-59.46C212.6 88.83 235.49 84.28 256 84c18.73-.23 35.47 2.94 45.48 7.82C318.59 100.2 352 120.6 352 164c0 45.67-29.18 66.37-62.35 89.18S248 298.36 248 324' fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='40'/><circle cx='248' cy='399.99' r='32'/></svg>
                  {this.state.leftNavHide===true?<span/>:<span>Help</span>}</a></div>
            
                  {/* <div className='app_full_left_lnk_class_cont' >
                <Button  className='app_full_left_lnk_log_class' onClick={()=>{this.loginSignOut()}}>
                  <svg className='app_full_left_lnk_class_ico' style={{width:this.state.leftNavHide===false?'19px':'24px',height:this.state.leftNavHide===false?'19px':'24px'}}  viewBox='0 0 512 512'><title>Log Out</title><path d='M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                  {this.state.leftNavHide===true?<span/>:<span>Logout</span>}</Button></div> */}
                  {/* <div className='app_full_left_hide_cont'>
                    <button className='app_full_left_hide_butt'
                    onClick={()=>{
                      this.hideLeftNav()
                    }}
                    >
                      <svg className='app_full_left_lnk_class_ico' style={{width:this.state.leftNavHide===false?'19px':'24px',height:this.state.leftNavHide===false?'19px':'24px'}}  viewBox='0 0 512 512'><title>Chevron Back</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144'/></svg>
                    </button>
                  </div> */}

            </div>
      </div>
    
      <div id='app_main_cont' style={{paddingLeft:this.state.leftNavHide===false?'13%':'3%'}}>
      <Router>
        <Switch>
          <Route exact  path="/">
            <Lander userID={LoggedUserId} setPage={this.setCurrentPage} addNot={this.addNoti} />
            </Route>
          <Route path="/dash">
          <Lander userID={LoggedUserId} setPage={this.setCurrentPage}  addNot={this.addNoti} />
          </Route>
          <Route path="/analytics/:lind_id" render={(props)=><Analytic  {...props} userID={LoggedUserId} setPage={this.setCurrentPage} addNot={this.addNoti} />}>
          </Route>
          <Route path="/settings">
          <Dashboard userID={LoggedUserId} setPage={this.setCurrentPage} addNot={this.addNoti} />
          </Route>
        </Switch>

    </Router>
        
        
      </div>
    </div>
    );
  }

  render(){ 
    return(<>
      {
        this.state.isDark===true?<GlobalStylesDark/>:<GlobalStylesLight/>
      }
      
      <div>
        <div className='app_noti_main_cont'>
               {NotiPool.map((value, index) => {
               console.log(value);
               return this.NotiCont(value[0],value[1])
               })
               }
        </div>
        {
          this.state.isLoading===true?
          this.loadingScreen():
          this.state.isLogged===true?
          this.renderMainComponent()
          :
          <LoginClass cauUserCallback={this.checkLocalLogin} loginCallback={this.loginCallback} setLoggedFlag={this.setLoggedFlag}/>
        } 
      </div>
    </>)
  }
}