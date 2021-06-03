import './App.css';
import {MapViewer} from './MapViewer';
function loader(cfg){
    
}
function App(props) {
  return (
    <MapViewer cfg={props.cfg} ></MapViewer>
  );
}

export default App;
