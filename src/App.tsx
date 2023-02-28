import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './Pages/MainPage';
import SimulationPage from './Pages/SimulationPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/simulation" element={<SimulationPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
