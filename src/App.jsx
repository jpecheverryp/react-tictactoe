import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Message from './components/Message';
function App() {
  const [message, setMessage] = useState('Player Turn: X');
  const changeText = (newText) => {
    setMessage(newText);
  };
  return (
    <main className='container'>
      <Message text={message} />
      <Board changeText={changeText} />
    </main>
  );
}

export default App;
