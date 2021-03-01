import axios from 'axios';
import React, { useState,useEffect  } from 'react';
import {Dropdown,Button,Alert,Spinner,Tab,Modal,Tabs} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/land.css';
import '../style/addlink.css';
import '../App.css';
import qs from 'qs';

export default class AddLink extends React.Component{
     constructor(props){
       super(props);
          this.state={
               currStep:0,
          }
     }


     getNameComp(){
          return(<>
                         <div id='app_add_lnk_tit_cont'>
                              1) Start with giving your <br/> link a name
                         </div>
                         <div id='app_add_lnk_nam_cont'>
                              <input type='text' id='app_add_lnk_nam_fld' placeholder='Enter link name'>
                              </input>
                         </div>
          </>)
     }

     getLinkComp(){
          return(<>
                         <div id='app_add_lnk_tit_cont'>
                              2) Tell us the destination URL for link
                         </div>
                         <div id='app_add_lnk_nam_cont'>
                              <input type='text' id='app_add_lnk_nam_fld' placeholder='Enter destination URL'>
                              </input>
                         </div>
          </>)
     }

     getUrlComp(){
          return(<>
                         <div id='app_add_lnk_tit_cont'>
                              3) Heres the link
                         </div>
                         <div id='app_add_lnk_nam_cont'>
                              <div id='app_add_lnk_gen_lnk'>
                                htttps://www.Cytescale.com/hehehe     
                              <svg className='app_add_lnk_gen_lnk_ico' viewBox='0 0 512 512'><title>Clipboard</title><path d='M336 64h32a48 48 0 0148 48v320a48 48 0 01-48 48H144a48 48 0 01-48-48V112a48 48 0 0148-48h32' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><rect x='176' y='32' width='160' height='64' rx='26.13' ry='26.13' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/></svg>
                              </div>
                              <button id='app_add_lnk_gen_snd_butt'>
                                   Send link to email
                              </button>
                         </div>
          </>)
     }

     renderComp(){
          switch(this.state.currStep){
               case 0:{
                    return this.getNameComp();
               }
               case 1:{
                    return this.getLinkComp();
               }
               case 2:{
                    return this.getUrlComp();
               }
               default:{
                    return this.getNameComp();
               }
          }
     }

     


     render(){
          return(<>
               <div id='app_add_lnk_new_main_cont'>
               <div id='app_add_lnk_lft_cont'>
                         <div id='app_add_lnk_cls_cont'>
                         <svg className='app_add_lnk_cls_cont_ico' viewBox='0 0 512 512'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/></svg>
                         Create a new link
                         </div>
                         {this.renderComp()}
                         <div id='app_add_lnk_nxt_cont'>
                              {
                                   this.state.currStep>0?<button id='app_add_lnk_bck_butt'onClick={()=>{
                                        this.setState({
                                             currStep:this.state.currStep>=0?this.state.currStep-1:this.state.currStep
                                        })
                                   }}>
                                   Back
                              </button>:<span></span>
                              }
                              
                              <button id='app_add_lnk_nxt_butt' onClick={()=>{
                                   this.setState({
                                        currStep:this.state.currStep<2?this.state.currStep+1:this.state.currStep
                                   })
                              }}>Continue</button>
                         </div>
               </div>

               <div id='app_add_lnk_rgt_cont'></div>
               </div>
          </>);
     }
}