import React from 'react'
import './Main.scss'
import { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import WeatherList from '../../components/WeatherList/WeatherList'
import WeatherDetailInfo from '../../components/WeatherDetailInfo/WeatherDetailInfo'
import LoginButton from '../Login/Login';
import { gapi } from 'gapi-script'
const clientId = "152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com";
const Main = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  return (
    <main>
      <Sidebar />
      <div className="main-wrapper">
        <div className="main-buttons">
          <button>Theme</button>
          <LoginButton />
          <button>Register</button>
        </div>
        <div className="main-content">
          <WeatherList />
          <WeatherDetailInfo />
        </div>
      </div>
    </main>
  )
}

export default Main
