import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { create,remove } from "../store/projectsSlice";

const ProjectList = () =>{
    const navigate = useNavigate();         
    const dispatch = useDispatch();
    const projects = useSelector((state)=>state.projects);

    const projectFooter = (project_id)=>(
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button
                label="הצגת פרויקט"
                icon="pi-arrow-right"
                onClick={() => navigate(`/project/${project_id}`)}
                className="p-button-outlined p-button-info"
            />
            <Button
                label="מחיקת פרויקט"
                icon="pi-trash"
                onClick={() => dispatch(remove(project_id))}
                className="p-button-outlined p-button-info"
            />
        </div>
    );

    return(
        <>
            <Button
                label="new"
                icon = "pi-plus"
                onClick={() => dispatch(create({ name: 'New project', description: '', createDate: new Date() }))}
                className="p-button-outlined p-button-info"
            />
            {projects.map((project)=> (
                <Card key={project.id} title={project.name} subTitle={project.createDate} footer={projectFooter(project.id)} className="md:w-25rem">
                    <p className="m-0">
                     {project.description}
                    </p>
                </Card>
            ))}

        </>
    );
}

export default ProjectList