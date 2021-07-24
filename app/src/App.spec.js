import React from 'react';
import ReactDOM from 'react-dom';

// BASIC REACT TESTING IMPORTS
import { act, render, cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

// ENZYME IMPORTS
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, configure, mount } from 'enzyme';
configure({adapter: new Adapter()});

// APOLLO TESTING IMPORTS
import { MockedProvider } from "@apollo/client/testing"

// COMPONENT IMPORTS
import App, { GET_EMPLOYEES } from './App'

afterEach(() => {
  cleanup();
});

const wait = async () => {
  return new Promise((res) => setTimeout(res, 0));
}

const GraphQLMocks = [
  {
    request: {
      query: GET_EMPLOYEES,
    },
    result: {
      data: {
        "people": [
          {
            "__typename": "Person",
            "id": "0",
            "name": {
                "__typename": "Name",
                "title": "Ms",
                "first": "12h23!crazywefwfe",
                "last": "Heidelinde3e"
            },
            "email": "Heidelinde3e",
            "picture": {
                "__typename": "Picture",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/14.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/14.jpg"
            },
            "phone": "0081-3231613",
            "cell": "0176-8113486"
          },
          {
            "__typename": "Person",
            "id": "98",
            "name": {
                "__typename": "Name",
                "title": "Ms",
                "first": "Jill",
                "last": "Bradley"
            },
            "email": "jill.bradley@example.com",
            "picture": {
                "__typename": "Picture",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/64.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/64.jpg"
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
                "last": "Henry"
            },
            "email": "eleanor.henry@example.com",
            "picture": {
                "__typename": "Picture",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/47.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/47.jpg"
            },
            "phone": "031-263-1441",
            "cell": "081-599-2437"
          }
        ]
      },
      loading: false,
      error: null,
    },
  },
];

describe('<App>', () => {
  it('renders a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading screen', () => {
    const wrapper = mount(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    const loadingScreen = wrapper.find('.loading-screen');
    expect(loadingScreen.text()).toContain('Loading...');
  });

  it('renders app with data', async () => {
    const wrapper = mount(
      <MockedProvider mocks={GraphQLMocks}>
        <App />
      </MockedProvider>
    );
    await wait(0);
    const firstListElement = wrapper.find('.list-body-element').first();
    expect(firstListElement.text()).toContain('James');
  });
});

// My testing startegy in this app was to perform unit and integration at the same time since Jest is designed to be capable of doing both at once, and I did not want to overcomplicate an otherwise pretty small app.
// If the app was larger, I would consider splitting functionality and rendering into different test suits for logic and integration.
// In a larger project, I would also consider testing accessibility.

// MAIN APP
// renders app component

/*it("renders data", async () => {
  const { container } = mount(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>
  );
  //expect(component.textContent).toContain('Loading');
  await wait(0);
  container.update();

  expect(container).toMatchSnapshot();
  //new Promise((res) => setTimeout(res, 0))
  //expect(component.root.findByType('ul')).toContain('James');


});*/

// DATA
// Gets mock data successfully, expect to equal mock
// Set total employees after loading datas, expect it to equal length of mock
// Renders loading if the data is still Loading
// Renders the real app if not Loading

// COMPONENTS

// FOUND COUNT
// Renders FoundCount bar
// foundcount reflects number of users

// SEARCH BAR
// Renders search bar
// search string updates when text box is changed
// foundcount updates correctly when string fitlers down people
// foundcount shows 0 results when string filters down to 0

// EMPLOYEE LIST and LIST ELEMENT
// Employee List renders with correct number of components
// Employee list renders with fewer results when search string is active

// EMPLOYEE DETAILS
// Clicking on employee list element sets selected employee
// Employee details reflects selected employee
// Clicking on edit button causes view to switch to edit employee
// Editing employee data causes api to get called with updates
// Clicking on edit button against causes view to switch to original

//
