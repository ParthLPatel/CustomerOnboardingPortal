import './App.css';

// importing the common components in here, to reflect the css 
import Header from './components/CommonComponents/Header/Header';

import ParentContainer from './components/ParentContainer/ParentContainer';

function App() {
  return (
    <div className="App">

      <Header />
      
      <ParentContainer />
    </div>
  );
}

export default App;
