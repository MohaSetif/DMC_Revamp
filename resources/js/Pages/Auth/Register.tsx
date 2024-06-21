import React, { useState, useEffect, useRef, FormEventHandler } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, ApplicationVerifier } from 'firebase/auth';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWHhwKe1YkF5Pr7yoZciQKfcM_jDmS85k",
  authDomain: "digital-med-care-6a485.firebaseapp.com",
  projectId: "digital-med-care-6a485",
  storageBucket: "digital-med-care-6a485.appspot.com",
  messagingSenderId: "944502771720",
  appId: "1:944502771720:web:1dc8550a173ea86c47c1bd",
  measurementId: "G-PZMGW94ZGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface FormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
}

interface Message {
  text: string;
  type: 'success' | 'error';
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '+213',
    });

    const [step, setStep] = useState<number>(1);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [message, setMessage] = useState<Message>({ text: '', type: 'success' });
    const [isRecaptchaRendered, setIsRecaptchaRendered] = useState(false);
    const recaptchaContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isRecaptchaRendered) {
            renderRecaptcha();
        }
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const renderRecaptcha = () => {
        if (!recaptchaContainerRef.current) return;

        try {
            const verifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
                'size': 'invisible',
                'callback': (response: string) => {
                    setIsRecaptchaRendered(true);
                },
                'expired-callback': () => {
                    setMessage({ text: "رمز التحقق انتهت صلاحيته. يرجى المحاولة مرة أخرى.", type: 'error' });
                    setIsRecaptchaRendered(false);
                    renderRecaptcha();
                }
            });
            setRecaptchaVerifier(verifier);
            verifier.render();
        } catch (error) {
            console.error('Error rendering reCAPTCHA:', error);
            setMessage({ text: "حدث خطأ أثناء تحميل reCAPTCHA. يرجى تحديث الصفحة والمحاولة مرة أخرى.", type: 'error' });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id as keyof FormData;
        const value = e.target.value;
        setData(key, value);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const phoneSendAuth = async () => {
        if (!recaptchaVerifier) {
            setMessage({ text: "يرجى الانتظار حتى يتم تحميل reCAPTCHA", type: 'error' });
            return;
        }

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, data.phone, recaptchaVerifier as ApplicationVerifier);
            setConfirmationResult(confirmationResult);
            setMessage({ text: "تم إرسال رمز التحقق بنجاح.", type: 'success' });
            setStep(2);
        } catch (error) {
            console.error('Error sending verification code:', error);
            setMessage({ text: 'حدث خطأ أثناء إرسال رمز التحقق. يرجى التحقق من رقم الهاتف والمحاولة مرة أخرى.', type: 'error' });
            setIsRecaptchaRendered(false);
            renderRecaptcha();
        }
    }

    const codeVerify = async () => {
        if (!confirmationResult) {
            setMessage({ text: "يرجى إرسال رمز التحقق أولاً", type: 'error' });
            return;
        }

        try {
            const result = await confirmationResult.confirm(verificationCode);
            setMessage({ text: "تم التحقق من الرمز بنجاح , الرجاء الضغط على تسجيل", type: 'success' });
            submitRegistrationForm(result.user.uid);
        } catch (error) {
            console.error('Error verifying code:', error);
            setMessage({ text: "رمز التحقق خاطئ. يرجى المحاولة مرة أخرى.", type: 'error' });
        }
    }

    const submitRegistrationForm = async (uid: string) => {
        const formData = { ...data, firebase_uid: uid };
        
        try {
            post(route('register'));
            // Handle successful registration (e.g., redirect to dashboard)
        } catch (error) {
            console.error('Error submitting registration form:', error);
            setMessage({ text: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.", type: 'error' });
        }
    }

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="formbold-main-wrapper">
                <div className="formbold-form-wrapper">
                    <form onSubmit={submit}>
                        <div className="formbold-steps">
                            <ul>
                                <li className={`formbold-step-menu1 ${step === 1 ? 'active' : ''}`}>
                                    <span>1</span>
                                    المعلومات الشخصية
                                </li>
                                <li className={`formbold-step-menu2 ${step === 2 ? 'active' : ''}`}>
                                    <span>2</span>
                                    التحقق
                                </li>
                            </ul>
                        </div>

                        {message.text && (
                            <div className={`alert alert-${message.type}`}>
                                {message.text}
                            </div>
                        )}

                        {step === 1 && (
                            <div id="sentCodeForm">
                                <div>
                                    <InputLabel htmlFor="name" value="اسم المستعمل" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="البريد الإلكتروني" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="كلمة السر" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password_confirmation" value="تأكيد كلمة السر" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="phone" value="رقم الهاتف" />
                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                    <div ref={recaptchaContainerRef} id="recaptcha-container"></div>
                                    <br />
                                    <PrimaryButton type="button" className="mt-4" onClick={phoneSendAuth}>
                                        ارسال رمز التحقق
                                    </PrimaryButton>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div id="verifyCodeForm">
                                <div className="mt-4">
                                    <InputLabel htmlFor="verificationCode" value="رمز التحقق" />
                                    <TextInput
                                        id="verificationCode"
                                        type="text"
                                        value={verificationCode}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        required
                                    />
                                    <PrimaryButton type="button" className="mt-4" onClick={codeVerify}>
                                        التحقق من الرمز
                                    </PrimaryButton>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        href={route('login')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        لديك حساب من قبل ؟
                                    </Link>

                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        تسجيل
                                    </PrimaryButton>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}