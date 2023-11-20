import './App.css';

// importing the common components in here, to reflect the css 
import Header from './components/CommonComponents/Header/Header';
import Button from './components/CommonComponents/Button/Button';
import PhoneVerification from './components/PhoneVerification/PhoneVerification';

import ParentContainer from './components/ParentContainer/ParentContainer';

function App() {
  return (
    <div className="App">

      <Header />

      {/* <Button />  */}
      
      <ParentContainer />
    </div>
  );
}

export default App;
