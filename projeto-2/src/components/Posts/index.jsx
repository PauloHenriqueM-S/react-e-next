import { useContext, useEffect, useRef } from 'react';
import {
  decrementCounter,
  incrementCounter,
} from '../../contexts/CounterProvider/action';
import { CounterContext } from '../../contexts/CounterProvider/context';
import { PostsContext } from '../../contexts/PostsProvider/context';
import { loadPosts } from '../../contexts/PostsProvider/actions';

export const Posts = () => {
  const isMounted = useRef(true);

  const postsContext = useContext(PostsContext);
  const { postsState, postsDispatch } = postsContext;

  const counterContext = useContext(CounterContext);
  const { counterState, counterDispatch } = counterContext;

  useEffect(() => {
    loadPosts(postsDispatch).then((dispatch) => {
      if (isMounted.current) {
        dispatch();
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, [postsDispatch]);

  return (
    <div>
      <button onClick={() => incrementCounter(counterDispatch)}>
        Counter {counterState.counter}+
      </button>
      <button onClick={() => decrementCounter(counterDispatch)}>
        Counter {counterState.counter}-
      </button>
      <h1>Posts</h1>
      {postsState.loading && <p>Carregando posts...</p>}

      {postsState.posts.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
};
