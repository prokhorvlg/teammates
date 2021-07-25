const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');

// Initialize people datastore.
let people = [];

// Load seed people.
const https = require('https')
const options = {
    hostname: 'randomuser.me',
    path: '/api/?results=100&inc=name,email,picture,phone,cell',
    method: 'GET'
}
const req = https.request(options, res => {
    console.log('Seeding data...');
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    res.on('end', () => {
        people = JSON.parse(data).results;
        people.forEach((p,idx) => p.id = idx);
        console.log('Data seeded.');
    })

});
req.end();

// GraphQL schema in string form.
const typeDefs = `
  type Query {
      people: [Person]
      person(id: ID!): Person
    }
  type Mutation {
      editPerson(id: ID!, payload:EditPerson): Person!
  }
  input EditPerson { title: String, first: String last: String, email: String, phone: String, cell: String}
  type Name { title: String, first: String, last: String}
  type Picture { large: String, medium: String, thumbnail: String}
  type Person { id: ID!, name: Name, email: String, picture: Picture, phone: String, cell: String }
`;

// Resolvers.
const resolvers = {
    Query: {
        people: () => people,
        person: (_, args) => {
            const idx = people.findIndex(p => p.id === parseInt(args.id));
            if (idx < 0) {
                throw error('Person not found');
            }
            return people[idx];
        }
    },
    Mutation: {
        editPerson: (_, args) => {
            const idx = people.findIndex(p => p.id == parseInt(args.id));
            if (idx < 0) {
                throw error('Person not found');
            }
            if(args.payload.title) {
                people[idx].name.title = args.payload.title;
            }
            if(args.payload.first) {
                people[idx].name.first = args.payload.first;
            }
            if(args.payload.last) {
                people[idx].name.last = args.payload.last;
            }
            if(args.payload.email) {
                people[idx].email = args.payload.email;
            }
            if(args.payload.phone) {
                people[idx].phone = args.payload.phone;
            }
            if(args.payload.cell) {
                people[idx].cell = args.payload.cell;
            }
            return people[idx];
        }
    }
};

// Put together a schema.
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Initialize the app.
const app = express();

app.use(cors());

// GraphQL endpoint.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, visual editor for queries.
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Serve the react page.
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../app/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../app/build', 'index.html'));
});

// Start the server.
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is fully operational.`);
});
