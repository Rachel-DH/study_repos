// import { useForm, Controller } from "react-hook-form"
// import { FloatLabel } from 'primereact/floatlabel';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import { useDispatch, useSelector } from 'react-redux'; 
// import { useNavigate } from 'react-router-dom';  
// import { useRef } from 'react'; 
// import { Toast } from 'primereact/toast';
// import { create } from "../store/projectsSlice";
// import { Calendar } from 'primereact/calendar';
// import 'primeicons/primeicons.css';


// export default function AddProject() {

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//    defaultValues: {
//      username: "",
//      password: ""
//    }
// })

//  const toast = useRef(null);
//  const projects =useSelector((state) => state.projects); 
//  const dispatch = useDispatch();
//  const navigate = useNavigate();  

//   const onSubmit = (data) => {
// dispatch(create({ 
//     name: data.projectName, 
//     description: data.description, 
//     createDate: data.createDate ? data.createDate.toLocaleDateString('he-IL') : new Date().toLocaleDateString('he-IL')
//   }));    navigate('/projects');
//   }

//   const validatePastDate = (value) => {
//         if (!value) return true; 
//         const today = new Date();
//         today.setHours(23, 59, 59, 999);
//         return value <= today || "לא ניתן לבחור תאריך עתידי";
//     };

//   return (
//     <>
//     <Toast ref={toast} />
//    <Card title="הוספת פרויקט" style={{ maxWidth: '400px', margin: 'auto' }}>

//     <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
//       <div>
//           <FloatLabel>
//             <InputText 
//               id="projectName" 
//               {...register("projectName", { required: "חובה להזין שם פרויקט" })} 
//               className={errors.projectName ? 'p-invalid' : ''} 
//             />
//             <label htmlFor="projectName">שם פרויקט</label>
//           </FloatLabel>
//           {errors.projectName && <small style={{ color: 'red', display: 'block', marginTop: '0.5rem' }}>{errors.projectName.message}</small>}
//         </div>

//               <div>
//           <FloatLabel>
//             <InputText 
//               id="description" 
//               {...register("description", { required: "חובה להזין תיאור" })} 
//               className={errors.description ? 'p-invalid' : ''} 
//             />
//             <label htmlFor="description">תיאור</label>
//           </FloatLabel>
//           {errors.description && <small style={{ color: 'red', display: 'block', marginTop: '0.5rem' }}>{errors.description.message}</small>}
//         </div>
//         <div className="field">
//                     <FloatLabel>
//                         <Controller
//                             name="createDate"
//                             control={control}
//                             rules={{ 
//                                 validate: validatePastDate 
//                             }}
//                             render={({ field, fieldState }) => (
//                                 <Calendar 
//                                     id={field.name}
//                                     value={field.value} 
//                                     onChange={(e) => field.onChange(e.value)} 
//                                     dateFormat="dd/mm/yy" 
//                                     showIcon
//                                     maxDate={new Date()} 
//                                     className={`w-full ${fieldState.invalid ? 'p-invalid' : ''}`}
//                                     placeholder="בחר תאריך"
//                                 />
//                             )}
//                         />
//                         <label htmlFor="createDate">תאריך יצירה</label>
//                     </FloatLabel>

//                     {errors.createDate && (
//                         <small className="p-error block mt-2" style={{ color: 'red' }}>
//                             {errors.createDate.message}
//                         </small>
//                     )}
//                 </div>
//         <Button type="submit" label="הוספת פרויקט" icon="pi pi-check" />
//         </form>
//    </Card>
//    </>
//   )
// }

import React, { useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { create } from "../store/projectsSlice";

export default function AddProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: "",
      description: "",
      createDate: null
    }
  });

  const onSubmit = (data) => {
    dispatch(create({
      name: data.projectName,
      description: data.description,
      createDate: data.createDate ? data.createDate.toLocaleDateString('he-IL') : new Date().toLocaleDateString('he-IL')
    }));
    navigate('/projects');
  };

  const validatePastDate = (value) => {
    if (!value) return true;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return value <= today || "לא ניתן לבחור תאריך עתידי";
  };

  // סגנון אחיד לשדות הקלט בהתאם לשפה העיצובית של ה-Login
  const inputStyle = {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#fefae0',
    padding: '1rem',
    width: '100%'
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen w-screen m-0 p-4"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(40, 54, 24, 0.9), rgba(40, 54, 24, 0.8)), url("/745205069564995779.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        direction: 'rtl'
      }}>

      <Toast ref={toast} />

      <Card className="shadow-8 border-round-xl overflow-hidden"
        style={{
          maxWidth: '500px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>

        <div className="mb-5 text-center">
          <h1 className="text-4xl font-black m-0 mb-2" style={{ color: '#fefae0' }}>פרויקט חדש.</h1>
          <p style={{ color: '#dda15e' }}>מלא את הפרטים כדי להתחיל ביצירה</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-4">

          {/* שם פרויקט */}
          <div className="flex flex-column gap-2">
            <FloatLabel>
              <InputText
                id="projectName"
                {...register("projectName", { required: "חובה להזין שם פרויקט" })}
                className={`w-full ${errors.projectName ? 'p-invalid' : ''}`}
                style={inputStyle}
              />
              <label htmlFor="projectName" style={{ color: '#fefae0', opacity: 0.7 }}>שם פרויקט</label>
            </FloatLabel>
            {errors.projectName && <small className="p-error mr-2">{errors.projectName.message}</small>}
          </div>

          {/* תיאור פרויקט */}
          <div className="flex flex-column gap-2">
            <FloatLabel>
              <InputText
                id="description"
                {...register("description", { required: "חובה להזין תיאור" })}
                className={`w-full ${errors.description ? 'p-invalid' : ''}`}
                style={inputStyle}
              />
              <label htmlFor="description" style={{ color: '#fefae0', opacity: 0.7 }}>תיאור קצר</label>
            </FloatLabel>
            {errors.description && <small className="p-error mr-2">{errors.description.message}</small>}
          </div>

          {/* תאריך יצירה */}
          <div className="flex flex-column gap-2">
            <FloatLabel>
              <Controller
                name="createDate"
                control={control}
                rules={{ validate: validatePastDate }}
                render={({ field, fieldState }) => (
                  <Calendar
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    dateFormat="dd/mm/yy"
                    showIcon
                    maxDate={new Date()}
                    className={`w-full ${fieldState.invalid ? 'p-invalid' : ''}`}
                    inputStyle={inputStyle}
                    placeholder="בחר תאריך (אופציונלי)"
                  />
                )}
              />
              <label htmlFor="createDate" style={{ color: '#fefae0', opacity: 0.7 }}>תאריך יצירה</label>
            </FloatLabel>
            {errors.createDate && <small className="p-error mr-2">{errors.createDate.message}</small>}
          </div>

          {/* כפתורי פעולה */}
          <div className="flex flex-column gap-3 mt-4">
            <Button
              type="submit"
              label="צור פרויקט"
              icon="pi pi-check"
              className="p-3 font-bold border-none shadow-4 border-round-lg"
              style={{ backgroundColor: '#bc6c25', color: '#fefae0' }}
            />
           <Button
  type="button"
  label="ביטול וחזרה"
  icon="pi pi-times"
  // שינינו את p-button-plain ל-p-button-secondary שנותן גוון אפרפר בולט יותר
  // הוספנו surface-ground (אופציונלי) אם רוצים רקע כהה עמוק
  className="p-button-outlined p-button-secondary text-white border-round-lg shadow-2"
  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} // הוספת רקע עדין מאוד כדי שיהיה קל לזהות את הכפתור
  onClick={() => navigate('/projects')}
/>
          </div>
        </form>
      </Card>

      <style>{`
                .p-float-label label { right: 1rem; left: auto; }
                .p-datepicker { background: #283618 !important; border: 1px solid #bc6c25 !important; color: #fefae0 !important; }
                .p-calendar .p-button { background: #bc6c25 !important; border: none !important; border-radius: 0 12px 12px 0 !important; }
                .p-inputtext:focus { border-color: #dda15e !important; box-shadow: 0 0 0 2px rgba(221, 161, 94, 0.2) !important; }
            `}</style>
    </div>
  );
}