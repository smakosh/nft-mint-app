import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { store } from 'utils/store';

const AppProviders: React.FC = ({ children }) => (
  <ThemeProvider attribute="class">
    <Provider store={store}>{children}</Provider>
  </ThemeProvider>
);

export default AppProviders;
