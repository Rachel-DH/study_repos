import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


const ProjectDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const tasks = useSelector(state => state.tasks);
    const tasksList = tasks.list;
    const filteredTasks = tasksList.filter(task => task.idProject === id);
    const statuses = ["To Do", "In Progress", "In Review", "Done"];


    const sortTasks = (tasks) => {  
        const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
        return [...tasks].sort((a, b) => {
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    };

    return (
        <>
        {console.log("dfghjk", tasks)}
        {console.log("cvb", filteredTasks)}

            <Button label="חזרה לרשימת הפרויקטים" onClick={() => navigate('/projects')} className="p-button-outlined p-button-info mb-3" />
            <Button label="הוספת משימה" onClick={() => navigate(`/project/${id}/add-task`)} className="p-button-outlined p-button-success mb-3" />
            <div className="grid">
                {statuses.map(status => (
                    <div key={status} className="col">
                        <Card title={status} className="md:w-25rem">
                            <h2>{status}</h2>
                            {console.log(sortTasks(filteredTasks.filter(task => task.status === status)))};

                            {sortTasks(filteredTasks.filter(task => task.status === status)).map(task => (
                                <div key={task.id} className="p-3 border-round-sm bg-light text-center">
                                    <Card title={task.title} className="md:w-25rem">
                                        <p>{task.description}</p>
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