import { useForm, Controller } from "react-hook-form"
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';  
import { useRef } from 'react'; 
import { Toast } from 'primereact/toast';
import { create } from "../store/projectsSlice";
import { Calendar } from 'primereact/calendar';
import 'primeicons/primeicons.css';


export default function AddProject() {
    
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
   defaultValues: {
     username: "",
     password: ""
   }
})

 const toast = useRef(null);
 const projects =useSelector((state) => state.projects); 
 const dispatch = useDispatch();
 const navigate = useNavigate();  

  const onSubmit = (data) => {
dispatch(create({ 
    name: data.projectName, 
    description: data.description, 
    createDate: data.createDate ? data.createDate.toLocaleDateString('he-IL') : new Date().toLocaleDateString('he-IL')
  }));    navigate('/projects');
  }

  const validatePastDate = (value) => {
        if (!value) return true; 
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return value <= today || "לא ניתן לבחור תאריך עתידי";
    };

  return (
    <>
    <Toast ref={toast} />
   <Card title="הוספת פרויקט" style={{ maxWidth: '400px', margin: 'auto' }}>

    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
          <FloatLabel>
            <InputText 
              id="projectName" 
              {...register("projectName", { required: "חובה להזין שם פרויקט" })} 
              className={errors.projectName ? 'p-invalid' : ''} 
            />
            <label htmlFor="projectName">שם פרויקט</label>
          </FloatLabel>
          {errors.projectName && <small style={{ color: 'red', display: 'block', marginTop: '0.5rem' }}>{errors.projectName.message}</small>}
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
        <div className="field">
                    <FloatLabel>
                        <Controller
                            name="createDate"
                            control={control}
                            rules={{ 
                                validate: validatePastDate 
                            }}
                            render={({ field, fieldState }) => (
                                <Calendar 
                                    id={field.name}
                                    value={field.value} 
                                    onChange={(e) => field.onChange(e.value)} 
                                    dateFormat="dd/mm/yy" 
                                    showIcon
                                    maxDate={new Date()} 
                                    className={`w-full ${fieldState.invalid ? 'p-invalid' : ''}`}
                                    placeholder="בחר תאריך"
                                />
                            )}
                        />
                        <label htmlFor="createDate">תאריך יצירה</label>
                    </FloatLabel>
                    
                    {errors.createDate && (
                        <small className="p-error block mt-2" style={{ color: 'red' }}>
                            {errors.createDate.message}
                        </small>
                    )}
                </div>
        <Button type="submit" label="הוספת פרויקט" icon="pi pi-check" />
        </form>
   </Card>
   </>
  )
}