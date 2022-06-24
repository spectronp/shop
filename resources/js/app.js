require('./bootstrap');

import { createRoot } from 'react-dom/client';
import SearchBar from './react/SearchBar';

const root = createRoot(document.getElementById('root'));

function handleValueChange(e) {
    let target = e.target;
    this.render(<SearchBar value={target.value} />);
}

root.render(<SearchBar value={""} />);
