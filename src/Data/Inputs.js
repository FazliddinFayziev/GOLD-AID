import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Inputs = (eng, ru) => {
    const WarningPage = (eng ? (<p className='warning-page-text'>You will be given only one chance to take the test. Thanks to test, we will know your level. <span className='red-text'>Please be responsible for your test, because according to your test results, you will get your courses !</span></p>) : ru ? (<p className='warning-page-text'>Вам будет предоставлена ​​только одна возможность пройти тест. Благодаря тесту мы узнаем ваш уровень. <span className='red-text'>Пожалуйста, будьте ответственны за свой тест, потому что по результатам теста вы получите свои курсы !</span></p>) : (<p className='warning-page-text'>Sinovdan o'tish uchun sizga faqat bitta imkoniyat beriladi. Sinov orqali biz sizning darajangizni bilib olamiz. <span className='red-text'>Iltimos, testga mas'uliyat bilan yondashing, chunki test natijalari sizni qaysi kursda bo'lishingizni belgilab beradi!</span></p>))
    const WarningPageTitle = (eng ? (<h1>Before start, we should know your <span className="text-level">Level</span></h1>) : ru ? (<h1>Перед стартом, мы должны знать ваш <span className="text-level">Уровень</span></h1>) : (<h1>Boshlashdan oldin, biz sizning <span className="text-level">Darajangizni</span> bilishimiz kerak</h1>))
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
        WarningPageTitle,
        RegisterButton,
        InputPassword,
        RegisterNav,
        WarningPage,
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

// Email check
export const EmailCheck = (email, setIsEmail) => {
    let signs = /[@]/g;
    let dot = /[.]/g;
    if (email.match(signs) && email.match(dot)) {
        setIsEmail(true)
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

