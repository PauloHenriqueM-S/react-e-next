// eslint-disable-next-line
import P from 'prop-types';
import { createContext, useContext, useReducer, useRef } from 'react';
import './App.css';
// import { Div } from './components/Div';
// import { AppContext } from './contexts/AppContext';

// actions.js
export const actions = {
  CHANGE_TITLE: 'CHANGE_TITLE',
};

// data.js
export const globalState = {
  title: 'O título do contexto',
  body: 'O body do contexto',
  counter: 0,
};

// reducer.js
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TITLE: {
      console.log('Mudar título');
      return { ...state, title: action.payload };
    }
  }
  return { ...state };
};

// AppContext.jsx
export const Context = createContext();
export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payload) => {
    dispatch({ type: actions.CHANGE_TITLE, payload });
  };

  return (
    <Context.Provider value={{ state, changeTitle }}>{children}</Context.Provider>
  );
};

AppContext.propTypes = {
  children: P.node,
};

// H1/index.jsx
export const H1 = () => {
  const context = useContext(Context);
  const inputRef = useRef();

  return (
    <>
      <h1 onClick={() => context.changeTitle(inputRef.current.value)}>
        {context.state.title}
      </h1>
      <input type="text" ref={inputRef} />
    </>
  );
};

// App.jsx
function App() {
  return (
    <AppContext>
      <div>
        <H1 />
      </div>
    </AppContext>
    // <div>
    //   <h1>
    //     {title} {counter}
    //   </h1>
    //   <button onClick={() => dispatch({ type: 'muda', payload: new Date().toLocaleString('pt-BR'), })}>Click</button>
    //   <button onClick={() => dispatch({ type: 'inverter' })}>Invert</button>
    //   <button onClick={() => dispatch({ type: '' })}>Sem Action</button>
    // </div>
    // <AppContext>
    //   <Div />
    // </AppContext>
  );
}

export default App;
