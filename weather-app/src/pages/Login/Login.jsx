import { GoogleLogin } from 'react-google-login'
const clientId = '152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com';
function Login() {
  const onSuccess = (res) => {
    console.log('Login Success! Current user: ', res.profileObj);
  }
  const onFailure = (res) => {
    console.log('LoginFailed! res: ', res);
  }
  return (
    <div id="signinbutton">

      <GoogleLogin
        clientId={clientId}
        buttonText="Google Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}
export default Login;