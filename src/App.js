import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar, Footer, Index, NotFoundPage, Gregorian, Hijri } from './components';
import { GlobalProvider } from './context/Global';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container relative min-h-screen mx-auto">
            <div className="content-wrap">
              <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/gregorian-calender" component={Gregorian}/>
                <Route exact path="/hijri-calender" component={Hijri}/>
                <Route component={NotFoundPage} />
              </Switch>
            </div>
            <Footer />
          </div> 
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;
