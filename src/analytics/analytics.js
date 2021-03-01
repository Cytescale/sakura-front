import axios from 'axios';
import React, { useState,useEffect,useParams  } from 'react';
import {Dropdown,Button,Alert,Spinner,Tab,Modal,DropdownButton,Tabs,Accordion,Card,useAccordionToggle,Row,Col,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/analytics.css';
import '../style/dash.css';
import '../App.css';
import Chart from 'chart.js';
import qs from 'qs';


let ana_click_fak_data = [{"id":39,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T17:48:28.000Z"},{"id":40,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T17:48:40.000Z"},{"id":41,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T17:48:47.000Z"},{"id":42,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T18:21:08.000Z"},{"id":43,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T18:28:02.000Z"},{"id":48,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T18:28:55.000Z"},{"id":50,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T18:40:14.000Z"},{"id":51,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T18:45:19.000Z"},{"id":53,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T19:18:44.000Z"},{"id":54,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-05T19:23:21.000Z"},{"id":55,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-06T14:24:16.000Z"},{"id":56,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-06T14:24:35.000Z"},{"id":57,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-06T15:38:51.000Z"},{"id":58,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-06T21:40:03.000Z"},{"id":59,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-06T21:40:26.000Z"},{"id":60,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-06T21:41:41.000Z"},{"id":61,"ana_link_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","ip_add":"::1","timestamp":"2021-02-06T21:57:22.000Z"}];
let ana_os_fak_data = [{"id":19,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:10.000Z"},{"id":20,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:26.000Z"},{"id":21,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:26.000Z"},{"id":22,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:26.000Z"},{"id":23,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:26.000Z"},{"id":24,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:26.000Z"},{"id":25,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:26.000Z"},{"id":26,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:26.000Z"},{"id":27,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:27.000Z"},{"id":28,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:27.000Z"},{"id":29,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:27.000Z"},{"id":30,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:27.000Z"},{"id":31,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:32:27.000Z"},{"id":32,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:46:09.000Z"},{"id":33,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:46:36.000Z"},{"id":34,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:46:44.000Z"},{"id":35,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-05T17:47:02.000Z"},{"id":36,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T17:47:08.000Z"},{"id":37,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T17:48:24.000Z"},{"id":38,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T17:48:28.000Z"},{"id":39,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T17:48:40.000Z"},{"id":40,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T17:48:47.000Z"},{"id":41,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T18:21:08.000Z"},{"id":42,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T18:28:02.000Z"},{"id":47,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T18:28:55.000Z"},{"id":49,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T18:40:14.000Z"},{"id":50,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T18:45:19.000Z"},{"id":52,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T19:18:44.000Z"},{"id":53,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-05T19:23:21.000Z"},{"id":54,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-06T14:24:16.000Z"},{"id":55,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-06T14:24:35.000Z"},{"id":56,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-06T15:38:51.000Z"},{"id":57,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-06T21:40:03.000Z"},{"id":58,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-06T21:40:26.000Z"},{"id":59,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-06T21:41:41.000Z"},{"id":60,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"iOS","browser_type":"Edge","lang":"en-US","timestamp":"2021-02-06T21:57:22.000Z"},{"id":61,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-06T22:31:53.000Z"},{"id":62,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","os_type":"Windows","browser_type":"Netscape","lang":"en-US","timestamp":"2021-02-06T23:39:47.000Z"}];
let ana_loca_fak_data = [{"id":1,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"null","city":"Pune","country":"India","timestamp":"2021-02-09T19:56:39.000Z"},{"id":2,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"null","city":"Pune","country":"India","timestamp":"2021-02-09T19:58:02.000Z"},{"id":3,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"null","city":"Pune","country":"India","timestamp":"2021-02-09T19:02:42.000Z"},{"id":4,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"null","city":"Pune","country":"India","timestamp":"2021-02-09T19:04:47.000Z"},{"id":5,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"null","city":"Pune","country":"India","timestamp":"2021-02-09T19:05:04.000Z"},{"id":6,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"null","city":"Pune","country":"India","timestamp":"2021-02-09T19:05:14.000Z"},{"id":7,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"null","city":"Pune","country":"India","timestamp":"2021-02-09T19:08:07.000Z"},{"id":8,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"null","city":"Pune","country":"India","timestamp":"2021-02-09T19:08:38.000Z"},{"id":9,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"null","city":"Pune","country":"India","timestamp":"2021-02-09T19:11:17.000Z"},{"id":10,"ana_lnk_spcl_id":"GI3E","ana_tab_spcl_id":"joCc-itySb","state":"Maharashtra","city":"Pune","country":"India","timestamp":"2021-02-09T19:11:40.000Z"}];


export default class Analytic extends React.Component{
     link_spcl_key = null;
     brow_color_list =  ["rgba(14,152,255,1)",'rgba(156,255,178,1)','#D6A1FF'];
     constructor(props){
       super(props);
       this.state= {
            curr_time_selec:0,
            tot_click_count:0,
            tot_visit_count:0,
            brow_list:[],
            os_list:[],
            lang_list:[],
            countryList:[],
       }
       props.setPage(2);
       console.log("ANALYTICS SPCL ID"+this.props.match.params.lind_id);
       this.link_spcl_key = this.props.match.params.lind_id;
       this.setCurrPeriod = this.setCurrPeriod.bind(this);
       this.setTotalClicKCount= this.setTotalClicKCount.bind(this);
       this.makeGraph2 = this.makeGraph2.bind(this);
       this.makeGraphVisit =this.makeGraphVisit.bind(this);
       this.setBrowList = this.setBrowList.bind(this);
       this.setOsList = this.setOsList.bind(this);
       this.setCountryList = this.setCountryList.bind(this);
       this.setLangList = this.setLangList.bind(this);
     }

     setCountryList(list){
          this.setState({
               countryList:list
          });
     }

     setBrowList(list){
          this.setState({
               brow_list:list
          });
     }
     setOsList(list){
          this.setState({
               os_list:list
          });
     }
     setLangList(list){
          this.setState({
               lang_list:list
          });
     }

     setTotalClicKCount(int){
          this.setState({
               tot_click_count:int
          });
     }
     setTotalUniCount(int){
          this.setState({
               tot_visit_count:int
          });
     }


     setCurrPeriod(int){
          this.setState({curr_time_selec:int});
          console.log("CURR PERDIOD"+int);
          this.makeGraph2(int);
          this.makeGraphVisit(int);
          this.getCountryList();
          this.makeGraphVisitLang();
     }

     getClickGraphXTitle(selec){
          switch(selec){
               case 0:{
                    return "Time (24 hrs)";
                    break;
               }
               case 1:{                    
                    return "Day";
                    break;
               }
               case 2:{
                    return "Date";
                    break;
               }
               case 3:{
                    return "Month";
                    break;
               }
               default:{
                    return "Time (24 hrs)";
                    break;
               }
          }
     }
     
     getPeriodTitle(){
          switch(this.state.curr_time_selec){
               case 0:{
                    return "Last Day";
                    break;
               }
               case 1:{                    
                    return "Last Week";
                    break;
               }
               case 2:{
                    return "Last Month";
                    break;
               }
               case 3:{
                    return "Last Year";
                    break;
               }
               default:{
                    return "Last Day";
                    break;
               }
          }
     }
     
     getGrapYAxisTitle(tab_y_arry,selec){
          let weekday = new Array(7);
          weekday[0] = "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";
          var month = new Array();
          month[0] = "January";
          month[1] = "February";
          month[2] = "March";
          month[3] = "April";
          month[4] = "May";
          month[5] = "June";
          month[6] = "July";
          month[7] = "August";
          month[8] = "September";
          month[9] = "October";
          month[10] = "November";
          month[11] = "December";
          
          let tab_y_arry_tit = [];
          switch(selec){
               case 0:{
                    for(let i = tab_y_arry.length ; i > 0  ; i--){
                         tab_y_arry_tit.push(tab_y_arry[i-1][0] + ":00");
                    }     
                    break;
               }
               case 1:{                    
                    for(let i = tab_y_arry.length ; i > 0  ; i--){
                         tab_y_arry_tit.push(weekday[tab_y_arry[i-1][0]]);
                    }   
                    break;
               }
               case 2:{
                    for(let i = tab_y_arry.length ; i > 0  ; i--){
                         tab_y_arry_tit.push(tab_y_arry[i-1][0]);
                    }   
                    break;
               }
               case 3:{
                    for(let i = tab_y_arry.length ; i > 0  ; i--){
                         tab_y_arry_tit.push(month[tab_y_arry[i-1][0]]);
                    }    
                    break;
               }
               default:{
                    for(let i = tab_y_arry.length ; i > 0  ; i--){
                         tab_y_arry_tit.push(tab_y_arry[i-1] + ":00");
                    } 
                    break;
               }
          }
          return tab_y_arry_tit;
     }

     getGraphYAxis(selec){
          let tab_y_arry = []
          let prev_date;
          prev_date = new Date();
          switch(selec){
               case 0:{
                    for(let i = 0 ; i < 24 ; i++){
                         let complexPush = []
                         complexPush.push(prev_date.getHours());
                         complexPush.push(prev_date.getDate());
                         tab_y_arry.push(complexPush);
                         prev_date.setHours(prev_date.getHours()-1);
                    }         
                    break;
               }
               case 1:{                    
                    for(let i = 0 ; i < 7 ; i++){
                         let complexPush=[];
                         complexPush.push(prev_date.getDay());
                         complexPush.push(prev_date.getDate());
                         tab_y_arry.push(complexPush);
                         prev_date.setDate(prev_date.getDate()-1)
                    }  
                    break;
               }
               case 2:{
                    for(let i = 0 ; i < 30 ; i++){
                         let complexPush=[];
                         complexPush.push(prev_date.getDate());
                         complexPush.push(prev_date.getMonth());
                         tab_y_arry.push(complexPush);
                         prev_date.setDate(prev_date.getDate()-1)
                    }  
                    break;
               }
               case 3:{
                    for(let i = 0 ; i < 12 ; i++){
                         let complexPush=[];
                         complexPush.push(prev_date.getMonth());
                         complexPush.push(prev_date.getFullYear()); 
                         tab_y_arry.push(complexPush);
                         prev_date.setMonth(prev_date.getMonth()-1)
                    }  
                    break;
               }
               default:{
                    for(let i = 0 ; i < 24 ; i++){
                         tab_y_arry.push(prev_date.getHours());
                         prev_date.setHours(prev_date.getHours()-1);
                    }   
                    break;
               }
          }
          return tab_y_arry;
     }
     graphDataParser(j,z,tab_y_axis,selec)
     {
          
          switch(selec){
               case 0:{
                    return (tab_y_axis[j][0] === parseInt(ana_click_fak_data[z].timestamp.split("T")[1].split(":")[0]) 
                           && tab_y_axis[j][1] === parseInt(ana_click_fak_data[z].timestamp.split("T")[0].split("-")[2]) );      
                    break;
               }
               case 1:{                    
                    return (tab_y_axis[j][1] === parseInt(ana_click_fak_data[z].timestamp.split("T")[0].split("-")[2])); 
                    break;
               }
               case 2:{
                    return (tab_y_axis[j][0] === parseInt(ana_click_fak_data[z].timestamp.split("T")[0].split("-")[2])
                           &&((tab_y_axis[j][1]+1)=== parseInt(ana_click_fak_data[z].timestamp.split("T")[0].split("-")[1]))); 
                    break;
               }
               case 3:{
                    return ((tab_y_axis[j][0]+1) === parseInt(ana_click_fak_data[z].timestamp.split("T")[0].split("-")[1])
                         &&(tab_y_axis[j][1] === parseInt(ana_click_fak_data[z].timestamp.split("T")[0].split("-")[0]))); 
                    break;
               }
               default:{
                    
                    break;
               }
          }
     }
     graphXAxisData(graph_x_raw_data){
          let grap_x_dat = [];
          for(let j = graph_x_raw_data.length ; j > 0 ; j--){
               grap_x_dat.push(graph_x_raw_data[j-1]);
          }
          return grap_x_dat;
     }
     makeGraph2(time_selec)
     {
          if(time_selec==null){
               time_selec = 0;
          }
          console.log("GRAPH RENDER");
          var canvas = this.refs.canvas;
          var ctx = canvas.getContext("2d");     
          
          var gradient = ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0, 'rgba(156,255,178,1)');
          gradient.addColorStop(1, 'rgba(255,255,255,1)');
          
          let tab_hr_arry =this.getGraphYAxis(time_selec);
          let tab_y_tit = this.getGrapYAxisTitle(tab_hr_arry,time_selec);
          let tab_data_arry =new Array(tab_hr_arry.length).fill(0);;
          let tot_click_count = 0 ; 
         
          for(let j = 0 ; j < tab_hr_arry.length ; j++){
               for(let z = 0 ; z < ana_click_fak_data.length ; z++){
                    if(this.graphDataParser(j,z,tab_hr_arry,time_selec)){
                         if(tab_data_arry[j]==null){
                              tab_data_arry[j]=1;   
                         }
                         else{
                         tab_data_arry[j] = tab_data_arry[j] + 1;
                         }
                         tot_click_count++;
                    }
               }
          }

          let dt = this.graphXAxisData(tab_data_arry);
          let xTitle = this.getClickGraphXTitle(time_selec);
          this.setTotalClicKCount(tot_click_count);          
          var myChart = new Chart(ctx,  {
                    type: 'line',
                    data: {
                        labels: tab_y_tit,
                        datasets: [
                             {
                              fill:true,   
                              label: 'Viewers',
                            data:dt,
                            backgroundColor:gradient,
                            borderColor: ['rgba(156, 255, 178,0.5)',],
                            borderWidth: 5,
                            pointRadius: 0,
                            lineTension:0,
                            pointBorderWidth:0,
                            pointBorderColor:'#BBFFCA',
                            pointBackgroundColor:'#BBFFCA'
                        },
                        
                    ]
                    },
                    options: {
                         title: {
                              display: true,
                              
                          }, legend: {
                              display: false
                            },
                        scales: {
                              xAxes: [{
                                   scaleLabel: {
                                        display: true,
                                        labelString: xTitle,
                                        fontFamily:'sen',
                                        fontSize:15,
                                   },
                                   gridLines: {
                                   drawBorder: true,
                                   color: 'rgba(200, 200, 200,0.2)',
                                  lineWidth: 1
                              }
                              , ticks: {
                                   display:true,
                                   fontFamily:'quicksand',
                                   fontSize:12,
                                   fontColor:'#bdbdbd',
                                 }
                          }],
                              yAxes: [{
                                   scaleLabel: {
                                        display: true,
                                        labelString: 'Click',
                                        fontFamily:'sen',
                                        fontSize:15,
          
                                   },
                              gridLines: {
                                   drawBorder: true,
                                  color: 'rgba(200, 200, 200,0.2)',
                                  lineWidth: 1
                              },
                              ticks: {
                                   beginAtZero: true,
                                   fontFamily:'quicksand',
                                   fontColor:'#bdbdbd',
                                 }
                          }],
                        }
                    }
                });
                ctx.clearRect(0, 0, 200, 300);
                ctx.restore();

     }
     makeGraphVisit(time_selec){
          const canvas = this.refs.canvas_vist;
          const ctx = canvas.getContext("2d");     
          if(time_selec==null){
               time_selec = 0;
          }
          let tot_vist_count = 0;
          
          let tab_hr_arry =this.getGraphYAxis(time_selec);
          let tab_y_tit = this.getGrapYAxisTitle(tab_hr_arry,time_selec);
          let tab_data_arry =new Array(tab_hr_arry.length).fill(0);
          var gradient_2 = ctx.createLinearGradient(0, 0, 0,300);
          gradient_2.addColorStop(1, 'rgba(255,255,255,0)');
          gradient_2.addColorStop(0, 'rgba(14,152,255,1)');
          
          for(let j = 0 ; j < tab_hr_arry.length ; j++){
               let ip_uni_tab = [];
               for(let z = 0 ; z < ana_click_fak_data.length ; z++){
                    if(this.graphDataParser(j,z,tab_hr_arry,time_selec)){
                         var n = ip_uni_tab.includes(ana_click_fak_data[z].ip_add);
                         if(n!=null && n===false){
                              if(tab_data_arry[j]==null){
                                   tab_data_arry[j]=1;   
                              }
                              else{     
                              tab_data_arry[j] = tab_data_arry[j] + 1;
                              }
                              ip_uni_tab.push(ana_click_fak_data[z].ip_add);
                              tot_vist_count++;
                         }    
                         else{
                              
                         }
                    }
               }
          }

          this.setTotalUniCount(tot_vist_count);
          let dt = this.graphXAxisData(tab_data_arry);
          let xTitle = this.getClickGraphXTitle(time_selec);
          var myChart = new Chart(ctx,  {
                    type: 'bar',
                    data: {
                        labels:tab_y_tit,
                        datasets: [
                             {
                              fill:true,   
                              label: 'Viewers',
                            data:dt,
                            backgroundColor:gradient_2,
                            borderColor: ['rgba(156, 255, 178,0.5)',],
                            
                            barThickness:15,
                    
                        },
                        
                    ]
                    },
                    options: {
                         title: {
                              display: true,
                              
                          }, legend: {
                              display: false
                            },
                        scales: {
                              xAxes: [{
                                   scaleLabel: {
                                        display: true,
                                        labelString: 'Date',
                                        fontFamily:'sen',
                                        fontSize:15,
          
                                   },
                                   gridLines: {
                                   drawBorder: true,
                                   color: 'rgba(0,0,0,0)',
                                   lineWidth: 1
                              }
                              , ticks: {
                                   display:true,
                                   fontFamily:'quicksand',
                                   fontSize:12,
                                   fontColor:'#bdbdbd',
                                 }
                          }],
                              yAxes: [{
                                   scaleLabel: {
                                        display: true,
                                        labelString: 'Visitors',
                                        fontFamily:'sen',
                                        fontSize:15,
          
                                   },
                              gridLines: {
                                   drawBorder: false,
                                  color: 'rgba(200, 200, 200, 0.00)',
                                  lineWidth: 0
                              },
                              ticks: {
                                   beginAtZero: true,
                                   fontFamily:'quicksand',
                                   fontColor:'#bdbdbd',
                                 }
                          }],
                        }
                    }
                });
                ctx.clearRect(0, 0, 200, 300);
                ctx.restore();
     }
     makeGraphVisitCity(){
          const canvas = this.refs.canvas_visit_city;
          const ctx = canvas.getContext("2d");     

          let tab_labs = [];
          let tab_name = [];
          let tab_data = [];
               for(let z = 0 ; z < ana_loca_fak_data.length ; z++){
                    var n = false;
                         for(let o = 0 ; o < tab_labs.length ; o++){
                              var n = tab_labs[o].includes(ana_loca_fak_data[z].city);
                              if(n===true){
                                   tab_labs[o][1]++;
                                   n = true;
                                   break;
                              }
                         } 
                     if(n===false){
                          tab_labs.push([ana_loca_fak_data[z].city,1]);
                     }
               }
          for(let p = 0 ; p < tab_labs.length ; p++){
               tab_name.push(tab_labs[p][0]);
               tab_data.push(tab_labs[p][1]);
          }
          var myChart = new Chart(ctx,  {
                    type: 'horizontalBar',
                    data: {
                        labels: tab_name,
                        datasets: [
                             {
                              fill:false,   
                              label: 'clicks',
                            data:tab_data,
                            backgroundColor: "rgba(14,152,255,1)",
                            borderColor: ['rgba(156, 255, 178,0.5)',],
                              
                            barThickness:15,
                    
                        },
                        
                    ]
                    },
                    options: {
                         title: {
                              display: false,
                              
                          }, legend: {
                              display: false
                            },
                        scales: {
                              xAxes: [{
                                   display:false,
                                   gridLines: {
                                   drawBorder: true,
                                   color: 'rgba(0,0,0,0)',
                                   lineWidth: 1
                              }
                              , ticks: {
                                   display:true,
                                   fontFamily:'quicksand',
                                   fontSize:12,
                                   fontColor:'#212121',
                                 }
                          }],
                              yAxes: [{
                              display:true,
                              gridLines: {
                                   display:false,
                                   drawBorder: false,
                                  color: 'rgba(200, 200, 200, 0.00)',
                                  lineWidth: 0
                              },
                              ticks: {
                    
                                   fontFamily:'quicksand',
                                   fontSize:15,
                                   fontColor:'#212121',
                                 }
                          }],
                        }
                    }
                });
     }
     makeGraphVisitOS(time_selec){
          if(time_selec==null){
               time_selec=0;
          }
          const canvas = this.refs.canvas_visit_os;
          const ctx = canvas.getContext("2d");     
    
          let tab_labs = [];
          let tab_name = [];
          let tab_data = [];
               for(let z = 0 ; z < ana_os_fak_data.length ; z++){
                    var n = false;
                         for(let o = 0 ; o < tab_labs.length ; o++){
                              var n = tab_labs[o].includes(ana_os_fak_data[z].os_type);
                              if(n===true){
                                   tab_labs[o][1]++;
                                   n = true;
                                   break;
                              }
                         } 
                     if(n===false){
                          tab_labs.push([ana_os_fak_data[z].os_type,1]);
                     }
               }
          for(let p = 0 ; p < tab_labs.length ; p++){
               tab_name.push(tab_labs[p][0]);
               tab_data.push(tab_labs[p][1]);
          }
          
          this.setOsList(tab_name);

          var myChart = new Chart(ctx,  {
                    type: 'doughnut',
                    data: {
                        labels: tab_name,
                        datasets: [
                             {
                              fill:false,   
                              label: 'Viewers',
                            data:tab_data,
                            backgroundColor: ["rgba(14,152,255,1)",'rgba(156,255,178,1)','#D6A1FF'],     
                    
                        },
                        
                    ]
                    },
                    options: {
                         responsive: true,
                         title:{
                             display: false,
                         },
                         legend: {
                              display: false
                            },
                        scales: {
                              xAxes: [{
                                   display:false,
                                   gridLines: {
                                   drawBorder: true,
                                   color: 'rgba(0,0,0,0)',
                                   lineWidth: 1
                              }
                              , ticks: {
                                   display:true,
                                   fontFamily:'quicksand',
                                   fontSize:12,
                                   fontColor:'#212121',
                                 }
                          }],
                              yAxes: [{
                              display:false,
                              gridLines: {
                                   drawBorder: false,
                                  color: 'rgba(200, 200, 200, 0.00)',
                                  lineWidth: 0
                              },
                              ticks: {
                    
                                   fontFamily:'quicksand',
                                   fontSize:15,
                                   fontColor:'#212121',
                                 }
                          }],
                        }
                    }
                });
     }
     makeGraphVisitLang(){
          const canvas = this.refs.canvas_visit_lang;
          const ctx = canvas.getContext("2d");     
          let tab_labs = [];
          let tab_name = [];
          let tab_data = [];
               for(let z = 0 ; z < ana_os_fak_data.length ; z++){
                    var n = false;
                         for(let o = 0 ; o < tab_labs.length ; o++){
                              var n = tab_labs[o].includes(ana_os_fak_data[z].lang);
                              if(n===true){
                                   tab_labs[o][1]++;
                                   n = true;
                                   break;
                              }
                         } 
                     if(n===false){
                          tab_labs.push([ana_os_fak_data[z].lang,1]);
                     }
               }
          for(let p = 0 ; p < tab_labs.length ; p++){
               tab_name.push(tab_labs[p][0]);
               tab_data.push(tab_labs[p][1]);
          }
          
          this.setLangList(tab_name);

          var myChart = new Chart(ctx,  {
                    type: 'doughnut',
                    data: {
                        labels: tab_name,
                        datasets: [
                             {
                              fill:false,   
                              label: 'Viewers',
                            data:tab_data,
                            backgroundColor: ["rgba(14,152,255,1)",'rgba(156,255,178,1)','#D6A1FF'],     
                    
                        },
                        
                    ]
                    },
                    options: {
                         responsive: true,
                         title:{
                             display: false,
                         },
                         legend: {
                              display: false
                            },
                        scales: {
                              xAxes: [{
                                   display:false,
                                   gridLines: {
                                   drawBorder: true,
                                   color: 'rgba(0,0,0,0)',
                                   lineWidth: 1
                              }
                              , ticks: {
                                   display:true,
                                   fontFamily:'quicksand',
                                   fontSize:12,
                                   fontColor:'#212121',
                                 }
                          }],
                              yAxes: [{
                              display:false,
                              gridLines: {
                                   drawBorder: false,
                                  color: 'rgba(200, 200, 200, 0.00)',
                                  lineWidth: 0
                              },
                              ticks: {
                    
                                   fontFamily:'quicksand',
                                   fontSize:15,
                                   fontColor:'#212121',
                                 }
                          }],
                        }
                    }
                });
     }
     makeGraphVisitBrow(){
          const canvas = this.refs.canvas_visit_brow;
          const ctx = canvas.getContext("2d");     

          let tab_labs = [];
          let tab_name = [];
          let tab_data = [];
               for(let z = 0 ; z < ana_os_fak_data.length ; z++){
                    var n = false;
                         for(let o = 0 ; o < tab_labs.length ; o++){
                              var n = tab_labs[o].includes(ana_os_fak_data[z].browser_type);
                              if(n===true){
                                   tab_labs[o][1]++;
                                   n = true;
                                   break;
                              }
                         } 
                     if(n===false){
                          tab_labs.push([ana_os_fak_data[z].browser_type,1]);
                     }
               }
          for(let p = 0 ; p < tab_labs.length ; p++){
               tab_name.push(tab_labs[p][0]);
               tab_data.push(tab_labs[p][1]);
          }

          this.setBrowList(tab_name);
          var myChart = new Chart(ctx,  {
                    type: 'pie',
                    data: {
                        labels:tab_name,
                        datasets: [
                             {
                              fill:true,   
                              label: 'Viewers',
                            data: tab_data,
                            backgroundColor:  ["rgba(14,152,255,1)",'rgba(156,255,178,1)','#D6A1FF'],     
                    
                        },
                        
                    ]
                    },
                    options: {
                         responsive: true,
                         title:{
                             display: false,
                         },
                         legend: {
                              display: false
                            },
                        scales: {
                              xAxes: [{
                                   display:false,
                                   gridLines: {
                                   drawBorder: true,
                                   color: 'rgba(0,0,0,0)',
                                   lineWidth: 1
                              }
                              , ticks: {
                                   display:true,
                                   fontFamily:'quicksand',
                                   fontSize:12,
                                   fontColor:'#212121',
                                 }
                          }],
                              yAxes: [{
                              display:false,
                              gridLines: {
                                   drawBorder: false,
                                  color: 'rgba(200, 200, 200, 0.00)',
                                  lineWidth: 0
                              },
                              ticks: {
                    
                                   fontFamily:'quicksand',
                                   fontSize:15,
                                   fontColor:'#212121',
                                 }
                          }],
                        }
                    }
                });
     }
     drawBrowLable(){
          let rows = [];
          for(let i in this.state.brow_list){
               rows.push(
               <div  className='app_land_grh_view_cont_2_leg_cont'><div className='app_land_grh_view_cont_2_leg_cont_idi' style={{backgroundColor:this.brow_color_list[i]}}></div> {this.state.brow_list[i]}</div>
               );
          }
          return rows;

     }
     drawOsLable(){
          let rows = [];
          for(let i in this.state.os_list){
               rows.push(
               <div  className='app_land_grh_view_cont_2_leg_cont'><div className='app_land_grh_view_cont_2_leg_cont_idi' style={{backgroundColor:this.brow_color_list[i]}}></div> {this.state.os_list[i]}</div>
               );
          }
          return rows;

     }

     drawLangLable(){
          let rows = [];
          for(let i in this.state.lang_list){
               rows.push(
               <div  className='app_land_grh_view_cont_2_leg_cont'><div className='app_land_grh_view_cont_2_leg_cont_idi' style={{backgroundColor:this.brow_color_list[i]}}></div> {this.state.lang_list[i]}</div>
               );
          }
          return rows;

     }

     getCountryList(){
          let tab_labs = [];
               for(let z = 0 ; z < ana_loca_fak_data.length ; z++){
                    var n = false;
                         for(let o = 0 ; o < tab_labs.length ; o++){
                              var n = tab_labs[o].includes(ana_loca_fak_data[z].country);
                              if(n===true){
                                   tab_labs[o][1]++;
                                   n = true;
                                   break;
                              }
                         } 
                     if(n===false){
                          tab_labs.push([ana_loca_fak_data[z].country,1]);
                     }
               }
          this.setCountryList(tab_labs);
     }

     drawCountryTable(){
          let rows = [];
          let  j = 1;
          for(let i in this.state.countryList){
               rows.push(
                    <tr className='app_land_tab_table_head_row_dat_row'>
                    <td className='app_land_tab_table_head_row_dat_name'>{j}</td>
                    <td className='app_land_tab_table_head_row_dat'>{this.state.countryList[i][0]}</td>
                    <td className='app_land_tab_table_head_row_dat'>{this.state.countryList[i][1]}</td>
                    </tr>
               );
               j++;
          }
          return rows;

     }



     componentDidMount(){
          this.makeGraph2();
          this.getCountryList();
          this.makeGraphVisit();
          this.makeGraphVisitCity();
          this.makeGraphVisitOS();
          this.makeGraphVisitBrow();
          this.makeGraphVisitLang();
         
     }
     

     render(){
          return(<>
               <div className='ana_main_cont_bdy'>
               <div className='app_ana_lnk_selec_cont'>
                              <a href='http://localhost:3000/dash' className='app_ana_back_butt'>
                              <svg className='app_ana_lnk_selec_cont_ico' viewBox='0 0 512 512'><title>Arrow Back</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M244 400L100 256l144-144M120 256h292'/></svg>
                              </a>
                              exmaple Name
                         </div>
                         <Tabs defaultActiveKey="Analytics" id="app_ana_tabs_main_cont" className='app_ana_tabs_main_cont_class' variant="pills">
                         <Tab eventKey="Analytics" title="Analytics" className="app_ana_tab_cont">
                              
                              
                              <div className='app_ana_lnk_date_cont'>
                              <div className='app_ana_lnk_date_cont_tit'>Report for </div>
                              <div className='app_ana_lnk_date_butt_cont'>
                              <DropdownButton id="dropdown-item-button"  variant="primary" title={this.getPeriodTitle()+" "}>
                              <Dropdown.Item as="button"  variant="light" onClick={()=>{this.setCurrPeriod(0)}} active={this.state.curr_time_selec===0?true:false}>Last Day</Dropdown.Item>
                              <Dropdown.Item as="button"  variant="light" onClick={()=>{this.setCurrPeriod(1)}} active={this.state.curr_time_selec===1?true:false}>Last Week</Dropdown.Item>
                              <Dropdown.Item as="button"  variant="light"  onClick={()=>{this.setCurrPeriod(2)}} active={this.state.curr_time_selec===2?true:false}>Last Month</Dropdown.Item>
                              <Dropdown.Item as="button" variant="light"  onClick={()=>{this.setCurrPeriod(3)}} active={this.state.curr_time_selec===3?true:false}>Last Year</Dropdown.Item>
                              </DropdownButton>
                              </div>

                              <div className='app_ana_lnk_date_rgt_cont'>
                              <Button variant="light" className='app_ana_lnk_date_rgt_butt' id='app_ana_lnk_date_rgt_butt_down'>
                                   <svg className='app_ana_lnk_date_rgt_butt_ico' viewBox='0 0 512 512'><title>Arrow Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100'/></svg> 
                                   Download</Button>
                              <Button variant="light" className='app_ana_lnk_date_rgt_butt'>
                                   <svg  className='app_ana_lnk_date_rgt_butt_ico'  viewBox='0 0 512 512'><title>Save</title><path d='M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                   Save As </Button>
                              </div>

                         </div>


{/* 
                         <div className='app_ana_sec_tit_cont'>
                                   <div  className='app_ana_sec_tit'>Hows yours link doing</div>
                                   </div> */}

                         <div className='app_ana_box_main_cont'>
                              <div className='app_ana_box_cont'>
                                   <div className='app_ana_box_cont_tit'>Total Clicks</div>
                                   <div className='app_ana_box_cont_dat'>{this.state.tot_click_count}</div>
                              </div>
                              <div className='app_ana_box_cont'>
                                   <div className='app_ana_box_cont_tit'>Unique Vistors</div>
                                   <div className='app_ana_box_cont_dat'>{this.state.tot_visit_count}</div>
                              </div>
                              <div className='app_ana_box_cont'>
                                   <div className='app_ana_box_cont_tit'>Total App opens</div>
                                   <div className='app_ana_box_cont_dat'>0</div>
                              </div>
                              <div className='app_ana_box_cont'>
                                   <div className='app_ana_box_cont_tit'>Last open</div>
                                   <div className='app_ana_box_cont_dat'>0</div>
                              </div>
                         </div>
{/* box-shadow: var(--app_primary-box-shadow); */}
                                        <div id='app_land_grh_viw_intr_cont'>
                                             <div className='app_land_grh_view_cont_2'>
                                             <div  className='app_land_grh_view_cont_2_tit'>Clicks</div>
                                             <canvas ref="canvas" height='300' className='app_land_grh_viw'/>
                                             </div>
                                             
                                             <div className='app_land_grh_view_cont_2'>
                                             <div  className='app_land_grh_view_cont_2_tit'>New Visitors</div>
                                             <canvas ref="canvas_vist" height='300' className='app_land_grh_visit'/>
                                             </div>

                                             <div className='app_ana_sec_tit_cont'>
                                   <div  className='app_ana_sec_tit'>Operating System Analytics</div>
                                                  </div>
                                             <div className='app_land_grh_thrd_main_cont'>
                                             <         div className='app_land_grh_vist_city_con'>
                                                       <div  className='app_land_grh_view_cont_2_tit'>Clicks by Browser</div>
                                                       <canvas ref="canvas_visit_brow" height='300' className='app_land_grh_visit_city'/>
                                                       <div>
                                                            {this.drawBrowLable()}
                                                       </div>
                                                       </div>
                                                      
                                                   
                                                       <div className='app_land_grh_vist_os_con'>
                                                       <div  className='app_land_grh_view_cont_2_tit'>Clicks by OS</div>
                                                       <canvas ref="canvas_visit_os" height='300' className='app_land_grh_visit_city'/>
                                                       <div>
                                                       <div>
                                                            {this.drawOsLable()}
                                                       </div>
                                                       </div>
                                                       </div>
                                             </div>
                                             <div className='app_land_grh_vist_os_con'>
                                                       <div  className='app_land_grh_view_cont_2_tit'>Clicks by Language</div>
                                                       <canvas ref="canvas_visit_lang" height='300' className='app_land_grh_visit_city'/>
                                                       <div>
                                                       <div>
                                                            {this.drawLangLable()}
                                                       </div>
                                                       </div>
                                                       </div>
                                             <div className='app_ana_sec_tit_cont'>
                                   <div  className='app_ana_sec_tit'>Location Analytics</div>
                                                  </div>

                                             <div className='app_land_grh_thrd_main_cont'>
                                                        
                                                  <div className='app_land_grh_vist_city_con'>
                                                       <div  className='app_land_grh_view_cont_2_tit'>Clicks by city</div>
                                                       <canvas ref="canvas_visit_city" height='300' className='app_land_grh_visit_city'/>
                                                       </div>

                                                       <div className='app_land_grh_vist_city_count'>
                                                       <div  className='app_land_grh_view_cont_2_tit'>Clicks by Country</div>
                                                       <table className='app_ana_tab_table'>
                                                                 <tr id='app_land_tab_table_head_row'>
                                                                 <th className='app_land_tab_table_head_row_tit'>Sr</th>
                                                                 <th className='app_land_tab_table_head_row_tit'>Country</th>
                                                                 <th className='app_land_tab_table_head_row_tit'>Visits</th>
                                                                 </tr>
                                                                      {this.state.countryList!==undefined?this.drawCountryTable():<span/>}                         
                                                                 </table>
                                                       </div>


                                             </div>


                                        </div>
                              </Tab>
                              
                              <Tab eventKey="Details" title="Details" className="app_ana_tab_cont">
                                        <div  className='app_ana_gen_lnk_main_cont'>
                                                  <div className='app_ana_gen_lnk_main_cont_full'>
                                                       <svg className='app_ana_gen_lnk_main_cont_full_ico' viewBox='0 0 512 512'><title>Link</title><path d='M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='36'/></svg>
                                                  <div  className='app_ana_gen_lnk_main_cont_tit'>
                                                       https://localhost:8080/link/
                                                  </div>
                                                  <input className='app_ana_gen_lnk_main_cont_link_spcl_id_fld' type='text' value='ABDC' disabled></input>
                                                  
                                                  </div>
                                                  <button className='app_land_tab_table_head_row_dat_lnk_copy_butt'>
                                                       <svg className='app_land_tab_table_head_row_dat_lnk_copy_ico' viewBox='0 0 512 512'><title>Copy</title><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                                  </button>
                                        </div>
                                        <div className='app_ana_det_main_class'>
                                             
                                                  <div  className='app_ana_bas_det_main_class'>
                                                  <div className='app_ana_bas_det_main_class_tit'>Link details</div>
                                                       <div className='app_ana_bas_det_main_class_row'>
                                                       <div className='app_ana_bas_det_main_class_dat_cont'>
                                                                 <div className='app_ana_bas_det_main_class_dat_cont_tit'>Display name</div>
                                                                 <input type='text' value='Example Link'className='app_ana_bas_det_main_class_dat_cont_inp' disabled></input>
                                                       </div>
                                                       <div className='app_ana_bas_det_main_class_dat_cont'>
                                                                 <div className='app_ana_bas_det_main_class_dat_cont_tit'> Destination Path</div>
                                                                 <input type='text' value='Example Link'className='app_ana_bas_det_main_class_dat_cont_inp' disabled></input>
                                                       </div> 
                                                       </div> 
                                   
                                                  </div>

                                                  <div  className='app_ana_bas_det_main_class'>
                                                  <div className='app_ana_bas_det_main_class_tit'>Api details</div>
                                                       <div className='app_ana_bas_det_main_class_row'>
                                                            <div className='app_ana_bas_det_main_class_dat_cont'>
                                                                      <div className='app_ana_bas_det_main_class_dat_cont_tit'>Active status</div>
                                                                      <input type='text' value='Example Link'className='app_ana_bas_det_main_class_dat_cont_inp' disabled></input>
                                                            </div>
                                                            <div className='app_ana_bas_det_main_class_dat_cont'>
                                                                      <div className='app_ana_bas_det_main_class_dat_cont_tit'>Created On</div>
                                                                      <input type='text' value='Example Link'className='app_ana_bas_det_main_class_dat_cont_inp' disabled></input>
                                                            </div>
                                                            
                                                            </div> 
                                                       <div className='app_ana_bas_det_main_class_row'>
                                                       <div className='app_ana_bas_det_main_class_dat_cont'>
                                                                 <div className='app_ana_bas_det_main_class_dat_cont_tit'>Special Id</div>
                                                                 <input type='text' value='Example Link'className='app_ana_bas_det_main_class_dat_cont_inp' disabled></input>
                                                       </div>
                                                       <div className='app_ana_bas_det_main_class_dat_cont'>
                                                                 <div className='app_ana_bas_det_main_class_dat_cont_tit'>Analytic Id</div>
                                                                 <input type='text' value='Example Link'className='app_ana_bas_det_main_class_dat_cont_inp' disabled></input>
                                                       </div> 
                                                       </div> 
                                                       
                                                  </div>
                                                  
                                        </div>
                              </Tab>
                              
                         </Tabs>
                                                       
                         
               
                                  

               </div>
          </>)
     }
}