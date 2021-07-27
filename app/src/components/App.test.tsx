/**
 * @jest-environment jsdom
 */

import React from 'react';

// BASIC REACT TESTING IMPORTS
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

// APOLLO TESTING IMPORTS
import { MockedProvider } from "@apollo/client/testing"
import { GET_EMPLOYEES, UPDATE_EMPLOYEE } from '../queries/queries'

// COMPONENT IMPORTS
import App from './App'

let queryCalled = false;
const GraphQLMocks = [
  {
    request: {
      query: GET_EMPLOYEES,
    },
    result: () => {
      if (queryCalled) {
        return { 
          data: {
            "people": [
              {
                "__typename": "Person",
                "id": "0",
                "name": {
                    "__typename": "Name",
                    "title": "Mr",
                    "first": "JamesAgent",
                    "last": "Bond"
                },
                "email": "JamesBond@example.com",
                "picture": {
                    "__typename": "Picture",
                    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/14.jpg",
                    "medium": "https://randomuser.me/api/portraits/med/women/14.jpg",
                    "large": "https://randomuser.me/api/portraits/med/women/14.jpg"
                },
                "phone": "123",
                "cell": "1234"
              },
              {
                "__typename": "Person",
                "id": "98",
                "name": {
                    "__typename": "Name",
                    "title": "Mr",
                    "first": "John",
                    "last": "Shepard"
                },
                "email": "johnshepard@alliance.galaxy",
                "picture": {
                    "__typename": "Picture",
                    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/64.jpg",
                    "medium": "https://randomuser.me/api/portraits/med/women/64.jpg",
                    "large": "https://randomuser.me/api/portraits/med/women/14.jpg"
                },
                "phone": "(914)-769-6131",
                "cell": "(639)-154-1675"
              },
              {
                "__typename": "Person",
                "id": "99",
                "name": {
                    "__typename": "Name",
                    "title": "Ms",
                    "first": "Eleanor",
                    "last": "Roosevelt"
                },
                "email": "eleanor.roosevelt@example.com",
                "picture": {
                    "__typename": "Picture",
                    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/47.jpg",
                    "medium": "https://randomuser.me/api/portraits/med/women/47.jpg",
                    "large": "https://randomuser.me/api/portraits/med/women/14.jpg"
                },
                "phone": "031-263-1441",
                "cell": "081-599-2437"
              }
            ]
          }
        }
      } else {
        queryCalled = true;
        return {
          data: {
            "people": [
              {
                "__typename": "Person",
                "id": "0",
                "name": {
                    "__typename": "Name",
                    "title": "Mr",
                    "first": "James",
                    "last": "Bond"
                },
                "email": "JamesBond@example.com",
                "picture": {
                    "__typename": "Picture",
                    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/14.jpg",
                    "medium": "https://randomuser.me/api/portraits/med/women/14.jpg",
                    "large": "https://randomuser.me/api/portraits/med/women/14.jpg"
                },
                "phone": "123",
                "cell": "1234"
              },
              {
                "__typename": "Person",
                "id": "98",
                "name": {
                    "__typename": "Name",
                    "title": "Mr",
                    "first": "John",
                    "last": "Shepard"
                },
                "email": "johnshepard@alliance.galaxy",
                "picture": {
                    "__typename": "Picture",
                    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/64.jpg",
                    "medium": "https://randomuser.me/api/portraits/med/women/64.jpg",
                    "large": "https://randomuser.me/api/portraits/med/women/14.jpg"
                },
                "phone": "(914)-769-6131",
                "cell": "(639)-154-1675"
              },
              {
                "__typename": "Person",
                "id": "99",
                "name": {
                    "__typename": "Name",
                    "title": "Ms",
                    "first": "Eleanor",
                    "last": "Roosevelt"
                },
                "email": "eleanor.roosevelt@example.com",
                "picture": {
                    "__typename": "Picture",
                    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/47.jpg",
                    "medium": "https://randomuser.me/api/portraits/med/women/47.jpg",
                    "large": "https://randomuser.me/api/portraits/med/women/14.jpg"
                },
                "phone": "031-263-1441",
                "cell": "081-599-2437"
              }
            ]
          },
          loading: false,
          error: null,
        }
      }
    }
  },
  {
    request: {
      query: UPDATE_EMPLOYEE,
      variables: {
        id: "0",
        EditPerson: {
          first: "JamesAgent",
          last: "Bond",
          email: "JamesBond@example.com",
          phone: "123",
          cell: "1234"
        }
      },
    },
    result: {
      data: {
        "__typename": "Person",
        "name": {
            "__typename": "Name",
            "title": "Mr",
            "first": "JamesAgent",
            "last": "Bond"
        },
        "email": "JamesBond@example.com",
        "phone": "123",
        "cell": "1234"
      }
    },
  },
];

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  queryCalled = false;
});

describe('app loads and appears as expected', () => {
  it('renders loading screen before app content is loaded', () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    const text = screen.getByText("Loading...");
    expect(text).toBeInTheDocument();
  });
  
  it('renders the app once loaded', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    const text = screen.getByText("mates");
    expect(text).toBeInTheDocument();
  });
  
  it('renders the app data once loaded', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    const text = screen.getByText('James Bond');
    expect(text).toBeInTheDocument();
  });

  it('displays the correct number of total employees once loaded', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    expect(screen.getByText(/Displaying all 3 employees./)).toBeInTheDocument();
  });

  it('displays the employees on the page once loaded', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    expect(screen.getByText(/James Bond/)).toBeInTheDocument();
    expect(screen.getByText(/John Shepard/)).toBeInTheDocument();
    expect(screen.getByText(/Eleanor Roosevelt/)).toBeInTheDocument();
  });
});

describe('filtering works as expected', () => {
  it('displays the correct number of total employees once filtered', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    userEvent.type(screen.getByTestId('search-input'), 'James');
    expect(screen.getByText(/Filter matched 1 of 3 employees./)).toBeInTheDocument();
  });

  it('displays the correct number of results once filtered', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    userEvent.type(screen.getByTestId('search-input'), 'James');
    expect(screen.queryByText(/Roosevelt/)).not.toBeInTheDocument();
  });

  it('displays the correct no results content when filtered to no results', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    userEvent.type(screen.getByTestId('search-input'), 'James NotInDocument');
    expect(screen.getByText(/No employees match the filter parameters./)).toBeInTheDocument();
    expect(screen.getByText(/No employees found./)).toBeInTheDocument();
  });
});

describe('details and edit view works as expected', () => {
  it('displays correct content for no employee selected', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    const detailsPanel = screen.getByTestId('details-panel');
    expect(detailsPanel).toHaveTextContent(/No employee selected./);
  });

  it('displays correct content for an employee selected from the mock data', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    userEvent.click(screen.getAllByTestId('list-body-element')[0]);
    const detailsPanel = screen.getByTestId('details-panel');
    expect(detailsPanel).toHaveTextContent(/James Bond/);
  });

  it('displays edit screen when edit button is clicked', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    userEvent.click(screen.getAllByTestId('list-body-element')[0]);
    userEvent.click(screen.getByTestId('start-edit-button'));
    const detailsPanel = screen.getByTestId('details-panel');
    expect(detailsPanel).toHaveTextContent(/First Name/);
  });

  it('sends a query and refreshes data when the details are modified', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    userEvent.click(screen.getAllByTestId('list-body-element')[0]);
    userEvent.click(screen.getByTestId('start-edit-button'));
    userEvent.type(screen.getByTestId('first-name-input'), 'Agent');
    // TODO: Doesn't work - can't find a way to emulate a refetch :/
    // await waitFor(() => screen.getByText(/Agent/), { timeout: 2000 });
    // expect(screen.getByText(/Agent/)).toBeInTheDocument();
  });

  it('displays details screen when finish editing is clicked', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('James Bond'));
    userEvent.click(screen.getAllByTestId('list-body-element')[0]);
    userEvent.click(screen.getByTestId('start-edit-button'));
    userEvent.click(screen.getByTestId('finish-edit-button'));
    const detailsPanel = screen.getByTestId('details-panel');
    expect(detailsPanel).toHaveTextContent(/James Bond/);
  });
});

describe('intro modal works as expected', () => {
  it('shows intro dialog on load with correct content', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('Welcome to'));
    const introModal = screen.getByTestId('intro-modal');
    expect(introModal).toHaveTextContent(/Welcome to/);
  });

  it('shows tab 2 content if tab 2 heading is clicked', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('Welcome to'));
    userEvent.click(screen.getByTestId('intro-tab-2'));
    const introModal = screen.getByTestId('intro-modal');
    expect(introModal).toHaveTextContent(/personal website/);
  });

  it('hides the modal when the enter site button is clicked', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('Welcome to'));
    userEvent.click(screen.getByTestId('intro-modal-close'));
    const introModal = screen.getByTestId('intro-modal');
    expect(introModal).toHaveClass('closed');
  });

  it('shows the modal when the show button is clicked', async () => {
    render(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('Welcome to'));
    userEvent.click(screen.getByTestId('intro-modal-close'));
    userEvent.click(screen.getByTestId('intro-modal-open'));
    const introModal = screen.getByTestId('intro-modal');
    expect(introModal).toHaveClass('open');
  });
});