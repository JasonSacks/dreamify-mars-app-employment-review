import './App.css';
import 'fontsource-roboto';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageLayout from './pages/PageLayout';
import Account from './pages/Account';
import DreamGallery from './pages/DreamGallery';
import MarsGallery from './pages/MarsGallery'
import { Provider } from 'react-redux';
import store from './Redux/store';
import AuthorizeRoute from './components/AuthorizeRoute';
import Home from './pages/Home';
import dotenv from 'dotenv';

dotenv.config() 
if (window.location.href === 'https://dreamifymars.z22.web.core.windows.net/'){
            window.location.replace("https://www.dreamifymars.com");
        }

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <PageLayout>
                    <Switch>
                        <Route exact path="/" component ={Home} />
                        <AuthorizeRoute path="/dreams" component={DreamGallery} />               
                        <AuthorizeRoute path="/mars" component={MarsGallery} />     
                        <AuthorizeRoute path="/account" component={Account} />   
                        <Route path="*" component={Home} />  
                    </Switch>
                </PageLayout>
            </BrowserRouter>
        </Provider>
  );
}

export default App;
