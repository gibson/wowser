import Wowser from './components/wowser';
import {createRoot} from 'react-dom/client';

const domNode = document.querySelector('app');
const root = createRoot(domNode);
root.render(<Wowser/>);
