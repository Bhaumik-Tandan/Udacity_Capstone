import React from 'react';
import Form from './form/form';
function App() {

  return (
      <center>
        <h1>Rating Predictor</h1>
        <h3>Server is located
          <span> </span>
          <a href="https://github.com/Bhaumik-Tandan/Zomato_database_data_science/tree/master/flask_api">Here</a>
          <span> </span>
          <span role="img" aria-label="server">🚀</span>
        </h3>
        <Form/>
      </center>
  );
}

export default App;
