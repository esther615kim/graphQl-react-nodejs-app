
import Booklist from './components/Booklist';
// apollo server
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

// apollo client setup
const client = new ApolloClient({
  uri: 'https://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>Reading List</h2>
        <Booklist />
      </div>
    </ApolloProvider>
  );
}

export default App;
