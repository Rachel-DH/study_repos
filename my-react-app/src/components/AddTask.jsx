import { useForm, Controller } from "react-hook-form"
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { create } from "../store/taskSlice";
import { Calendar } from 'primereact/calendar';
import 'primeicons/primeicons.css';


export default function AddTask() {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            priority: null,
            dueDate: null
        }
    })

    const toast = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const projectId = parseInt(id);
    const priorityOptions = [
        { name: 'Low', value: 1 },
        { name: 'Medium', value: 2 },
        { name: 'High', value: 3 }
    ];

    const onSubmit = (data) => {
        dispatch(create({
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate ? data.dueDate.toLocaleDateString('he-IL') : null,
            idProject: projectId
        })); navigate('/project/' + id);

toast.current.show({
        severity: 'success',
        summary: 'הצלחה',
        detail: 'המשימה נוספה בהצלחה',
        life: 1500
    });

    setTimeout(() => {
        navigate('/project/' + id);
    }, 1500);
}
    const validateDate = (value) => {
        if (!value) return true;
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return value >= today || "לא ניתן לבחור תאריך שעבר";
    };

    return (
        <>
            <Toast ref={toast} />
            <Card title="הוספת משימה" style={{ maxWidth: '400px', margin: 'auto' }}>

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <FloatLabel>
                            <InputText
                                id="title"
                                {...register("title", { required: "חובה להזין שם משימה" })}
                                className={errors.title ? 'p-invalid' : ''}
                            />
                            <label htmlFor="title">שם משימה</label>
                        </FloatLabel>
                        {errors.title && <small style={{ color: 'red', display: 'block', marginTop: '0.5rem' }}>{errors.title.message}</small>}
                    </div>

                    <div>
                        <FloatLabel>
                            <InputText
                                id="description"
                                {...register("description", { required: "חובה להזין תיאור" })}
                                className={errors.description ? 'p-invalid' : ''}
                            />
                            <label htmlFor="description">תיאור</label>
                        </FloatLabel>
                        {errors.description && <small style={{ color: 'red', display: 'block', marginTop: '0.5rem' }}>{errors.description.message}</small>}
                    </div>
                    <div>
                        <FloatLabel>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Dropdown
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        options={priorityOptions}
                                        optionLabel="name"
                                        optionValue="value"
                                        placeholder="בחר עדיפות"
                                        className={`w-full md:w-14rem ${fieldState.error ? 'p-invalid' : ''}`}
                                    />
                                )}
                            />
                            <label htmlFor="priority">עדיפות</label>
                        </FloatLabel>

                        {errors.priority && (
                            <small style={{ color: 'red', display: 'block', marginTop: '0.5rem' }}>
                                {errors.priority.message}
                            </small>
                        )}
                    </div>
                    <div className="field">
                        <FloatLabel>
                            <Controller
                                name="dueDate"
                                control={control}
                                rules={{
                                    validate: validateDate
                                }}
                                render={({ field, fieldState }) => (
                                    <Calendar
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        dateFormat="dd/mm/yy"
                                        showIcon
                                        minDate={new Date()}
                                        className={`w-full ${fieldState.invalid ? 'p-invalid' : ''}`}
                                        placeholder="בחר תאריך"
                                    />
                                )}
                            />
                            <label htmlFor="dueDate">תאריך יעד</label>
                        </FloatLabel>

                        {errors.dueDate && (
                            <small className="p-error block mt-2" style={{ color: 'red' }}>
                                {errors.dueDate.message}
                            </small>
                        )}
                    </div>
                    <Button type="submit" label="הוספת משימה" icon="pi pi-check" />
                </form>
            </Card>
        </>
    )
}