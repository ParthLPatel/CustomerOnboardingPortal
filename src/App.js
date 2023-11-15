import './App.css';
import Header from './components/Header/Header';
import CreateProfilePage from './components/CreateProfilePage/CreateProfilePage'; //import UserTypePage from './components/UserTypePage/UserTypePage';
function App() {
  return (
    <div className="App">

      <Header />

      <CreateProfilePage />
      {/* <UserTypePage /> */}
    </div>
  );
}

export default App;
