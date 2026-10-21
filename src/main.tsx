import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {PresentationShell} from './components/PresentationShell.tsx';
import './index.css';

// ?embed=1 dipakai di dalam bingkai perangkat (mode presentasi), tanpa tombol pengalih tampilan
const isEmbed = new URLSearchParams(window.location.search).get('embed') === '1';

createRoot(document.getElementById('root')!).render(isEmbed ? <App /> : <PresentationShell />);
