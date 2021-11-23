import { Provider } from 'react-redux';
import { store } from 'utils/store';

const AppProviders: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>;

export default AppProviders;
