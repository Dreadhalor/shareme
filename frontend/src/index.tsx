import { render } from 'react-dom';
import App from 'App';
import 'index.scss';
import { HashRouter as Router } from 'react-router-dom';

render(
  <Router basename='/'>
    <App />
  </Router>,
  document.getElementById('root')
);
