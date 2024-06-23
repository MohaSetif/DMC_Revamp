import React, { useState, useEffect, useRef, FormEventHandler } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, ApplicationVerifier } from 'firebase/auth';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { z } from 'zod';

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

const schema = z.object({
  name: z.string().min(1, { message: "الاسم مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  password: z.string().min(8, { message: "كلمة السر يجب أن تكون 8 أحرف على الأقل" }),
  password_confirmation: z.string(),
  phone: z.string().regex(/^\+213[0-9]{9}$/, { message: "رقم الهاتف غير صالح" }), }).refine((data) => data.password === data.password_confirmation, {
  message: "كلمات السر غير متطابقة",
  path: ["password_confirmation"],
});

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
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
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

        // Validate the field
        const result = schema.safeParse({ ...data, [key]: value });
        if (!result.success) {
            const error = result.error.issues.find(issue => issue.path[0] === key);
            setFieldErrors(prev => ({ ...prev, [key]: error?.message || '' }));
        } else {
            setFieldErrors(prev => ({ ...prev, [key]: '' }));
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const result = schema.safeParse(data);
        if (!result.success) {
            const errors = result.error.issues.reduce((acc, issue) => {
                acc[issue.path[0] as keyof FormData] = issue.message;
                return acc;
            }, {} as Partial<Record<keyof FormData, string>>);
            setFieldErrors(errors);
            return;
        }

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
    
        <div className="min-h-screen text-right">
          <div className="container mx-auto p-4">
            <div className="max-w-5xl mx-auto rounded-lg overflow-hidden mb-8">
              <div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 shadow-md">
                {/* Stepper */}
                <div className="flex mb-8 flex-row-reverse">
                  <div className={`flex-1 text-center ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 dark:border-blue-400 bg-blue-100 dark:bg-blue-900' : 'border-gray-300 dark:border-gray-600'}`}>
                      1
                    </div>
                    <div className="mt-2">المعلومات الشخصية</div>
                  </div>
                  <div className={`flex-1 text-center ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 dark:border-blue-400 bg-blue-100 dark:bg-blue-900' : 'border-gray-300 dark:border-gray-600'}`}>
                      2
                    </div>
                    <div className="mt-2">التحقق</div>
                  </div>
                </div>
    
                <form onSubmit={submit}>
                  {message.text && (
                    <div className={`alert alert-${message.type} mb-4`}>
                      {message.text}
                    </div>
                  )}
    
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <InputLabel htmlFor="email" value="البريد الإلكتروني" />
                      <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`mt-1 block w-full text-right ${fieldErrors.email ? 'border-red-500' : ''}`}
                        autoComplete="username"
                        onChange={handleChange}
                        required
                      />
                      <InputError message={fieldErrors.email} className="mt-2" />
                    </div>

                    <div>
                      <InputLabel htmlFor="name" value="اسم المستعمل" />
                      <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={`mt-1 block w-full ${fieldErrors.name ? 'border-red-500' : ''}`}
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleChange}
                        required
                      />
                      <InputError message={fieldErrors.name} className="mt-2" />
                    </div>

                    <div>
                      <InputLabel htmlFor="password_confirmation" value="تأكيد كلمة السر" />
                      <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={`mt-1 block w-full text-right ${fieldErrors.password_confirmation ? 'border-red-500' : ''}`}
                        autoComplete="new-password"
                        onChange={handleChange}
                        required
                      />
                      <InputError message={fieldErrors.password_confirmation} className="mt-2" />
                    </div>
    
                    <div>
                      <InputLabel htmlFor="password" value="كلمة السر" />
                      <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`mt-1 block w-full text-right ${fieldErrors.password ? 'border-red-500' : ''}`}
                        autoComplete="new-password"
                        onChange={handleChange}
                        required
                      />
                      <InputError message={fieldErrors.password} className="mt-2" />
                    </div>
    
                    <div className="md:col-span-2"> {/* Phone input spans both columns */}
                      <InputLabel htmlFor="phone" value="رقم الهاتف" />
                      <TextInput
                        id="phone"
                        type="text"
                        name="phone"
                        value={data.phone}
                        className={`mt-1 block w-full text-right ${fieldErrors.phone ? 'border-red-500' : ''}`}
                        onChange={handleChange}
                        required
                      />
                      <InputError message={fieldErrors.phone} className="mt-2" />
                      <div ref={recaptchaContainerRef} id="recaptcha-container"></div>
                      <br />
                      <PrimaryButton type="button" className="mt-4" onClick={phoneSendAuth}>
                        ارسال رمز التحقق
                      </PrimaryButton>
                    </div>
                  </div>
    
                  {step === 2 && (
                    <div className="mt-4">
                      <InputLabel htmlFor="verificationCode" value="رمز التحقق" />
                      <TextInput
                        id="verificationCode"
                        type="text"
                        value={verificationCode}
                        className="mt-1 block w-full text-right"
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                      />
                      <PrimaryButton type="button" className="mt-4" onClick={codeVerify}>
                        التحقق والتسجيل
                      </PrimaryButton>
                    </div>
                  )}
    
                  <div className="flex items-center justify-end mt-4">
                    <Link
                      href={route('login')}
                      className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                      لديك حساب من قبل؟
                    </Link>
                    <PrimaryButton className="mr-4 ml-4" disabled={processing}>
                      تسجيل
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </GuestLayout>
    );
}