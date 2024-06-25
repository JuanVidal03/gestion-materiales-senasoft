import { useContext } from 'react';

import { GolbalContext } from '../../context/Global.context.jsx';

const Home = () => {

    const { user } = useContext(GolbalContext);

    return (
        <div>
            <h1>Necesitas estar loggeado para ver esta vista</h1>
        </div>
    );
}

export default Home;
