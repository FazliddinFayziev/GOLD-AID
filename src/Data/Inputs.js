import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Inputs = (eng, ru) => {
    const Forgot = (eng ? "Forgot my password and Username" : ru ? "Забыли пароль и имя пользователя" : "Parol va foydalanuvchi nomimni unutdim")
    const InputConfirmPassword = (eng ? "Confirm Password:" : ru ? "Подтвердите пароль:" : "Parolni tasdiqlang:")
    const InputAge = (eng ? "Enter Age:" : ru ? "Введите возраст:" : "Yoshingizni kiriting:")
    const RegisterButton = (eng ? "Take the test" : ru ? "Пройти тест" : "Test topshirish")
    const InputName = (eng ? "Enter Name:" : ru ? "Введите имя:" : "Ismingizni kiriting:")
    const InputEmail = (eng ? "Email:" : ru ? "Электронная почта" : "Elektron pochta:")
    const StartTest = (eng ? "Start the test" : ru ? "Начать тест" : "Testni boshlash")
    const RegisterNav = (eng ? "Register" : ru ? "Регистрация" : "Roʻyxatdan oʻtish")
    const Register = (eng ? "Register" : ru ? "Регистрация" : "Roʻyxatdan oʻtish")
    const Welcome = (eng ? "Welcome" : ru ? "Добро пожаловать" : "Xush kelibsiz")
    const InputPassword = (eng ? "Password:" : ru ? "Пароль:" : "Parol:")
    const Contact = (eng ? "Contact" : ru ? "Контакт" : "Bog'lanish")
    const myLanguage = (eng ? "English" : ru ? "Русский" : "O'zbek")
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
        InputPassword,
        RegisterNav,
        InputFemale,
        InputGender,
        myLanguage,
        InputEmail,
        InputName,
        StartTest,
        InputMale,
        InputAge,
        Register,
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



// open and close eye
export const Eye = (open) => {
    const sign = (open ? <AiFillEye className='eye-element' /> : <AiFillEyeInvisible />)
    const type = (open ? 'password' : 'text')
    return {
        sign,
        type
    }
}

// check Password
export const checkPassword = (password, setCheckStrong) => {
    let upperCaseLetters = /[A-Za-z]/g;
    let lowerCaseLetters = /[a-z]/g;
    if (password.match(upperCaseLetters) && password.match(lowerCaseLetters)) {
        setCheckStrong({ weak: true, good: false, strong: false })
    } else {
        setCheckStrong({ weak: false, good: false, strong: false })
    }
    let numbers = /[0-9]/g;
    let signs = /[@$#%&*]/g;
    if (password.match(numbers) && password.match(signs) && password.match(upperCaseLetters) && password.match(lowerCaseLetters)) {
        setCheckStrong({ weak: false, good: true, strong: false })
    }
    if (password.length >= 8 && password.length <= 15 && password.match(numbers) && password.match(signs) && password.match(upperCaseLetters) && password.match(lowerCaseLetters)) {
        setCheckStrong({ weak: false, good: false, strong: true })
    }
}



// check confirm Password
export const checkConfirmPassword = (confirmInputValue, setCheckStrongConfirm, password) => {
    let upperCaseLetters = /[A-Za-z]/g;
    let lowerCaseLetters = /[a-z]/g;
    if (confirmInputValue.match(upperCaseLetters) && confirmInputValue.match(lowerCaseLetters)) {
        setCheckStrongConfirm({ weakCon: true, goodCon: false, strongCon: false })
    } else {
        setCheckStrongConfirm({ weakCon: false, goodCon: false, strongCon: false })
    }
    let numbers = /[0-9]/g;
    let signs = /[@$#%&*]/g;
    if (confirmInputValue.match(numbers) && confirmInputValue.match(signs) && confirmInputValue.match(upperCaseLetters) && confirmInputValue.match(lowerCaseLetters)) {
        setCheckStrongConfirm({ weakCon: false, goodCon: true, strongCon: false })
    }
    if (confirmInputValue === password && confirmInputValue.length >= 8 && confirmInputValue.length <= 15 && confirmInputValue.match(numbers) && confirmInputValue.match(signs) && confirmInputValue.match(upperCaseLetters) && confirmInputValue.match(lowerCaseLetters)) {
        setCheckStrongConfirm({ weakCon: false, goodCon: false, strongCon: true })
    }
}



export default Inputs

