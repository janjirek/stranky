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
    <div data-aos="fade-up">
      {/* Formulář */}
      <form className="mb-12" onSubmit={handleSubmit}>
        <div className="-my-6 divide-y divide-gray-100">
          
          {/* Skupina 1: Kontaktní údaje */}
          <div className="py-6">
            <div className="mb-5 text-lg font-bold text-gray-900">
              <span className="text-blue-600">1.</span> Uveďte své kontaktní údaje
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">
                    Jméno <span className="text-red-500">*</span>
                    </label>
                    <input
                    value={fname}
                    onChange={e => setFname(e.target.value)}
                    id="name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    type="text"
                    required
                    placeholder="Jan"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="surname">
                    Příjmení <span className="text-red-500">*</span>
                    </label>
                    <input
                    value={sname}
                    onChange={e => setSname(e.target.value)}
                    id="surname"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    type="text"
                    required
                    placeholder="Novák"
                    />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  type="email"
                  required
                  placeholder="jan.novak@email.cz"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="phone">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  id="phone"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  type="text"
                  required
                  placeholder="+420 777 777 777"
                />
              </div>
            </div>
          </div>

          {/* Skupina 2: Zpráva */}
          <div className="py-6">
            <div className="mb-5 text-lg font-bold text-gray-900">
              <span className="text-blue-600">2.</span> Zanechte svou zprávu
            </div>
            <div className="space-y-4">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-gray-700"
                  htmlFor="description"
                >
                  Zpráva <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  id="description"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  rows={4}
                  required
                  placeholder="Dobrý den, potřebuji pomoci s..."
                />
              </div>
            </div>
            
            <div className="mt-4">
                <TermsDialog
                termsTitle={termsTitle}
                triggerText="Odesláním dotazu souhlasím se zpracováním osobních údajů."
                >
                {children}
                </TermsDialog>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !formValidation()}
            >
              {isLoading ? 'Odesílám...' : 'Odeslat zprávu'}
            </button>

            {showSuccess && (
              <div className="flex items-center gap-3 text-green-700 mt-4 text-sm bg-green-50 p-4 rounded-xl border border-green-100">
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
                  className="shrink-0 text-green-500"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
                <span>Děkuji za zanechání Vaší zprávy, odpovím Vám v nejbližší možné době.</span>
              </div>
            )}
            {showError && (
              <div className="flex items-center gap-3 text-red-700 mt-4 text-sm bg-red-50 p-4 rounded-xl border border-red-100">
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
                  className="shrink-0 text-red-500"
                >
                  <path d="M20.5 14.9A9 9 0 0 0 9.1 3.5" />
                  <path d="m2 2 20 20" />
                  <path d="M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7" />
                </svg>
                <span>
                  Omlouváme se, ale došlo k problému při odesílání. Zkuste to prosím později nebo zavolejte.
                </span>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}