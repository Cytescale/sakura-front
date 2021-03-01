import axios from 'axios';
import React, { useState,useEffect  } from 'react';
import {Dropdown,Button,Alert,Spinner,Tab,Modal,Tabs,Row,Nav,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/dash.css';
import '../App.css';
import qs from 'qs';
import gog_ico from '.././assets/logo/gog.png';


function ChangePassModal(props){
     return(
         <Modal  {...props} size="300px" aria-labelledby="contained-modal-title-vcenter"  className='pass_chnage_modal_bdy_main_cont'>
           <Modal.Body id='pass_chnage_modal_bdy_cont' >
                     <div id='pass_chnage_modal_bdy_cont_tit_cont'>Change Password</div>
                     <div className='app_setting_main_bdy_tit_main_sub_opt_cont'>
                             <div className='app_setting_main_bdy_tit_main_sub_opt_cont_tit'>Current Password</div>
                             <input type='password' placeholder='Enter current password' className='app_setting_main_bdy_tit_main_sub_opt_cont_data'></input>
                     </div>
                     <div className='app_setting_main_bdy_tit_main_sub_opt_cont'>
                             <div className='app_setting_main_bdy_tit_main_sub_opt_cont_tit'>New Password</div>
                             <input type='password' placeholder='Enter new password' className='app_setting_main_bdy_tit_main_sub_opt_cont_data'></input>
                     </div>
                     <div className='app_setting_main_bdy_tit_main_sub_opt_cont'>
                             <div className='app_setting_main_bdy_tit_main_sub_opt_cont_tit'>Confirm Password</div>
                             <input type='password' placeholder='Enter password again' className='app_setting_main_bdy_tit_main_sub_opt_cont_data'></input>
                     </div>
                     <div className='app_setting_main_bdy_tit_main_forg_lnk_cont'>
                     <a href='#' className='app_setting_main_bdy_tit_main_forg_lnk'>
                         Can't remember password?
                         </a>
                         </div>
                         <Button className='app_setting_main_bdy_tit_main_sub_butt_cont' >Confirm</Button>
           </Modal.Body>
         </Modal>
     );
   }
   
function DecactivateModal(props){
     return(
         <Modal  {...props} size="300px" aria-labelledby="contained-modal-title-vcenter"  className='pass_chnage_modal_bdy_main_cont'>
           <Modal.Body id='pass_chnage_modal_bdy_cont' >
                     <div id='pass_chnage_modal_bdy_cont_tit_cont'>Deactivate Account</div>
                     <div className='app_setting_main_bdy_tit_main_sub_opt_cont'>
                             <div className='app_setting_main_bdy_tit_main_sub_opt_cont_tit'>Current Password</div>
                             <input type='password' placeholder='Enter current password' className='app_setting_main_bdy_tit_main_sub_opt_cont_data'></input>
                     </div>
                     <Alert variant="danger" className='dec_acc_modal_alrt_cont'>
                         Deactivated account cannot be reactivated again!
                     </Alert>
                 <Button className='app_setting_main_bdy_tit_main_sub_butt_cont' variant='danger'>Confirm deactivate account</Button>
           </Modal.Body>
         </Modal>
     );
   }
     
export default class Dashboard extends React.Component{
     constructor(props){
       super(props);
       this.state = {
           changePassModalVisi:false,
           deacAccModalVisi:false,
           user_name:null,
           user_email:null,
           user_comp_name:null,
           user_num:null,
           errCode:false,
           errMessage:"NULL ERROR 00",
           isLoading:false,
           isSucess:false,
           isGoogleOwn:false,
           isEmailNoti:0,
         }        
     this.getUserInfo = this.getUserInfo.bind(this)  ;
     this.setError = this.setError.bind(this);
     props.setPage(3);
     }

     setError(val,str_dat){
        this.setState({
            errCode:val,
            errMessage:str_dat
        });
     }
     
     onNameChange(event) {
        this.setState({user_name: event.target.value})
      }
      onCompNameChange(event) {
        this.setState({user_comp_name: event.target.value})
      }
      onNumChange(event) {
        this.setState({user_num: event.target.value})
      }
     onEmailNotiChange(e) {
        //console.log('value of checkbox : ', e.target.checked);
        let fin_val = this.state.isEmailNoti===1?0:1;
        console.log("email noti change for"+fin_val);
        let user={
            uid:this.props.userID,
            noti:fin_val,
        }
        this.updateEmailNoti(user);
      }
     componentWillMount(){
        this.getUserInfo(this.props.userID);
     }

     async getUserInfo(user_id){
          console.log("GET USER INFO INIT at UID"+user_id);
        let res = await axios("http://localhost:8080/getUserInfo/", {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'same-origin',
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            data: qs.stringify({UID:user_id})// body data type must match "Content-Type" header
          }).then(res=>{
           if(res.data===null||res.data==""){
             console.error("YES getUserInfo No user found");
           }
           console.log("YES getUserInfo YES user found"+JSON.stringify(res.data)); 
           this.setState({
               user_name:res.data.user_name==null?"FULL NAME":res.data.user_name,
               user_email:res.data.user_email==null?"EMAIL ADDRESS":res.data.user_email,
               user_comp_name:res.data.user_comp_name==null?"COMPANY NAME":res.data.user_comp_name,
               user_num:res.data.user_num==null?"0000000000":res.data.user_num,
               isEmailNoti:res.data.user_email_noti,
                isGoogleOwn:res.data.is_google_own
            });
           
           
          }).catch(err=>{console.log(err)
             return(false);
         });
         return res;
      }
      async updateUserInfo(user){
        console.log("GET USER INFO INIT at UID"+user.uid);
        this.setState({
            isLoading:true,
            errCode:false,
        })
        let res = await axios("http://localhost:8080/updateUserInfo/", {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
          },
          credentials: 'same-origin',
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          data: qs.stringify(user)// body data type must match "Content-Type" header
        }).then(res=>{
            this.setState({
                isLoading:false,
                errCode:false,
            })
            console.log(" "+JSON.stringify(res.data)); 
            this.props.addNot("Profile Updated Successfully","");
        }).catch(err=>{console.log(err)
            this.setState({
                isLoading:false,
                errCode:false,
                errMessage:err,
            })
            this.props.addNot("Error Occuured","err");
            return(false);
       });
       return res;
    }

    async updateEmailNoti(user){
        console.log("GET USER INFO INIT at UID"+user.uid);
        let res = await axios("http://localhost:8080/updateEmailNoti/", {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
          },
          credentials: 'same-origin',
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          data: qs.stringify(user)// body data type must match "Content-Type" header
        }).then(res=>{
            console.log(" "+JSON.stringify(res.data)); 
            if(res.data.isUpdated===true){
                this.setState({
                    isEmailNoti:user.noti
                })
                this.props.addNot("Email Notification Changed","");
            }

        }).catch(err=>{
            this.props.addNot("Email Notification Error Occurrred","err");
            console.log(err)
            return(false);
       });
       return res;
    }

      userUpdateSubmit(e){
        e.preventDefault();
        
        let newUser = {
            uid:this.props.userID,
            un:this.state.user_name,
            ucn:this.state.user_comp_name,
            unum:this.state.user_num
        }
        
        if(newUser.un.length<1){console.log("NAME TOO SMALL"); this.setError(true,"Name is too small"); return;}
        if(newUser.un.length>15){console.log("NAME TOO BIG");  this.setError(true,"Name is too big"); return;}
        if(newUser.unum.length<10){console.log("NUMBER TOO SMALL");this.setError(true,"Number is too small");  return;}
        if(newUser.unum.length>10){console.log("NUMBER TOO BIG");this.setError(true,"Number is too big");  return;}
        this.updateUserInfo(newUser);
        console.log("INTI UPDATE USER DATA for "+JSON.stringify(newUser));   
    }
   
   render(){
       return(
         <div id='app_setting_main_bdy'>
              <div id='app_setting_main_bdy_tit_main_cont'>
                         <div>
                         <div id='app_setting_main_bdy_tit_main_tit'>
                         {/* <svg className='app_full_left_lnk_class_ico_2' viewBox='0 0 512 512'><title>Grid</title><rect x='48' y='48' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='288' y='48' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='48' y='288' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='288' y='288' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg> */}
                         Setttings
                         </div>
                         </div>
                         <div id='app_land_main_bdy_butt_cont'>
                         </div>
                         </div>
           <ChangePassModal show={this.state.changePassModalVisi} onHide={()=>{this.setState({changePassModalVisi:false})}}></ChangePassModal>
           <DecactivateModal show={this.state.deacAccModalVisi} onHide={()=>{this.setState({deacAccModalVisi:false})}}></DecactivateModal>
               <div id='app_sett_main_main_bdy'>
                
                <Tabs defaultActiveKey="profile" className="app_setting_tab_main_cont_class"  id="app_setting_tab_main_cont"  variant='pills'>
                   <Tab eventKey="profile" className='app_setting_tab_main_tab_1_main_cont' title="Profile">
                   <div className='app_setting_tab_main_tab_1_cont'>
                           <div className='app_setting_tab_main_tab_1_cont_left'>
                               <div className='app_sett_tab_cont_pro' >
                               

                               <div className='app_setting_tab_main_tab_1_cont_opt_class'>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_tit_clsas'>
                                           Email Address
                                       </div>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_data_txt_cont'>
                                           <input className='app_setting_tab_main_tab_1_cont_opt_data_txt' disabled value={this.state.user_email} onChange={this.onNameChange.bind(this)}></input></div>
                               </div>

                                {this.state.isGoogleOwn==1?
                                <div id='gog_sgn_meth_cont'>
                                    <img src={gog_ico} id='gog_sgn_meth_cont_ico'></img>Google Sign-in Method
                               </div>:
                               <span>

                               </span>
                               }
                                <form onSubmit={this.userUpdateSubmit.bind(this)}>

                               <div className='app_setting_tab_main_tab_1_cont_opt_class'>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_tit_clsas'>
                                           Full Name*
                                       </div>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_data_txt_cont'>
                                        <input type="text" disabled={this.state.isLoading} className='app_setting_tab_main_tab_1_cont_opt_data_txt' value={this.state.user_name} onChange={this.onNameChange.bind(this)}></input></div>
                               </div>
                               
                               <div className='app_setting_tab_main_tab_1_cont_opt_class'>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_tit_clsas'>
                                           Mobile Phone number
                                       </div>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_data_txt_cont'
                                       ><input type="number" disabled={this.state.isLoading} className='app_setting_tab_main_tab_1_cont_opt_data_txt' value={this.state.user_num} onChange={this.onNumChange.bind(this)}></input></div>
                               </div>
                               <div className='app_setting_tab_main_tab_1_cont_opt_class'>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_tit_clsas'>
                                           Company Name
                                       </div>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_data_txt_cont'>
                                           <input type="text" disabled={this.state.isLoading} className='app_setting_tab_main_tab_1_cont_opt_data_txt' value={this.state.user_comp_name} onChange={this.onCompNameChange.bind(this)}></input></div>
                               </div>
                               {
                                        this.state.errCode===true?<div id='app_login_alrt_cont'>
                                        <Alert variant="danger">
                                            {this.state.errMessage}
                                        </Alert>
                                    </div>:this.state.isSucess===true?<div id='app_login_alrt_cont'>
                                        <Alert variant="success">
                                           Account Updated
                                        </Alert>
                                    </div>:<span></span>   
                                    }
                               <Button type='submit' className='app_sett_tab_sub_butt'disabled={this.state.isLoading}>{!this.state.isLoading===true?<span>Update Profile</span>:<Spinner id='app_sett_tab_sub_butt_spi' animation="border" variant="light" />}</Button>
                               </form>

                               </div>
                               <div className='app_sett_tab_cont_pro' >
                                       <div className='app_setting_tab_main_tab_1_cont_tit'>
                                           Notification Settings
                                       </div>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_class'>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_tit_clsas'>
                                           Email Notification
                                       </div>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_data_txt_cont'>
                                           <span id='app_sett_email_chck_inp_txt'>You wont recieve email Notification</span>
                                           <input id='app_sett_email_chck_inp' type="checkbox" 
                                            checked={this.state.isEmailNoti==1?true:false}
                                            onChange={this.onEmailNotiChange.bind(this)}
                                            >
                                            </input>
                                           </div>
                               </div>
                               </div>
                               </div>
                               
                       </div>
                       
                   </Tab>
                   <Tab eventKey="sec" title="Security">
                   <div className='app_setting_tab_main_tab_1_cont'>
                           <div className='app_setting_tab_main_tab_1_cont_left'>
                               <div className='app_sett_tab_cont_pro' >
                               
                               <div className='app_setting_tab_main_tab_1_cont_opt_class'>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_tit_clsas'>
                                           Password Change
                                       </div>
                                       {this.state.isGoogleOwn==1?
                                <div id='gog_sgn_meth_cont'>
                                    <img src={gog_ico} id='gog_sgn_meth_cont_ico'></img>Managed By Google
                               </div>:
                                <div className='app_setting_tab_main_tab_1_cont_opt_data_txt_cont'><Button className='app_sett_tab_pass_chang_butt' variant="secondary" onClick={() => { this.setState({changePassModalVisi :true}) }}>Change Password</Button></div>
                               }
                                
                               </div>
                           
                               
                               </div>
                               <div className='app_sett_tab_cont_pro' >
                                       <div className='app_setting_tab_main_tab_1_cont_tit'>
                                           Account Settings
                                       </div>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_class'>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_tit_clsas'>
                                           Deactivate Account
                                       </div>
                                       <div className='app_setting_tab_main_tab_1_cont_opt_data_txt_cont'><Button className='app_sett_tab_pass_chang_butt'variant="outline-danger"  onClick={() => { this.setState({deacAccModalVisi :true}) }}>Deactivate Account</Button></div>
                               </div>
                               </div>
                               </div>
                               
                       </div>
                   </Tab>
                   <Tab eventKey="api" title="Api">

                   </Tab>
                   </Tabs>
                   </div>
         </div>  
       );
   }
   }
   