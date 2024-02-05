import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your searh/i);
    expect(search).toBeInTheDoument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(10);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDoument();
  });

  it('should searh for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your searh/i);

    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDoument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDoument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDoument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDoument();
    expect(screen.queryByRole('heading', { name: 'title2 2' })).not.toBeInTheDoument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDoument();
    expect(screen.getByRole('heading', { name: 'Search value: title1' })).toBeInTheDoument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDoument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDoument();

    userEvent.type(search, 'post does not exist');
    expect(screen.getByText('Não existem posts =(')).toBeInTheDoument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDoument();
    expect(button).toBeDisabled();
  });
});
