import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

const clientId = '152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com';

function Login() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSuccess = (res) => {
    console.log('Login Success! Current user: ', res.profileObj);
    // save user locally
    const currentUser = res.profileObj;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setIsSignedIn(true);

    // Send the ID token to your backend server
    axios.post('http://localhost:3000/api/google-login', { token: res.tokenId })
      .then(response => {
        console.log('Server response:', response.data);
        // Additional logic after successful backend verification
      })
      .catch(error => {
        console.error('Server error', error);
      });
  };

  const onFailure = (res) => {
    console.log('Login Failed! res: ', res);
  };

  const onLogoutSuccess = () => {
    console.log('Logout Successful');
    setIsSignedIn(false);
  };

  return (
    <div id="signinbutton">
      {!isSignedIn ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Google Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        />
      )}
    </div>
  );
}

export default Login;
