import { useForm, Controller } from "react-hook-form"
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';  
import { login as loginAction, updateName, updatePassword } from "../store/userSlice";
import { useRef } from 'react'; 
import { Toast } from 'primereact/toast';


const Login = () => {
    
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    })
 const toast = useRef(null);
 const userName=useSelector((state) => state.user.name);
 const password=useSelector((state) => state.user.password); 
 const dispatch = useDispatch();
 const navigate = useNavigate();  

  const onSubmit = (data) => {
    if(userName === "") {
        dispatch(updateName(data.username));
        dispatch(updatePassword(data.password));
        dispatch(loginAction()); 
        navigate('/projects');
    } 
    else if(data.username === userName && data.password === password) {
        dispatch(loginAction()); 
        navigate('/projects');
    } 
    else {
        toast.current.show({
            severity: 'error', 
            summary: 'שגיאת התחברות', 
            detail: 'שם משתמש או סיסמה שגויים', 
            life: 3000
        });
    }
  }

  return (
    <>
    <Toast ref={toast} />
   <Card title="התחברות" style={{ maxWidth: '400px', margin: 'auto' }}>

    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
          <FloatLabel>
            <InputText 
              id="username" 
              {...register("username", { required: "חובה להזין שם משתמש" })} 
              className={errors.username ? 'p-invalid' : ''} 
            />
            <label htmlFor="username">שם משתמש</label>
          </FloatLabel>
          {errors.username && <small style={{ color: 'red', display: 'block', marginTop: '0.5rem' }}>{errors.username.message}</small>}
        </div>

        
        <div>
<FloatLabel>
    <Controller
        name="password"
        control={control}
        rules={{ required: "חובה להזין סיסמה" }}
        render={({ field }) => (
            <Password 
                {...field}
                id="password" 
                toggleMask 
                feedback={false} 
                inputClassName="w-full"
                className="w-full"
            />
        )}
    />
    <label htmlFor="password">סיסמה</label>
</FloatLabel>
          {errors.password && <small style={{ color: 'red', display: 'block', marginTop: '0.5rem' }}>{errors.password.message}</small>}
        </div>

        <Button type="submit" label="התחבר" icon="pi pi-check" />
        </form>
   </Card>
   </>
  )
}

export default Login;