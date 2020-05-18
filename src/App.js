import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar, Footer, Index, NotFoundPage } from './components';
function App() {


  // let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="container relative min-h-screen mx-auto">
          <div className="content-wrap">
            <Switch>
              <Route exact path="/" component={Index}/>
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <Footer />
        </div> 
      </Router>
    </div>
  );
}

export default App;
