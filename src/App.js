/* eslint-disable no-useless-constructor */
import React from 'react';
import './App.css';


class Header extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<>
      <div className='app_header_main_cont'> 
        Header
      </div>
    </>)
  }
}


export default class App extends React.Component{

  constructor(props){
    super(props);
  }
  render(){
    return(<>
      <div>
        <Header/>
      </div>
    </>)
  }
}