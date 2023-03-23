import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Inputs = (eng, ru) => {
    const Forgot = (eng ? "Forgot my password and Username" : ru ? "Забыли пароль и имя пользователя" : "Parol va foydalanuvchi nomimni unutdim")
    const InputConfirmPassword = (eng ? "Confirm Password:" : ru ? "Подтвердите пароль:" : "Parolni tasdiqlang:")
    const InputUsername = (eng ? "Username:" : ru ? "Имя пользователя:" : "Foydalanuvchi ismingiz:")
    const InputAge = (eng ? "Enter Age:" : ru ? "Введите возраст:" : "Yoshingizni kiriting:")
    const RegisterButton = (eng ? "Take the test" : ru ? "Пройти тест" : "Test topshirish")
    const InputName = (eng ? "Enter Name:" : ru ? "Введите имя:" : "Ismingizni kiriting:")
    const InputEmail = (eng ? "Email:" : ru ? "Электронная почта" : "Elektron pochta:")
    const RegisterNav = (eng ? "Register" : ru ? "Регистрация" : "Roʻyxatdan oʻtish")
    const Register = (eng ? "Register" : ru ? "Регистрация" : "Roʻyxatdan oʻtish")
    const Welcome = (eng ? "Welcome" : ru ? "Добро пожаловать" : "Xush kelibsiz")
    const InputPassword = (eng ? "Password:" : ru ? "Пароль:" : "Parol:")
    const Contact = (eng ? "Contact" : ru ? "Контакт" : "Bog'lanish")
    const English = (eng ? "English" : ru ? "Английский" : "Ingliz")
    const InputFemale = (eng ? "Female" : ru ? "Женский" : "Ayol")
    const InputMale = (eng ? "Male" : ru ? "Мужской" : "Erkak")
    const Uzbek = (eng ? "Uzbek" : ru ? "Узбекский" : "O'zbek")
    const Russian = (eng ? "Russian" : ru ? "Русский" : "Rus")
    const InputGender = (eng ? "Gender" : ru ? "Пол" : "Jins")
    const Login = (eng ? "Login" : ru ? "Логин" : "Kirish")
    const About = (eng ? "About" : ru ? "О нас" : "Biz")
    return {
        InputConfirmPassword,
        RegisterButton,
        InputUsername,
        InputPassword,
        RegisterNav,
        InputFemale,
        InputGender,
        InputEmail,
        InputName,
        InputMale,
        Register,
        InputAge,
        Welcome,
        Contact,
        English,
        Russian,
        Forgot,
        Uzbek,
        About,
        Login,
    }
}


export const Eye = (open) => {
    const sign = (open ? <AiFillEye className='eye-element' /> : <AiFillEyeInvisible />)
    const type = (open ? 'password' : 'text')
    return {
        sign,
        type
    }
}

export default Inputs

