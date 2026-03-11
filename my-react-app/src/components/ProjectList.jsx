import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { remove } from "../store/projectsSlice";
import ImageByTopic from './ImageByTopic';

const ProjectList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.list);

    const projectFooter = (project_id) => (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button
                label="הצגת פרויקט "
                icon="pi pi-arrow-right"
                onClick={() => navigate(`/project/${project_id}`)}
                className="p-button-outlined p-button-info"
            />
            <Button
                label="מחיקת פרויקט "
                icon="pi pi-trash"
                onClick={() => dispatch(remove(project_id))}
                className="p-button-outlined p-button-info"
            />
        </div>
    );

    return (
        <>
            <Button
                label="new Project "
                icon="pi pi-plus"
                onClick={() => navigate('/projects/add')}
                className="p-button-outlined p-button-info"
            />
            <div className="grid">

                {projects.map((project) => (
                    <div key={project.id} className="col">
                        <div className="text-center p-3 border-round-sm bg-primary font-bold ">

                            <Card
                                key={project.id}
                                title={project.name}
                                subTitle={project.createDate}
                                header={<ImageByTopic topic={project.name} />}
                                footer={projectFooter(project.id)}
                                className="md:w-25rem">
                                <p className="m-0">
                                    {project.description}
                                </p>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProjectList