import './App.css';
import Content from './Components/Content';
import Navbar from './Components/Navbar';
import {Provider} from 'react-redux'
import store from './Redux/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Navbar/>
      <Content/>
    </div>
    </Provider>
  );
}

export default App;
