import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import {makeStyles} from "@material-ui/core";
//import { CryptoContext } from "CryptoContext";

function App() {

  const useStyles = makeStyles(()=>({
     App:{
       backgroundColor: "#14161a",
       color: "white",
       minHeight: "100vh",
     },
  }));
  const classes = useStyles();
  return (
   <BrowserRouter>
   
      <div className={classes.App} >
        <Header />
        <Routes>
         <Route path="/" Component={Homepage} />
         <Route path="/coins/:id" Component={CoinPage} />
         </Routes>
      </div>
     
   </BrowserRouter>
  );
}

export default App;
