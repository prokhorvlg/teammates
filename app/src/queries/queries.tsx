import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    people {
      id
      name {
        title,
        first,
        last
      }
      email
      picture {
        thumbnail
        medium
        large
      }
      phone
      cell
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $EditPerson: EditPerson!) {
    editPerson(id: $id, payload: $EditPerson) {
        name {
          title
          first
          last
        }
        email
        phone
        cell
    }
  }
`;
