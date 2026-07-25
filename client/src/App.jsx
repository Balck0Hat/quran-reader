import { AppProviders } from './app/providers.jsx';
import { AppRouter } from './app/router.jsx';

const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
);

export default App;
