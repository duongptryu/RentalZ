import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/home/home';
import Add from './pages/add/add';
import Detail from './pages/detail/detail';
import Edit from './pages/edit/edit';
import NotFound from './pages/404';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
            <Redirect to="/"/>
            </Route>
            <Route path="/" exact={true}>
            <Home></Home>
            </Route>
            <Route path="/page/add" exact={true}>
            <Add></Add>
            </Route>
            <Route path="/detail/:id" exact={true}>
            <Detail></Detail>
            </Route>
            <Route path="/edit/:id" exact={true}>
            <Edit></Edit>
            </Route>
            <Route path="/404">
            <NotFound></NotFound>
            </Route>
            <Route component={NotFound} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
