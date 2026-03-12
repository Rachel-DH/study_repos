// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import 'primeicons/primeicons.css';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';


// const ProjectDetails = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const tasks = useSelector(state => state.tasks);
//     const tasksList = tasks.list;
//     const filteredTasks = tasksList.filter(task => task.idProject === id.toString());
//     const statuses = ["To Do", "In Progress", "In Review", "Done"];
//     const priorityOrder = ['Low', 'Medium', 'High'];

//     const filterTasksByStatus = (status) => filteredTasks.filter(task => task.status === status);
// const sortTasksByPriority = (tasks) => {
//     return [...tasks].sort((a, b) => {
//         if (a.priority !== b.priority) {
//             return b.priority - a.priority;
//         }
//         return 0; 
//     });
// };

//     const sortTasksSamePriorityByDate = (tasks) => {
//         return [...tasks].sort((a, b) => {
//             if (a.priority !== b.priority) {
//                 return 0; 
//             }
//             const dateA = new Date(a.dueDate.split('/').reverse().join('-')); // המרת הפורמט
//             const dateB = new Date(b.dueDate.split('/').reverse().join('-')); // המרת הפורמט
//             return dateA - dateB;
//         });
//     };
//     // const sortTasksByPriorityAndDate = (tasks) => {
//     //     const sortedByPriority = sortTasksByPriority(tasks);
//     //     return sortTasksSamePriorityByDate(sortedByPriority);
//     // }

// const sortTasksByPriorityAndDate = (tasks) => {
//     return [...tasks].sort((a, b) => {
//         // קודם ממיינים לפי עדיפות
//         if (a.priority !== b.priority) {
//             return b.priority - a.priority; // סידור יורד לפי עדיפות
//         } else {
//             const dateA = new Date(a.dueDate.split('.').reverse().join('-')); 
//             const dateB = new Date(b.dueDate.split('.').reverse().join('-')); 
//             return dateA - dateB; 
//         }
//     });
// };

    
//             {console.log("dfghjk", tasks)}
//             {console.log("cvb", filteredTasks)}
//             {console.log("fghjk",filterTasksByStatus("To Do"))}
//             {console.log("dfghjk", sortTasksByPriorityAndDate(filteredTasks))}

//     return (
//         <>

//             <Button label="חזרה לרשימת הפרויקטים" onClick={() => navigate('/projects')} className="p-button-outlined p-button-info mb-3" />
//             <Button label="הוספת משימה" onClick={() => navigate(`/project/${id}/add-task`)} className="p-button-outlined p-button-success mb-3" />
//             <div className="grid">
//                 {statuses.map(status => (
//                     <div key={status} className="col-3">
//                         <Card title={status} className="md:w-25rem p-mb-2">
//                             {sortTasksByPriorityAndDate(filterTasksByStatus(status)).map(task => (
//                                 <div key={task.id} className="p-3 border-round-sm bg-light text-center">
//                                     <Card title={task.title} className="md:w-25rem p-card p-p-2">
//                                         <p>{task.description}</p>
//                                         <p>עדיפות: {priorityOrder[task.priority - 1]}</p>
//                                         <p>תאריך יעד: {task.dueDate}</p>
//                                     </Card>
//                                 </div>
//                             ))}
//                         </Card>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// };

// export default ProjectDetails;
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // --- לוגיקה מקורית (ללא שינוי) ---
    const tasks = useSelector(state => state.tasks);
    const tasksList = tasks.list;
    const filteredTasks = tasksList.filter(task => task.idProject === id.toString());
    const statuses = ["To Do", "In Progress", "In Review", "Done"];
    const priorityOrder = ['Low', 'Medium', 'High'];

    const filterTasksByStatus = (status) => filteredTasks.filter(task => task.status === status);

    const sortTasksByPriorityAndDate = (tasks) => {
        return [...tasks].sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority; 
            } else {
                // המרה לפורמט תקין לצורך השוואה (מניח שימוש בנקודה או לוכסן לפי הקוד שלך)
                const dateA = new Date(a.dueDate.includes('.') ? a.dueDate.split('.').reverse().join('-') : a.dueDate.split('/').reverse().join('-')); 
                const dateB = new Date(b.dueDate.includes('.') ? b.dueDate.split('.').reverse().join('-') : b.dueDate.split('/').reverse().join('-')); 
                return dateA - dateB; 
            }
        });
    };

    // --- הגדרות עיצוב (PrimeReact Style) ---
    const statusTheme = {
        "To Do": "#64748b",
        "In Progress": "#bc6c25",
        "In Review": "#606c38",
        "Done": "#2e7d32"
    };

    const priorityColors = { 'Low': 'info', 'Medium': 'warning', 'High': 'danger' };

    return (
        <div className="min-h-screen w-screen m-0 p-4" 
             style={{ 
                 backgroundImage: 'linear-gradient(to bottom, rgba(40, 54, 24, 0.94), rgba(40, 54, 24, 0.88)), url("/745205069564995779.jpg")',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundAttachment: 'fixed',
                 direction: 'rtl'
             }}>
            
            {/* כפתורי ניווט עליונים */}
            <div className="flex justify-content-between align-items-center mb-5 px-3">
                <div className="flex align-items-center gap-3">
                    <Button 
                        icon="pi pi-arrow-right" 
                        className="p-button-rounded p-button-text text-white bg-white-alpha-10" 
                        onClick={() => navigate('/projects')} 
                    />
                    <h1 className="text-4xl font-black m-0 text-white">Project Board</h1>
                </div>
                <Button 
                    label="הוספת משימה" 
                    icon="pi pi-plus" 
                    className="p-button-md border-round-pill border-none shadow-6"
                    style={{ backgroundColor: '#bc6c25', color: '#fefae0' }}
                    onClick={() => navigate(`/project/${id}/add-task`)} 
                />
            </div>

            {/* לוח הקנבן - גריד מבוסס PrimeFlex */}
            <div className="grid h-full px-2" style={{ alignItems: 'start' }}>
                {statuses.map(status => (
                    <div key={status} className="col-12 md:col-6 lg:col-3 p-2">
                        
                        {/* כרטיס הסטטוס הגדול (העמודה) עם גלילה פנימית */}
                        <div className="flex flex-column shadow-8 overflow-hidden" 
                             style={{ 
                                 background: 'rgba(255, 255, 255, 0.05)', 
                                 borderRadius: '16px',
                                 borderTop: `6px solid ${statusTheme[status]}`,
                                 height: '78vh' 
                             }}>
                            
                            {/* כותרת העמודה */}
                            <div className="p-3 flex justify-content-between align-items-center bg-white-alpha-5">
                                <span className="text-lg font-bold text-white uppercase opacity-90">{status}</span>
                                <Badge value={filterTasksByStatus(status).length} style={{ background: statusTheme[status] }}></Badge>
                            </div>

                            {/* רשימת המשימות הנגללת */}
                            <div className="p-3 overflow-y-auto flex-grow-1 border-round-bottom-2">
                                {sortTasksByPriorityAndDate(filterTasksByStatus(status)).map(task => (
                                    <Card key={task.id} className="mb-3 border-none shadow-3 hover:shadow-6 transition-all"
                                          style={{ 
                                              background: 'rgba(254, 250, 224, 0.98)', 
                                              borderRadius: '12px' 
                                          }}
                                          pt={{
                                              body: { className: 'p-3' },
                                              content: { className: 'p-0' }
                                          }}>
                                        <div className="flex flex-column gap-2">
                                            <div className="flex justify-content-between align-items-center">
                                                <span className="font-bold text-900 text-sm" style={{ color: '#283618' }}>{task.title}</span>
                                                <Badge 
                                                    value={priorityOrder[task.priority - 1]} 
                                                    severity={priorityColors[priorityOrder[task.priority - 1]]}
                                                    style={{ fontSize: '0.6rem' }}>
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-700 m-0 line-height-3 opacity-80">
                                                {task.description}
                                            </p>
                                            <div className="flex align-items-center mt-2 text-xs text-500 pt-2 border-top-1 border-100 font-medium">
                                                <i className="pi pi-calendar-plus ml-1" style={{ fontSize: '0.7rem' }}></i>
                                                <span className="ml-2">יעד: {task.dueDate}</span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}

                                {filterTasksByStatus(status).length === 0 && (
                                    <div className="flex flex-column align-items-center py-5 opacity-20 text-white italic">
                                        <i className="pi pi-inbox text-2xl mb-2"></i>
                                        <span className="text-xs">אין משימות</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectDetails;