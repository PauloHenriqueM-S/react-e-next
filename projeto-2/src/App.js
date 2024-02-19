// import P from 'prop-types';
import React, { useContext, useState } from 'react';
import './App.css';

const globalState = {
  title: 'O título do contexto',
  body: 'O body do contexto',
  counter: 0,
};
const GlobalContext = React.createContext();

// eslint-disable-next-line
const Div = ({ children }) => {
  return (
    <>
      <H1 />
      <P />
    </>
  );
};

// eslint-disable-next-line
const H1 = () => {
  const theContext = useContext(GlobalContext);
  const {
    contextState: { title, counter },
  } = theContext;
  return (
    <h1>
      {title} {counter}
    </h1>
  );
};
const P = () => {
  const theContext = useContext(GlobalContext);
  const {
    // eslint-disable-next-line
    contextState: { body, counter },
    setContextState,
  } = theContext;
  return (
    <p
      onClick={() =>
        setContextState((s) => ({
          ...s,
          counter: s.counter + 1,
        }))
      }
    >
      {body}
    </p>
  );
};

function App() {
  const [contextState, setContextState] = useState(globalState);
  return (
    <GlobalContext.Provider value={{ contextState, setContextState }}>
      <Div />
    </GlobalContext.Provider>
  );
}

export default App;
