import { useContext, lazy, Suspense } from 'react';

import { GolbalContext } from '../../context/Global.context.jsx';

const Loader = lazy(() => import("../../components/loader/Loader.jsx"));
const LoggedLayout = lazy(() => import("../../layout/loggedLayout/Logged.layout.jsx"));


const Home = () => {
    
    return (
        <Suspense fallback={<Loader/>}>
            <LoggedLayout>
            </LoggedLayout>
        </Suspense>
    );
}

export default Home;
