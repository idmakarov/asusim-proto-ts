import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './Components/Pages/MainPage';
import SimulationPage from './Components/Pages/SimulationPage';

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
