import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Inputs = (eng, ru) => {
    const WarningPage = (eng ? (<p className='warning-page-text'>You will be given only one chance to take the test. Thanks to test, we will know your level. <span className='red-text'>Please be responsible for your test, because according to your test results, you will get your courses !</span></p>) : ru ? (<p className='warning-page-text'>Вам будет предоставлена ​​только одна возможность пройти тест. Благодаря тесту мы узнаем ваш уровень. <span className='red-text'>Пожалуйста, будьте ответственны за свой тест, потому что по результатам теста вы получите свои курсы !</span></p>) : (<p className='warning-page-text'>Sinovdan o'tish uchun sizga faqat bitta imkoniyat beriladi. Sinov orqali biz sizning darajangizni bilib olamiz. <span className='red-text'>Iltimos, testga mas'uliyat bilan yondashing, chunki test natijalari sizni qaysi kursda bo'lishingizni belgilab beradi!</span></p>))
    const WarningPageTitle = (eng ? (<h1>Before start, we should know your <span className="text-level">Level</span></h1>) : ru ? (<h1>Перед стартом, мы должны знать ваш <span className="text-level">Уровень</span></h1>) : (<h1>Boshlashdan oldin, biz sizning <span className="text-level">Darajangizni</span> bilishimiz kerak</h1>))
    const PasswordText = (eng ? (
        <p className='password-text'>
            • Has at least 6 characters and 12 maximum.
            <br />
            • Include capital or lower letters.
            <br />
            • Include numbers (0-9) and symbols ( @$#%&* )
        </p>
    ) : ru ? (
        <p className='password-text'>
            • Имеет не менее 6 символов и не более 12.
            <br />
            • используйте заглавные или строчные буквы (A-z/a-z).
            <br />
            • используйте цифры (0-9) и символы ( @$#%&* )
        </p>
    ) : (
        <p className='password-text'>
            • Kamida 6 ta belgi va maksimal 12 ta belgidan foydalaning.
            <br />
            • bosh yoki kichik harflardan foydalaning (A-z/a-z).
            <br />
            • raqamlar (0-9) va belgilardan foydalaning ( @$#%&* )
        </p>
    ))
    const ConfirmPasswordText = (eng ? (
        <p className='password-text'>
            • Confirm (repeat) your password.
        </p>
    ) : ru ? (
        <p className='password-text'>
            • Подтвердите (повторите) свой пароль.
        </p>
    ) : (
        <p className='password-text'>
            • Parolingizni tasdiqlang (takrorlang).
        </p>
    ))
    const Forgot = (eng ? "Forgot my password and Username" : ru ? "Забыли пароль и имя пользователя" : "Parol va foydalanuvchi nomimni unutdim")
    const InputConfirmPassword = (eng ? "Confirm Password:" : ru ? "Подтвердите пароль:" : "Parolni tasdiqlang:")
    const InputAge = (eng ? "Enter Age:" : ru ? "Введите возраст:" : "Yoshingizni kiriting:")
    const RegisterButton = (eng ? "Take the test" : ru ? "Пройти тест" : "Test topshirish")
    const InputName = (eng ? "Enter Name:" : ru ? "Введите имя:" : "Ismingizni kiriting:")
    const YourLevel = (eng ? "Your Level:" : ru ? "Ваш уровень:" : "Sizning darajangiz:")
    const InputEmail = (eng ? "Email:" : ru ? "Электронная почта" : "Elektron pochta:")
    const StartTest = (eng ? "Start the test" : ru ? "Начать тест" : "Testni boshlash")
    const YourScore = (eng ? "Your score:" : ru ? "Ваша оценка:" : "Sizning balingiz:")
    const RegisterNav = (eng ? "Register" : ru ? "Регистрация" : "Roʻyxatdan oʻtish")
    const Register = (eng ? "Register" : ru ? "Регистрация" : "Roʻyxatdan oʻtish")
    const Welcome = (eng ? "Welcome" : ru ? "Добро пожаловать" : "Xush kelibsiz")
    const ContinueButton = (eng ? "Continue" : ru ? "Продолжать" : "Davom etish")
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
        ConfirmPasswordText,
        WarningPageTitle,
        ContinueButton,
        RegisterButton,
        InputPassword,
        PasswordText,
        RegisterNav,
        WarningPage,
        InputFemale,
        InputGender,
        myLanguage,
        InputEmail,
        InputName,
        YourScore,
        YourLevel,
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

export default Inputs



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
    if (password.length >= 1 && password.length <= 2) {
        setCheckStrong({ weak: true, good: false, strong: false })
    } else if (password.length >= 3 && password.length <= 5) {
        setCheckStrong({ weak: false, good: true, strong: true })
    } else if (password.length >= 6 && password.length <= 12) {
        setCheckStrong({ weak: false, good: false, strong: true })
    } else {
        setCheckStrong({ weak: true, good: false, strong: false })
    }
}



// check confirm Password
export const checkConfirmPassword = (confirmInputValue, setCheckStrongConfirm, password) => {
    if (confirmInputValue.length >= 1 && confirmInputValue.length <= 2) {
        setCheckStrongConfirm({ weakCon: true, goodCon: false, strongCon: false })
    } else if (confirmInputValue.length >= 3 && confirmInputValue.length <= 5) {
        setCheckStrongConfirm({ weakCon: false, goodCon: true, strongCon: false })
    } else if (confirmInputValue === password && confirmInputValue.length >= 6 && confirmInputValue.length <= 12) {
        setCheckStrongConfirm({ weakCon: false, goodCon: false, strongCon: true })
    } else {
        setCheckStrongConfirm({ weakCon: true, goodCon: false, strongCon: false })
    }
}


