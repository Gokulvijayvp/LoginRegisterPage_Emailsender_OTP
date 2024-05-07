import LoginPage from "./Component/LoginPage";
import {Routes,Route} from 'react-router-dom'
import RegisterPage from "./Component/RegisterPage";
import Home from "./Component/Home";
import UserProvider from "./Mycontext/context";
import EmailVerificationPage from "./Component/Passwordpages/EmailVerificationPage";
import OtpVerificationPage from "./Component/Passwordpages/OtpVerificationPage";
import SetNewPasswordPage from "./Component/Passwordpages/SetNewPasswordPage";


function App() {
  return (
    <UserProvider>
    <div className="App">
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/registerpage" element={<RegisterPage/>} />
      <Route path="/reset"  >
        <Route index element={<EmailVerificationPage/>} />
        <Route path="otp" element={<OtpVerificationPage/>} />
        <Route path="setnewpassword"  element={<SetNewPasswordPage />}/>
      </Route>
      <Route path="/home" element={<Home />} />
    </Routes>
    </div>
    </UserProvider>
  );
}

export default App;
