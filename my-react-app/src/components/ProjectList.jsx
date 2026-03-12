// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import 'primeicons/primeicons.css';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import { remove } from "../store/projectsSlice";
// import ImageByTopic from './ImageByTopic';

// const ProjectList = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const projects = useSelector((state) => state.projects.list);

//     const projectFooter = (project_id) => (
//         <div className="flex flex-wrap justify-content-end gap-2">
//             <Button
//                 label="הצגת פרויקט "
//                 icon="pi pi-arrow-right"
//                 onClick={() => navigate(`/project/${project_id}`)}
//                 className="p-button-outlined p-button-info"
//             />
//             <Button
//                 label="מחיקת פרויקט "
//                 icon="pi pi-trash"
//                 onClick={() => dispatch(remove(project_id))}
//                 className="p-button-outlined p-button-info"
//             />
//         </div>
//     );

//     return (
//         <>
//             <Button
//                 label="new Project "
//                 icon="pi pi-plus"
//                 onClick={() => navigate('/projects/add')}
//                 className="p-button-outlined p-button-info"
//             />
//             <div className="grid">

//                 {projects.map((project) => (
//                     <div key={project.id} className="col">
//                         <div className="text-center p-3 border-round-sm bg-primary font-bold ">

//                             <Card
//                                 key={project.id}
//                                 title={project.name}
//                                 subTitle={project.createDate}
//                                 header={<ImageByTopic topic={project.name} />}
//                                 footer={projectFooter(project.id)}
//                                 className="md:w-25rem">
//                                 <p className="m-0">
//                                     {project.description}
//                                 </p>
//                             </Card>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }

// export default ProjectList
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { remove } from "../store/projectsSlice"
import ImageByTopic from './ImageByTopic'

const ProjectList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.projects.list)
    const { editProjectId, setEditProjectId } = React.useState(null)
    // עיצוב כותרת התמונה של הכרטיס
    const cardHeader = (project) => (
        <div className="relative overflow-hidden" style={{ height: '160px', borderRadius: '12px 12px 0 0' }}>
            <ImageByTopic topic={project.name} />
            {/* כפתור מחיקה עדין שצף על התמונה */}
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-text absolute top-0 right-0 m-2 bg-white-alpha-20 hover:bg-white-alpha-40 transition-all"
                onClick={(e) => { e.stopPropagation(); dispatch(remove(project.id)); }}
                style={{ backdropFilter: 'blur(4px)', color: '#fefae0' }}
            />
        </div>
    );

    const updateProject = (project_id) => ()
    return (
        <div className="min-h-screen w-screen m-0 p-5 overflow-x-hidden"
            style={{
                backgroundImage: 'linear-gradient(to bottom, rgba(40, 54, 24, 0.9), rgba(40, 54, 24, 0.7)), url("/745205069564995779.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                direction: 'rtl'
            }}>

            {/* Header עליון */}
            <div className="flex justify-content-between align-items-center mb-6 mt-4 px-4">
                <div>
                    <h1 className="text-5xl font-black m-0" style={{ color: '#fefae0', letterSpacing: '-1px' }}>הפרויקטים שלי.</h1>
                    <p className="text-xl opacity-70" style={{ color: '#dda15e' }}>ניהול משימות ופרויקטים בזמן אמת</p>
                </div>
                <Button
                    label="פרויקט חדש"
                    icon="pi pi-plus"
                    className="p-button-lg border-round-pill shadow-4 px-5 py-3 border-none transition-all hover:shadow-8"
                    style={{ backgroundColor: '#bc6c25', color: '#fefae0' }}
                    onClick={() => navigate('/projects/add')}
                />
            </div>

            {/* גריד של פרויקטים */}
            <div className="grid px-2">
                {projects.map((project) => (
                    editProjectId !== project.id ? (

                        <div key={project.id} className="col-12 md:col-6 lg:col-3 p-3">
                            <Card
                                header={cardHeader(project)}
                                className="shadow-4 border-none transition-all hover:-translate-y-1"
                                style={{
                                    background: 'rgba(254, 250, 224, 0.08)',
                                    backdropFilter: 'blur(12px)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: '#fefae0'
                                }}
                                onClick={() => navigate(`/project/${project.id}`)}
                            >
                                <div className="flex flex-column gap-2 cursor-pointer">
                                    <span className="text-2xl font-bold line-height-1" style={{ color: '#fefae0' }}>{project.name}</span>
                                    <span className="text-xs opacity-60 uppercase tracking-widest" style={{ color: '#dda15e' }}>
                                        <i className="pi pi-calendar ml-1 text-xs"></i> {project.createDate}
                                    </span>
                                    <p className="mt-3 text-sm line-height-3 opacity-80 h-3rem overflow-hidden text-overflow-ellipsis">
                                        {project.description || "אין תיאור זמין לפרויקט זה..."}
                                    </p>

                                    {/* הכפתור המעודכן לפי הסגנון של דף ה-Login */}
                                    <div className="mt-4 flex justify-content-end">
                                        <Button
                                            label="הצגת הפרויקט"
                                            icon="pi pi-arrow-left" // אייקון חץ שמאלה (מתאים ל-RTL)
                                            iconPos="right"
                                            className="p-button-sm border-round-pill shadow-2 border-none px-4 py-2 transition-all hover:shadow-4"
                                            style={{
                                                backgroundColor: '#bc6c25',
                                                color: '#fefae0',
                                                fontSize: '0.9rem'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation(); // מונע כפל ניווט בגלל ה-onClick של הכרטיס
                                                navigate(`/project/${project.id}`);
                                            }}

                                        />

                                    </div>
                                </div>
                            </Card>
                        </div>
                    ) : ( <div key={project.id} className="col-12 md:col-6 lg:col-3 p-3">
                            <Card
                                header={cardHeader(project)}
                                className="shadow-4 border-none transition-all hover:-translate-y-1"
                                style={{
                                    background: 'rgba(254, 250, 224, 0.08)',
                                    backdropFilter: 'blur(12px)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: '#fefae0'
                                }}
                                onClick={() => navigate(`/project/${project.id}`)}
                            >
                                <div className="flex flex-column gap-2 cursor-pointer">
                                    <span className="text-2xl font-bold line-height-1" style={{ color: '#fefae0' }}>{project.name}</span>
                                    <span className="text-xs opacity-60 uppercase tracking-widest" style={{ color: '#dda15e' }}>
                                        <i className="pi pi-calendar ml-1 text-xs"></i> {project.createDate}
                                    </span>
                                    <p className="mt-3 text-sm line-height-3 opacity-80 h-3rem overflow-hidden text-overflow-ellipsis">
                                        {project.description || "אין תיאור זמין לפרויקט זה..."}
                                    </p>

                                    {/* הכפתור המעודכן לפי הסגנון של דף ה-Login */}
                                    <div className="mt-4 flex justify-content-end">
                                        <Button
                                            label="שמירה"
                                            icon="pi pi-save" 
                                            iconPos="right"
                                            className="p-button-sm border-round-pill shadow-2 border-none px-4 py-2 transition-all hover:shadow-4"
                                            style={{
                                                backgroundColor: '#bc6c25',
                                                color: '#fefae0',
                                                fontSize: '0.9rem'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                handleUpdate();
                                            }}

                                        />

                                    </div>
                                </div>
                            </Card>
                        </div>)

                ))}
            </div>

            {/* הודעה כשאין פרויקטים */}
            {projects.length === 0 && (
                <div className="flex flex-column align-items-center justify-content-center mt-8 py-8 fadein animation-duration-1000">
                    <i className="pi pi-folder-open text-8xl mb-4 opacity-20" style={{ color: '#fefae0' }}></i>
                    <h2 className="text-2xl font-light opacity-50" style={{ color: '#fefae0' }}>עדיין לא נוצרו פרויקטים במערכת</h2>
                </div>
            )}

            {/* עיצוב פנימי לשיפור ה-Card של PrimeReact */}
            <style>{`
                .p-card {
                    color: #fefae0 !important;
                }
                .p-card-body {
                    padding: 1.5rem !important;
                }
                .p-card-title {
                    display: none; /* ביטלנו את הכותרת המובנית לטובת עיצוב מותאם בתוך ה-content */
                }
                .hover\\:-translate-y-1:hover {
                    transform: translateY(-5px);
                }
            `}</style>
        </div>
    );
};

export default ProjectList