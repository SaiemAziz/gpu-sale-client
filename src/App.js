import { Outlet } from 'react-router-dom';
import './App.css';
import useRoleCheck from './hooks/useRoleCheck';
import { useTitle } from './hooks/useTitle';
import { Loading } from './shared/components/Loading';
import Footer from './shared/Footer';
import Header from './shared/Header';

function App() {

  return (
    <div className="App  text-primary-focus">

      {/* main page */}
      <div className='min-h-screen flex flex-col justify-between'>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    
    </div>
  );
}

export default App;
