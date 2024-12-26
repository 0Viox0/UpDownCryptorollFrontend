import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameManager from './components/game/GameManager';
import Layout from './components/common/Layout';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Rules from './components/rules/Rules';
import { useState } from 'react';
import { ApplicationContext, GameCoice } from './context/ApplicationContext';
import './i18n';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { manifestUrl } from './constants';
import TechnicalAnalysisGraph from './components/common/TechnicalAnalysisGraph';
import { CheckReferralLinkOnLogin } from './features/referralLink';
import QuizPage from './components/QuizPage';

function App() {
    const [currentGame, setCurrentGame] = useState<GameCoice>(GameCoice.None);
    const [displayLoginSignupPopup, setDisplayLoginSignupPopup] =
        useState<boolean>(false);
    const [currentBalance, setCurrentBalance] = useState(-1);

    return (
        <ApplicationContext.Provider
            value={{
                currentGame,
                setCurrentGame,
                displayLoginSignupPopup,
                setDisplayLoginSignupPopup,
                currentBalance,
                setCurrentBalance,
                isDarkMode: true,
            }}
        >
            <TonConnectUIProvider manifestUrl={manifestUrl}>
                <CheckReferralLinkOnLogin>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="play" element={<GameManager />} />
                                <Route
                                    path="profile"
                                    element={<Profile />}
                                ></Route>
                                <Route path="rules" element={<Rules />}></Route>
                                <Route
                                    path="technical-analysis"
                                    element={<TechnicalAnalysisGraph />}
                                />
                                <Route path="quiz" element={<QuizPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CheckReferralLinkOnLogin>
            </TonConnectUIProvider>
        </ApplicationContext.Provider>
    );
}

export default App;
