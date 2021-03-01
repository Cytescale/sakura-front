import axios from 'axios';
import React, { useState,useEffect  } from 'react';
import {Dropdown,Button,Alert,Spinner,Tab,Modal,Tabs,Accordion,Card,useAccordionToggle,DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/land.css';
import '../style/dash.css';
import '../App.css';
import copy from "copy-to-clipboard";  
import welcome_img from '../assets/img/wel_img.png';
import Chart from 'chart.js';
import qs from 'qs';



export default class Lander extends React.Component{
     constructor(props){
       super(props);
       this.state = {
            user_link_data:null,
            modalShow:false,
            deleteModalShow:false,
            new_link_name:'',
            new_link_dest:'',
            new_link_err:false,
            new_link_succ:false,
            new_link_err_mss:'',
            new_link_load:false,
            selec_del_id:null,
            selec_sort_opt:0,
            selec_filt_opt:0,
            selec_filt_tit:"All",
            land_wel_stat:true,
            link_search_qry:"",
          }
          this.getLinkInfo = this.getLinkInfo.bind(this);
          this.setModalShow  = this.setModalShow.bind(this);
          this.newLnkErrSetter = this.newLnkErrSetter.bind(this);     
          this.setLnkDetailNull = this.setLnkDetailNull.bind(this);
          this.setDeleteModalShow = this.setDeleteModalShow.bind(this);
          this.setSelecSort = this.setSelecSort.bind(this);
          this.setFiltSelec = this.setFiltSelec.bind(this);
          props.setPage(1);
     }

     setFiltSelec(int){
          this.setState({selec_filt_opt:int});
          switch(int){
               case 0:{
                    this.setState({selec_filt_tit:"All"});
                    break;
               }
               case 1:{
                    this.setState({selec_filt_tit:"Enabled"});
                    break;
               }
               case 2:{
                    this.setState({selec_filt_tit:"Disabled"});
                    break;
               }
               default:{
                    this.setState({selec_filt_tit:"All"});
                    break;
               }
          }
     }

     setSelec(int){
          this.setSelecSort(int).then((res)=>{
               if(res===false){return;}
               this.sortLinkDetails();
          });
     }
     async setSelecSort(int){
          this.setState({selec_sort_opt:int});
          return true;
     }
     sortByProperty(property){  
          return function(a,b){  
             if(a[property] > b[property])  
                return 1;  
             else if(a[property] < b[property])  
                return -1;  
         
             return 0;  
          }  
     }
     sortByAlpha(){
          let property = 'link_name';  
          return function(a,b){  
             if(a[property].toLowerCase()> b[property].toLowerCase())  
                return 1;  
             else if(a[property].toLowerCase() < b[property].toLowerCase())  
                return -1;  
             return 0;  
          }  
     }         
     searchQry(e){
          e.preventDefault();
          this.setState({link_search_qry:e.target.value});
     }
     sortLinkDetails(){
          if(this.state.user_link_data!==null){
          switch(this.state.selec_sort_opt){
               case 0:{
                         this.state.user_link_data.sort(this.sortByAlpha());
                         console.log("Link Data Sorted ALPHA");
                         break;
               }
               case 1:{
                    
                    console.log("Link Data Sorted AGE");
                    break;
               }
               case 2:{
                    
                    console.log("Link Data Sorted CLICK");
                    break;
               }
               default:{
                    this.state.user_link_data.sort(this.sortByAlpha());
                    console.log("Link Data Sorted ALPHA");
                    break;

               }
               }
          }
     }
     copytoClip(txt){
          copy(txt);  
     }
     setModalShow(bool,){
          this.setState({modalShow:bool}); 
     }
     setDeleteModalShow(bool,int){
          this.setState({deleteModalShow:bool,selec_del_id:int});
      
     }
     setLnkDetailNull(){
          this.setState({
               new_link_name:'',
               new_link_dest:'',
               new_link_err:false,
          })
     }
     onLnkNameChange(event) {
          this.setState({new_link_name: event.target.value})
     }
     onLnkDestChange(event){
          this.setState({new_link_dest: event.target.value})
     }
     newLnkErrSetter(bool,val){
          this.setState({
               new_link_err:bool,
               new_link_err_mss:val,
               new_link_load:false,
               new_link_err:false,
          });
     }
     LnkCrtButt(e){
          e.preventDefault();
          if(this.state.new_link_name==""||this.state.new_link_name==null){
               console.log("EMPTY NAME");
               this.newLnkErrSetter(true,"Enter Name");
               return;
          }
          if(this.state.new_link_dest==""||this.state.new_link_dest==null){
               console.log("EMPTY DEST");
               this.newLnkErrSetter(true,"Enter Destination");
               return;
          }
          
          const new_link_send_data = {
               UID:this.props.userID,
               link_name:this.state.new_link_name,
               link_dest:this.state.new_link_dest,
          }

          console.log("NEW LINK DATA"+JSON.stringify(new_link_send_data));

          this.createLinkReq(new_link_send_data);
     }
     deleteLink(int){
          if(int !== undefined && int !== null){
          this.deleteLinkPost();
          }
     }
     MyVerticallyCenteredModal() {
          return (
            <Modal
            show={this.state.modalShow}
               onHide={() => this.setModalShow(false)}
              
              aria-labelledby="contained-modal-title-vcenter"
              
            >
              
              <Modal.Body>
                <div className='app_creat_lnk_modal_main_cont'>
                                   <form  onSubmit={this.LnkCrtButt.bind(this)}>
                                   <div className='app_creat_lnk_modal_main_cont_tit' >Link Creation</div>
                                   <div className='app_setting_tab_main_tab_1_cont_opt_class'>
                                            <div className='app_setting_tab_main_tab_1_cont_opt_tit_clsas'>
                                                Link Name
                                            </div>
                                            <div className='app_setting_tab_main_tab_1_cont_opt_data_txt_cont'>
                                                <input className='app_setting_tab_main_tab_1_cont_opt_data_txt'  disabled={this.state.new_link_load} placeholder='Enter links name '  onChange={this.onLnkNameChange.bind(this)}></input></div>
                                    </div>
                                    <div className='app_setting_tab_main_tab_1_cont_opt_class'>
                                            <div className='app_setting_tab_main_tab_1_cont_opt_tit_clsas'>
                                                Link Address
                                            </div>
                                            <div className='app_setting_tab_main_tab_1_cont_opt_data_txt_cont'>
                                                <input className='app_setting_tab_main_tab_1_cont_opt_data_txt'  disabled={this.state.new_link_load}  placeholder='Enter links destination address '  onChange={this.onLnkDestChange.bind(this)}></input></div>
                                    </div>
                                    {
                                         this.state.new_link_err===true?
                                         <div id='app_login_alrt_cont'>
                                         <Alert variant="danger">
                                             {this.state.new_link_err_mss}
                                         </Alert>
                                     </div>:
                                        this.state.new_link_succ===true?
                                        <Alert variant="success">
                                             Link Creation Successfull
                                        </Alert>:
                                        <span></span>
                                    }
                                    <Button className='app_creat_lnk_modal_main_crt_butt' type='submit' disabled={this.state.new_link_load}>{!this.state.new_link_load?<span>Create</span>:<span><Spinner className='app_creat_lnk_modal_main_crt_butt_load' animation="grow" variant="primary" /></span>}</Button>
                                    </form>
                </div>
              </Modal.Body>
            </Modal>
          );
     }     
     DeleteLinkModal() {
          return (
            <Modal
            show={this.state.deleteModalShow}
               onHide={() => this.setDeleteModalShow(false)}
              aria-labelledby="contained-modal-title-vcenter"
          
            >
              
              <Modal.Body>
                <div className='app_creat_lnk_modal_main_cont'>

                         <Alert className='app_del_modal_moto_txt_cont' variant='danger'>Are you sure , you want to delete this link?</Alert>
                         <div className='app_del_modal_butt_cont'>
                              <Button className='app_del_modal_butt' variant='light' onClick={()=>{this.setDeleteModalShow(false)}}>Cancel</Button>
                              <Button className='app_del_modal_butt' variant='danger' onClick={()=>{this.deleteLink(this.state.selec_del_id)}}>Delete</Button>
                         </div>
                </div>
              </Modal.Body>
            </Modal>
          );
     }      
      CreateLinkButton() {
          return (
            <>
              <Button className='app_dash_cent_crt_lnk_butt' variant="primary" onClick={() => this.setModalShow(true)}>
                <svg className='app_dash_cent_crt_lnk_butt_ico'viewBox='0 0 512 512'><title>Add</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M256 112v288M400 256H112'/></svg>
                Create Link
              </Button>
               {this.MyVerticallyCenteredModal()}
            </>
          );
     }  
     linkstatuschange(int){
               if(this.state.user_link_data[int].link_status===1){
                    this.statusChangeLinkPost(this.state.user_link_data[int].link_spcl_id,0);
               }
               else{
                    this.statusChangeLinkPost(this.state.user_link_data[int].link_spcl_id,1);
               }
     }
     async createLinkReq(link_create_data){
          this.setState({new_link_load:true});
          console.log("GET USER INFO INIT at UID"+link_create_data.uid);
          let res = await axios("http://localhost:8080/createLink/", {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            data: qs.stringify(link_create_data)
          }).then(res=>{
               this.setState({new_link_load:false});
              console.log(" "+JSON.stringify(res.data)); 
              switch(res.data.code){
                   case 200:{
                    if(res.data.insertId!==null){
                         this.setModalShow(false);
                         this.props.addNot("Link Created");
                         this.getLinkInfo();
                    }          
                    break;
                   }
                   case 202:{
                    this.newLnkErrSetter(true,'Bad URL');
                    break;
                   }
                   case 203:{
                    this.newLnkErrSetter(true,'URL has false OK');
                    break;
                   }
                   case 205:
                   {
                    this.newLnkErrSetter(true,'Only Youtube URLs allowed currently');
                    break;
                   }
               
                   default:{
                    this.newLnkErrSetter(true,'No Status Code');
                    break;
                   }
              } 
              



          }).catch(err=>{
              this.props.addNot("Link Creation","err");
              console.log(err);
              this.newLnkErrSetter(true,'Link Creation Error');
              return(false);
         });
         return res;
     }
     async getLinkInfo(){
          let get_link_post_data = {
               uid:this.props.userID,
          }
          console.log("GET LINK INFO INIT at UID"+this.props.userID);
          let res = await axios("http://localhost:8080/getLinkInfo/", {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            data: qs.stringify(get_link_post_data)
          }).then(res=>{
     //         console.log(" "+JSON.stringify(res.data)); 
              this.setState({
                   user_link_data : res.data
              });
              
          }).catch(err=>{
              this.props.addNot("Link Creation","err");
              console.log(err)
              return(false);
         });
         
     }
     async deleteLinkPost(){
     let del_link_post_data = {
          uid:this.props.userID,
          lnk_spcl_id: this.state.selec_del_id,
     }
     console.log("INIT LINK DELETE"+JSON.stringify(del_link_post_data));
     let res = await axios("http://localhost:8080/delLink/", {
       method: 'POST',
       mode: 'no-cors',
       cache: 'no-cache',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
       },
       credentials: 'same-origin',
       redirect: 'follow',
       referrerPolicy: 'no-referrer', 
       data: qs.stringify(del_link_post_data)
     }).then(res=>{
          console.log(" "+JSON.stringify(res.data)); 
          if(res.data.del_status===true){
               this.props.addNot(res.data.mess);     
          }
          else{
               this.props.addNot(res.data.mess,'err');     
          }
          
        
     }).catch(err=>{
         this.props.addNot("Link DELETION","err");
         console.log(err)
         return(false);
    });
    this.setDeleteModalShow(false);
    this.getLinkInfo();
     }
     async statusChangeLinkPost(link_spcl_id,stat){
     let stat_link_post_data = {
          uid:this.props.userID,
          lnk_spcl_id: link_spcl_id,
          link_status:stat,
     }
     console.log("INIT LINK STATUS CHANGE"+JSON.stringify(stat_link_post_data));
     let res = await axios("http://localhost:8080/linkStatus/", {
       method: 'POST',
       mode: 'no-cors',
       cache: 'no-cache',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
       },
       credentials: 'same-origin',
       redirect: 'follow',
       referrerPolicy: 'no-referrer', 
       data: qs.stringify(stat_link_post_data)
     }).then(res=>{
          console.log(" "+JSON.stringify(res.data)); 
          if(res.data.link_change_resp===true){
               this.props.addNot(res.data.mess);     
          }
          else{
               this.props.addNot(res.data.mess,'err');     
          }
          
        
     }).catch(err=>{
         this.props.addNot("Link DELETION","err");
         console.log(err)
         return(false);
    });
    this.getLinkInfo();
     }

  renderLinkTableRowFor(){
     let rows = [];
     let found = 0;
     for(let i in this.state.user_link_data){
          if(this.state.link_search_qry.length > 0){
                    if(this.state.user_link_data[i].link_name.includes(this.state.link_search_qry)===false){
                         continue;
                    }
                    else{
                         found = found + 1;
                    }
          }
          if(this.state.selec_filt_opt===1){
               if(this.state.user_link_data[i].link_status!==1){
                    continue;
               }
          }
          if(this.state.selec_filt_opt===2){
               if(this.state.user_link_data[i].link_status!==0){
                    continue;
               }
          }
          
          rows.push(
          <tr className='app_land_tab_table_head_row_dat_row'>
          <td className='app_land_tab_table_head_row_dat_name'>
               <a href={"/analytics/"+this.state.user_link_data[i].link_spcl_id} className='app_land_tab_table_head_row_dat_row_a_cont'>
               <svg className='app_land_tab_table_head_row_dat_row_a_cont_ico' viewBox='0 0 512 512'><path d='M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z' fill='currentColor'/></svg>
               {this.state.user_link_data[i].link_name}
               </a>
               </td>
          <td className='app_land_tab_table_head_row_dat'>
          
          <a  className='app_land_tab_table_head_row_dat_lnk_main_cont' href='#'>localhost:8080/link/{this.state.user_link_data[i].link_spcl_id}<svg className='app_land_tab_table_head_row_dat_link_ico' viewBox='0 0 512 512'><title>Open</title><path d='M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48M336 64h112v112M224 288L440 72' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg> </a>
          <button className='app_land_tab_table_head_row_dat_lnk_copy_butt' onClick={()=>{
               this.copytoClip("localhost:8080/link/"+this.state.user_link_data[i].link_spcl_id);
               this.props.addNot("Link copied to clipboard");
          }}>
          <svg className='app_land_tab_table_head_row_dat_lnk_copy_ico' viewBox='0 0 512 512'><title>Copy</title><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
          </button>
          
          </td>
          
          <td className='app_land_tab_table_head_row_dat_amt_cont'>0</td>
          <td className='app_land_tab_table_head_row_dat_amt_cont'>0</td>
          <td className='app_land_tab_table_head_row_dat'>
               <Button variant={'light'} className='app_land_tab_table_head_row_del_lnk' onClick={()=>{this.setDeleteModalShow(true,this.state.user_link_data[i].link_spcl_id)}}>
               <svg className='app_land_tab_table_head_row_dat_del_ico' viewBox='0 0 512 512'><title>Trash</title><path d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M80 112h352'/><path d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
               </Button>

               
               </td>
          <td className='app_land_tab_table_head_row_dat'>
          <label class="switch">
          <input type="checkbox" checked={this.state.user_link_data[i].link_status===1?true:false} onChange={()=>{
                    this.linkstatuschange(i);
          }} />
          <span class="slider round"></span>
          </label>
          </td>
     
          </tr>);
       }
       if(this.state.link_search_qry.length> 0 && found==0){
       
       }
       return rows;
  }

  renderLinkTable(){
     this.sortLinkDetails();
     return(
          <table id='app_land_tab_table'>
          <thead>
          <tr id='app_land_tab_table_head_row'>
          <th className='app_land_tab_table_head_row_tit'>
               <button className='app_land_tab_table_head_row_tit_name_sort_cont' style={{color:this.state.selec_sort_opt===0?'#0E98FF':'#bdbdbd'}} onClick={()=>{this.setSelec(0)}}>
               Name <svg className='app_land_tab_table_head_row_tit_sort_ico' viewBox='0 0 512 512'><path d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' fill='currentColor'/></svg>
               </button>     
          </th>
          <th className='app_land_tab_table_head_row_tit'>Path</th>
          <th className='app_land_tab_table_head_row_tit'>
          <button className='app_land_tab_table_head_row_tit_name_sort_cont' style={{color:this.state.selec_sort_opt===1?'#0E98FF':'#bdbdbd'}} onClick={()=>{this.setSelec(1)}}>
               Age (Days) <svg className='app_land_tab_table_head_row_tit_sort_ico' viewBox='0 0 512 512'><path d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' fill='currentColor'/></svg>
               </button>     
          </th>
          <th className='app_land_tab_table_head_row_tit'>
          <button className='app_land_tab_table_head_row_tit_name_sort_cont' style={{color:this.state.selec_sort_opt===2?'#0E98FF':'#bdbdbd'}} onClick={()=>{this.setSelec(2)}}>
               Clicks <svg className='app_land_tab_table_head_row_tit_sort_ico' viewBox='0 0 512 512'><path d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' fill='currentColor'/></svg>
               </button>     
          </th>
          <th className='app_land_tab_table_head_row_tit'></th>
          <th className='app_land_tab_table_head_row_tit_swt'></th>
          </tr>
          </thead>
          <tbody  id='app_land_tab_table_bdy_cont' >
          {this.renderLinkTableRowFor()}
          </tbody>
          </table>
       );
  }

    componentDidMount(){
     //this.makeGraph2();
     this.getLinkInfo();
     
    }

     render(){

          return(<>

               <div className='app_land_main_cont'>
                         {this.DeleteLinkModal()}
                         {/* <div className='app_land_main_bg_cont_2'></div> */}
                         <div id='app_setting_main_bdy_tit_main_cont'>
                         <div>
                         
                         <div id='app_setting_main_bdy_tit_main_tit'>
                         {/* <svg className='app_full_left_lnk_class_ico_2' viewBox='0 0 512 512'><title>Grid</title><rect x='48' y='48' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='288' y='48' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='48' y='288' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='288' y='288' width='176' height='176' rx='20' ry='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg> */}
                         Dashboard
                         </div>
                         </div>
                         <div id='app_land_main_bdy_butt_cont'>
                         {this.CreateLinkButton()}
                         </div>
                         
                         </div>

                         {/* <div className='app_land_sec_tit_cont'>Overview</div>
                         <div id='app_land_dash_data_main_cont'>
                              <div className='app_land_dash_data_cont'>
                              <div  className='app_land_dash_data_tit_cont'>
                                        <div className='app_land_dash_data_tit'>Total Links</div>
                                        <svg className='app_land_dash_data_tit_ques' viewBox='0 0 512 512'><path d='M288.55 150.84c-8.09-3.86-20-6-32.72-5.82-18 .22-33.13 5.2-45 14.78-23 18.48-24.55 40.37-24.77 42.8a61.69 61.69 0 00-.09 12 3 3 0 003 2.69h21.23a3 3 0 003-3A65.7 65.7 0 01214 204c0-.11 1.14-11.7 14.36-22.34 7-5.64 16.11-8.44 27.83-8.59 9.32-.11 16.93 1.47 20.34 3.09C291 183 298 192.31 298 204.57c0 18-10.9 26.23-30.18 39.18C247.08 257.68 237 275.1 237 297v11a3 3 0 003 3h22a3 3 0 003-3v-11c0-9.16 2.23-19.13 18.44-30 19.95-13.41 42.56-28.6 42.56-62.43 0-23.14-13.3-42.23-37.45-53.73z' fill='currentColor'/><path d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64zm10.44 302h-30.21a2.57 2.57 0 01-2.56-2.57v-30.2a2.57 2.57 0 012.56-2.57h30.21a2.57 2.57 0 012.56 2.57v30.2a2.57 2.57 0 01-2.56 2.57zm17-99C267.23 277.88 265 287.85 265 297v11a3 3 0 01-3 3h-22a3 3 0 01-3-3v-11c0-21.91 10.08-39.33 30.82-53.26C287.1 230.8 298 222.6 298 204.57c0-12.26-7-21.57-21.49-28.46-3.41-1.62-11-3.2-20.34-3.09-11.72.15-20.82 2.95-27.83 8.59C215.12 192.25 214 203.84 214 204a65.7 65.7 0 00-.84 10.28 3 3 0 01-3 3h-21.25a3 3 0 01-3-2.69 61.69 61.69 0 01.09-12c.22-2.43 1.8-24.32 24.77-42.8 11.91-9.58 27.06-14.56 45-14.78 12.7-.15 24.63 2 32.72 5.82 24.21 11.51 37.51 30.6 37.51 53.74 0 33.83-22.61 49.02-42.56 62.43z'/></svg>
                                        </div>
                                        <div className='app_land_dash_data_data' id='app_lnd_dat_1'>0</div>
                                        
                              </div>
                              <div className='app_land_dash_data_cont'>
                                        
                                        <div  className='app_land_dash_data_tit_cont'><div className='app_land_dash_data_tit'>Total Clicks</div>
                                        <svg className='app_land_dash_data_tit_ques' viewBox='0 0 512 512'><path d='M288.55 150.84c-8.09-3.86-20-6-32.72-5.82-18 .22-33.13 5.2-45 14.78-23 18.48-24.55 40.37-24.77 42.8a61.69 61.69 0 00-.09 12 3 3 0 003 2.69h21.23a3 3 0 003-3A65.7 65.7 0 01214 204c0-.11 1.14-11.7 14.36-22.34 7-5.64 16.11-8.44 27.83-8.59 9.32-.11 16.93 1.47 20.34 3.09C291 183 298 192.31 298 204.57c0 18-10.9 26.23-30.18 39.18C247.08 257.68 237 275.1 237 297v11a3 3 0 003 3h22a3 3 0 003-3v-11c0-9.16 2.23-19.13 18.44-30 19.95-13.41 42.56-28.6 42.56-62.43 0-23.14-13.3-42.23-37.45-53.73z' fill='currentColor'/><path d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64zm10.44 302h-30.21a2.57 2.57 0 01-2.56-2.57v-30.2a2.57 2.57 0 012.56-2.57h30.21a2.57 2.57 0 012.56 2.57v30.2a2.57 2.57 0 01-2.56 2.57zm17-99C267.23 277.88 265 287.85 265 297v11a3 3 0 01-3 3h-22a3 3 0 01-3-3v-11c0-21.91 10.08-39.33 30.82-53.26C287.1 230.8 298 222.6 298 204.57c0-12.26-7-21.57-21.49-28.46-3.41-1.62-11-3.2-20.34-3.09-11.72.15-20.82 2.95-27.83 8.59C215.12 192.25 214 203.84 214 204a65.7 65.7 0 00-.84 10.28 3 3 0 01-3 3h-21.25a3 3 0 01-3-2.69 61.69 61.69 0 01.09-12c.22-2.43 1.8-24.32 24.77-42.8 11.91-9.58 27.06-14.56 45-14.78 12.7-.15 24.63 2 32.72 5.82 24.21 11.51 37.51 30.6 37.51 53.74 0 33.83-22.61 49.02-42.56 62.43z'/></svg>
                                        </div>
                                        <div className='app_land_dash_data_data' id='app_lnd_dat_2'>1000</div>
                                        
                              </div>
                              <div className='app_land_dash_data_cont'>
                                        
                                        <div  className='app_land_dash_data_tit_cont'><div className='app_land_dash_data_tit'>New Viewers</div>
                                        <svg className='app_land_dash_data_tit_ques' viewBox='0 0 512 512'><path d='M288.55 150.84c-8.09-3.86-20-6-32.72-5.82-18 .22-33.13 5.2-45 14.78-23 18.48-24.55 40.37-24.77 42.8a61.69 61.69 0 00-.09 12 3 3 0 003 2.69h21.23a3 3 0 003-3A65.7 65.7 0 01214 204c0-.11 1.14-11.7 14.36-22.34 7-5.64 16.11-8.44 27.83-8.59 9.32-.11 16.93 1.47 20.34 3.09C291 183 298 192.31 298 204.57c0 18-10.9 26.23-30.18 39.18C247.08 257.68 237 275.1 237 297v11a3 3 0 003 3h22a3 3 0 003-3v-11c0-9.16 2.23-19.13 18.44-30 19.95-13.41 42.56-28.6 42.56-62.43 0-23.14-13.3-42.23-37.45-53.73z' fill='currentColor'/><path d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64zm10.44 302h-30.21a2.57 2.57 0 01-2.56-2.57v-30.2a2.57 2.57 0 012.56-2.57h30.21a2.57 2.57 0 012.56 2.57v30.2a2.57 2.57 0 01-2.56 2.57zm17-99C267.23 277.88 265 287.85 265 297v11a3 3 0 01-3 3h-22a3 3 0 01-3-3v-11c0-21.91 10.08-39.33 30.82-53.26C287.1 230.8 298 222.6 298 204.57c0-12.26-7-21.57-21.49-28.46-3.41-1.62-11-3.2-20.34-3.09-11.72.15-20.82 2.95-27.83 8.59C215.12 192.25 214 203.84 214 204a65.7 65.7 0 00-.84 10.28 3 3 0 01-3 3h-21.25a3 3 0 01-3-2.69 61.69 61.69 0 01.09-12c.22-2.43 1.8-24.32 24.77-42.8 11.91-9.58 27.06-14.56 45-14.78 12.7-.15 24.63 2 32.72 5.82 24.21 11.51 37.51 30.6 37.51 53.74 0 33.83-22.61 49.02-42.56 62.43z'/></svg>
                                        </div>
                                        <div className='app_land_dash_data_data' id='app_lnd_dat_4'>909</div>
                                        
                              </div>
                              
                         </div>  */}


                         {/* <div className='app_land_sec_tit_cont'>Create Link</div>
                         <div className='app_dash_cent_crt_lnk_cont'>
                         {
                                   this.CreateLinkButton()
                         }
                         </div> */}
                         <div className='app_land_welcome_mess_main_cont' style={{display:this.state.land_wel_stat===true?'inline-flex':'none'}}>
                                   <Button className='app_land_welcome_mess_main_close_butt' onClick={()=>{
                                        this.setState({land_wel_stat:false})
                                   }}>
                                        <svg className='app_land_welcome_mess_main_close_butt_ico' viewBox='0 0 512 512'><title>Close Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M320 320L192 192M192 320l128-128'/></svg>
                                   </Button>
                                   Welcome  to Sakura
                                   <img src={welcome_img} className='app_land_welcome_mess_main_cont_ico'/>
                         </div>
                                   <div className='app_land_sec_tit_cont'>
                                   <div  className='app_land_sec_tit'>All Links</div>
                                        <div className='app_land_tab_butt_cont'>
                                        <DropdownButton id="dropdown-basic-button" title={this.state.selec_filt_tit} variant='primary'>
                                        <Dropdown.Header className='app_land_fil_men_head_cont'><svg className='app_land_fil_men_ico' viewBox='0 0 512 512'><title>Filter Circle</title><path fill='none' stroke='currentColor' stroke-width='32' stroke-miterlimit='10' d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'/><path fill='none' stroke='currentColor' stroke-width='32' stroke-linecap='round' stroke-linejoin='round' d='M144 208h224M176 272h160M224 336h64'/></svg>Filter</Dropdown.Header>
                                        <Dropdown.Item className='app_land_fil_men_head_cont_butt' as="button" onClick={()=>{this.setFiltSelec(0)}} active={this.state.selec_filt_opt===0?true:false}>All</Dropdown.Item>
                                        <Dropdown.Item className='app_land_fil_men_head_cont_butt' as="button" onClick={()=>{this.setFiltSelec(1)}} active={this.state.selec_filt_opt===1?true:false}>Enabled</Dropdown.Item>
                                        <Dropdown.Item className='app_land_fil_men_head_cont_butt' as="button" onClick={()=>{this.setFiltSelec(2)}} active={this.state.selec_filt_opt===2?true:false}>Disabled</Dropdown.Item>
                                        </DropdownButton>
                                        </div>
                                   </div>

                         <div id='app_land_tab_main_main_cont'>
                       
                         <div id='app_land_tab_cont'>
                                   
                              <div id='app_land_tab_table_main_cont'>
                              <div id='app_land_tab_srch_cont'>
                                        <div id='app_land_tab_left_cont'>  
                                        <svg className='app_land_tab_left_cont_srch_ico' style={{color:this.state.link_search_qry.length>0?'0E98FF':'#000'}} viewBox='0 0 512 512'><title>Search</title><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M338.29 338.29L448 448'/></svg>
                                        <input type='text' id='app_land_tab_srch' placeholder='Find your links by name' onChange={event=>this.searchQry(event)}/>
                                      
                                        </div>
                                        <div id='app_land_tab_right_cont'>

                                        <button id='app_land_tab_rel_butt' onClick={()=>{
                                             this.getLinkInfo(); 
                                             this.props.addNot("Data refreshed");
                                        }}>
                                        <svg id='app_land_tab_rel_butt_ico' viewBox='0 0 512 512'><path d='M320 146s24.36-12-64-12a160 160 0 10160 160' fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M256 58l80 80-80 80'/></svg>
                                        </button>

                                        </div>
                              </div>   

                              {
                              this.state.user_link_data !== null?this.renderLinkTable():<span></span>
                              }
                              </div>
                              
                         </div>
                    
                         </div>
               </div>
          </>)
     }

}