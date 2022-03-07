import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './containers/Home';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
  // <h1 className='text-3xl font-bold underline'>Hello world!</h1>;
};

export default App;
