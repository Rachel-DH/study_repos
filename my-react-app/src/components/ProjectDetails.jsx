import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


const ProjectDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const tasks = useSelector(state => state.tasks);
    const tasksList = tasks.list;
    const filteredTasks = tasksList.filter(task => task.idProject === id.toString());
    const statuses = ["To Do", "In Progress", "In Review", "Done"];
    const priorityOrder = ['Low', 'Medium', 'High'];

    const filterTasksByStatus = (status) => filteredTasks.filter(task => task.status === status);
const sortTasksByPriority = (tasks) => {
    return [...tasks].sort((a, b) => {
        if (a.priority !== b.priority) {
            return b.priority - a.priority;
        }
        return 0; 
    });
};

    const sortTasksSamePriorityByDate = (tasks) => {
        return [...tasks].sort((a, b) => {
            if (a.priority !== b.priority) {
                return 0; 
            }
            const dateA = new Date(a.dueDate.split('/').reverse().join('-')); // המרת הפורמט
            const dateB = new Date(b.dueDate.split('/').reverse().join('-')); // המרת הפורמט
            return dateA - dateB;
        });
    };
    // const sortTasksByPriorityAndDate = (tasks) => {
    //     const sortedByPriority = sortTasksByPriority(tasks);
    //     return sortTasksSamePriorityByDate(sortedByPriority);
    // }

const sortTasksByPriorityAndDate = (tasks) => {
    return [...tasks].sort((a, b) => {
        // קודם ממיינים לפי עדיפות
        if (a.priority !== b.priority) {
            return b.priority - a.priority; // סידור יורד לפי עדיפות
        } else {
            const dateA = new Date(a.dueDate.split('.').reverse().join('-')); 
            const dateB = new Date(b.dueDate.split('.').reverse().join('-')); 
            return dateA - dateB; 
        }
    });
};

    
            {console.log("dfghjk", tasks)}
            {console.log("cvb", filteredTasks)}
            {console.log("fghjk",filterTasksByStatus("To Do"))}
            {console.log("dfghjk", sortTasksByPriorityAndDate(filteredTasks))}

    return (
        <>

            <Button label="חזרה לרשימת הפרויקטים" onClick={() => navigate('/projects')} className="p-button-outlined p-button-info mb-3" />
            <Button label="הוספת משימה" onClick={() => navigate(`/project/${id}/add-task`)} className="p-button-outlined p-button-success mb-3" />
            <div className="grid">
                {statuses.map(status => (
                    <div key={status} className="col">
                        <Card title={status} className="md:w-25rem">
                            {sortTasksByPriorityAndDate(filterTasksByStatus(status)).map(task => (
                                <div key={task.id} className="p-3 border-round-sm bg-light text-center">
                                    <Card title={task.title} className="md:w-25rem">
                                        <p>{task.description}</p>
                                        <p>עדיפות: {priorityOrder[task.priority - 1]}</p>
                                        <p>תאריך יעד: {task.dueDate}</p>
                                    </Card>
                                </div>
                            ))}
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProjectDetails;