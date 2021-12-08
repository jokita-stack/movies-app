import React from 'react'
import './App.css';
import {Container} from "@material-ui/core"
import Header from './components/Header'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import SimpleBottomNavigation from './components/Navigation';
import Trending from './Pages/Trending'
import Movies from './Pages/Movies'
import Series from './Pages/Series'
import Search from './Pages/Search'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="app">
       <Container>
         <Switch>
           <Route path="/"component={Trending} exact/>
           <Route path="/movies"component={Movies}/>
           <Route path="/series"component={Series}/>
           <Route path="/search"component={Search} />

           </Switch>
         </Container> 

<SimpleBottomNavigation />

    </div>
    </BrowserRouter>
  );
}

export default App;
