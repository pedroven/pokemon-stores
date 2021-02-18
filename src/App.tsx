import React from 'react';
import Routes from './routes';
import GlobalStyle from './styles';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'react-toastify/dist/ReactToastify.min.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<React.Fragment>
			<QueryClientProvider client={queryClient}>
				<Routes />
			</QueryClientProvider>
			<GlobalStyle />
			<ToastContainer hideProgressBar={true} />
		</React.Fragment>
	);
};

export default App;
