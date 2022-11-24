import './App.css';
import useRoleCheck from './hooks/useRoleCheck';
import { Loading } from './shared/components/Loading';

function App() {

  const role = useRoleCheck("sayemazizchy@gmail.com")

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
