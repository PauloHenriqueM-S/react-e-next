// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const eventFn = () => {
  console.log('h1 clicado');
}

function App() {
  // const [reverse, setReverse] = useState(false);
  // const [counter, setCounter] = useState(0);
  // const reverseClass = reverse ? 'reverse' : '';

  // const handleClick = () => {
  //   setReverse(!reverse);
  // };

  // const handleIncrement = () => {
  //   setCounter(counter + 1);
  // };

  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // componentDidUpdate - executa toda vez que o component atualiza
  // useEffect(() => {
  //   console.log('componentDidUpdate');
  // });

  // componentDidMount - executa 1x
  useEffect(() => {
    document.querySelector('h1')?.addEventListener('click', eventFn)

    // componentWillUmount - limpeza
    return () => {
      document.querySelector('h1')?.removeEventListener('click', eventFn)
    }
  }, []);

  // Com dependência - executa toda vez que a dependência mudar
  useEffect(() => {
    console.log('C1:', counter, 'C2:', counter2);
  }, [counter, counter2]);

  return (
    <div className='App'>
      <p>Teste 3</p>
      <h1>
        C1: {counter} C2: {counter2}
      </h1>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => setCounter2(counter2 + 1)}>+(2)</button>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />

    //     <h1>Contador: {counter}</h1>

    //     <p>
    //       <button type="button" onClick={handleClick}>
    //         Reverse {reverseClass}
    //       </button>
    //     </p>
    //     <p>
    //       <button type="button" onClick={handleIncrement}>
    //         Increment {counter}
    //       </button>
    //     </p>
    //   </header>
    // </div>
  );
}

export default App;
