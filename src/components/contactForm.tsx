import { useState } from 'react';
import TermsDialog from './terms-dialog';
import emailjs from '@emailjs/browser';
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from './lib/utils';

interface ContactFormProps {
  termsTitle: string;
}

export default function ContactForm({
  termsTitle,
  children,
}: React.PropsWithChildren<ContactFormProps>) {
  const [fname, setFname] = useState<string>('');
  const [sname, setSname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var templateParams = {
      firstname: fname,
      surname: sname,
      email: email,
      phone: phone,
      message: message,
    };

    setIsLoading(true);
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      function (response) {
        if (response.status === 200) {
          setShowSuccess(true);
          setFname('');
          setSname('');
          setEmail('');
          setPhone('');
          setMessage('');
        } else {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 10000);
        }
        setIsLoading(false);
      },
      function (error) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 10000);
        setIsLoading(false);
      }
    );
  };

  const formValidation = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fname === '' || sname === '' || message === '' || !emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  return (
    <div data-aos="flip-left">
      {/* REMOVED HEADER - Handled by parent page layout now */}
      {/* But keeping it if this component is used standalone elsewhere, 
          though in your new layout it might duplicate the title "Napište mi zprávu".
          Let's check your layout. Your layout has <h3 class="text-2xl... Napište mi zprávu</h3>
          Then this component has <h1... Kontaktní Formulář</h1>.
          This results in double headers. 
          
          BETTER UX: I will comment out the header block below so it fits seamlessly 
          into your new modern layout.
      */}
      
      {/* <div className="mb-10">
        <h1 className="mb-2 font-inter text-4xl font-extrabold">Kontaktní Formulář</h1>
        <div className="text-gray-500">Máte zájem o mé služby? Neváhejte mě kontaktovat!</div>
      </div>
      */}

      {/* Form */}
      <form className="mb-12" onSubmit={handleSubmit}>
        <div className="-my-6 divide-y divide-gray-200">
          {/* Group #1 */}
          <div className="py-6">
            <div className="mb-5 text-lg font-bold text-gray-800">
              {/* FIXED CASING HERE */}
              <span className="text-blue-500">1.</span> Uveďte své kontaktní údaje
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="name">
                  Jméno <span className="text-red-500">*</span>
                </label>
                <input
                  value={fname}
                  onChange={e => setFname(e.target.value)}
                  id="name"
                  className="form-input w-full rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  required
                  placeholder="Jméno"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="surname">
                  Příjmení <span className="text-red-500">*</span>
                </label>
                <input
                  value={sname}
                  onChange={e => setSname(e.target.value)}
                  id="surname"
                  className="form-input w-full rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  required
                  placeholder="Příjmení"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="email"
                  className="form-input w-full rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                  type="email"
                  required
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="phone">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  id="phone"
                  className="form-input w-full rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  required
                  placeholder="Telefon"
                />
              </div>
            </div>
          </div>

          {/* Group #2 */}
          <div className="py-6">
            <div className="mb-5 text-lg font-bold text-gray-800">
              {/* FIXED CASING HERE */}
              <span className="text-blue-500">2.</span> Zanechte svou zprávu
            </div>
            <div className="space-y-4">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-gray-800"
                  htmlFor="description"
                >
                  Zpráva <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  id="description"
                  className="form-textarea w-full py-2 text-sm rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  required
                />
              </div>
            </div>
            <TermsDialog
              termsTitle={termsTitle}
              triggerText="Odesláním dotazu souhlasím se zpracováním osobních údajů pouze pro účely zpracování vašeho dotazu."
            >
              {children}
            </TermsDialog>
            <button
              type="submit"
              className="btn group bg-blue-600 text-white hover:bg-blue-700 mt-4 disabled:opacity-50 disabled:cursor-not-allowed w-full rounded-xl shadow-lg"
              disabled={isLoading || !formValidation()}
            >
              {isLoading ? 'Odesílám...' : 'Odeslat zprávu'}
            </button>
            {showSuccess && (
              <div className="flex items-center gap-2 text-green-500 mt-4 text-sm bg-green-100 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
                <span>Děkuji za zanechání Vaší zprávy, odpovím Vám v nejbližší možné době.</span>
              </div>
            )}
            {showError && (
              <div className="flex items-center gap-2 text-red-500 mt-4 text-sm bg-red-100 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="M20.5 14.9A9 9 0 0 0 9.1 3.5" />
                  <path d="m2 2 20 20" />
                  <path d="M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7" />
                </svg>
                <span>
                  Omlouváme se, ale došlo k problému při odesílání Vaší zprávy, zkuste to později nebo mě kontaktujte jinak.
                </span>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}