// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { useSelector } from 'react-redux';

// const Home = () => {
//     const navigate = useNavigate();         
//     const isConnected = useSelector((state) => state.user.isConnected);
//     const userName = useSelector((state) => state.user.name);

//     return (
//         <div className="home-container">
//             {isConnected ? (
//                 <>
//                     <h1>ברוך שובך {userName}</h1>
//                     <Button label="צפה בפרויקטים" onClick={() => navigate('/projects')} />
//                 </>
//             ) : (
//                 <>
//                     <h1>ברוכים הבאים למערכת ניהול הפרויקטים</h1>
//                     <Button label="התחבר" onClick={() => navigate('/login')} />
//                 </>
//             )}
//         </div>
//     );
// }

// export default Home

import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';

const Home = () => {
    const navigate = useNavigate();
    const isConnected = useSelector((state) => state.user.isConnected);
    const userName = useSelector((state) => state.user.name);

    return (
        <div className="flex align-items-center min-h-screen w-screen m-0 p-0 shadow-2 overflow-hidden" 
             style={{ 
                 backgroundImage: 'linear-gradient(to left, rgba(40, 54, 24, 0.85), rgba(40, 54, 24, 0.3)), url("/745205069564995779.jpg")',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 position: 'fixed',
                 top: 0,
                 left: 0,
                 direction: 'rtl'
             }}>
            
            <div className="p-8 md:p-12 lg:ml-8" style={{ maxWidth: '800px' }}>
                
                {isConnected ? (
                    <section className="fadein animation-duration-1000">
                        <span className="block text-xl font-bold mb-2" style={{ color: '#dda15e' }}>
                            ברוך שובך למערכת,
                        </span>
                        <h1 className="text-7xl font-black m-0 mb-4" style={{ color: '#fefae0' }}>
                            {userName}
                        </h1>
                        <p className="text-xl line-height-3 mb-6 font-light" style={{ color: '#fefae0', borderRight: '4px solid #bc6c25', paddingRight: '1.5rem' }}>
                            אנחנו מוכנים להמשיך. כל הפרויקטים שלך שמורים <br /> 
                            ומחכים לניהול המקצועי שלך.
                        </p>
                        <div className="flex gap-3">
                            <Button 
                                label="ללוח הפרויקטים" 
                                icon="pi pi-objects-column" 
                                className="p-button-lg px-6 py-3 border-round-lg shadow-4"
                                style={{ backgroundColor: '#bc6c25', borderColor: '#bc6c25' }}
                                onClick={() => navigate('/projects')} 
                            />
                        </div>
                    </section>
                ) : (
                    <section className="fadein animation-duration-1000">
                        <h1 className="text-8xl font-black m-0 line-height-1" style={{ color: '#fefae0' }}>
                            Manage.<br />
                            <span style={{ color: '#dda15e' }}>Design.</span><br />
                            Deliver.
                        </h1>
                        <p className="text-2xl mt-4 mb-6 font-light opacity-90" style={{ color: '#fefae0' }}>
                            הכלים המתקדמים ביותר לניהול משימות ופרויקטים,<br />
                            עכשיו בעיצוב נקי ומדויק יותר.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <Button 
                                label="התחל עכשיו" 
                                icon="pi pi-bolt" 
                                className="p-button-lg px-8 py-4 font-bold border-round-pill shadow-6"
                                style={{ backgroundColor: '#606c38', borderColor: '#606c38' }}
                                onClick={() => navigate('/login')} 
                            />
                        </div>
                    </section>
                )}

                {/* קרדיט בתחתית - מובנה בתוך המבנה הימני */}
                <footer className="mt-8 opacity-50 text-sm italic" style={{ color: '#fefae0' }}>
                    © project menagment | Tamar | Racheli | 2026 
                </footer>
            </div>
        </div>
    );
}

export default Home;