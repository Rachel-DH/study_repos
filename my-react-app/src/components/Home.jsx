import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';

const Home = () => {
    const navigate = useNavigate();         
    const isConnected = useSelector((state) => state.user.isConnected);
    const userName = useSelector((state) => state.user.name);

    return (
        <div className="home-container">
            {isConnected ? (
                <>
                    <h1>ברוך שובך {userName}</h1>
                    <Button label="צפה בפרויקטים" onClick={() => navigate('/projects')} />
                </>
            ) : (
                <>
                    <h1>ברוכים הבאים למערכת ניהול הפרויקטים</h1>
                    <Button label="התחבר" onClick={() => navigate('/login')} />
                </>
            )}
        </div>
    );
}

export default Home