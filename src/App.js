
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './Components/BookList';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BookList />} />
      </Routes>
    </Router>
  );
}

export default App;
