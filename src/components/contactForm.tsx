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
      <div className="mb-10">
        <h1 className="mb-2 font-inter text-4xl font-extrabold">Kontaktní Formulář</h1>
        <div className="text-gray-500">Máte zájem o mé služby? Neváhejte mě kontaktovat!</div>
      </div>

      {/* Form */}
      <form className="mb-12" onSubmit={handleSubmit}>
        <div className="-my-6 divide-y divide-gray-200">
          {/* Group #1 */}
          <div className="py-6">
            <div className="mb-5 text-lg font-bold text-gray-800">
              <span className="text-blue-500">1.</span> Uveďte Své Kontaktní Údaje
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
                  className="form-input w-full"
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
                  className="form-input w-full"
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
                  className="form-input w-full"
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
                  className="form-input w-full"
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
              <span className="text-blue-500">2.</span> Zanechte Svou Zprávu
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
                  className="form-textarea w-full py-2 text-sm"
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
              className="btn group bg-blue-600 text-white hover:bg-blue-700 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !formValidation()}
            >
              {isLoading ? 'Odesílám...' : 'Odeslat'}
            </button>
            {showSuccess && (
              <div className="flex items-center gap-2 text-green-500 mt-4 text-sm bg-green-100 p-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-message-circle-plus-icon lucide-message-circle-plus"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
                Děkuji za zanechání Vaší zprávy, odpovím Vám v nejbližší možné době.
              </div>
            )}
            {showError && (
              <div className="flex items-center gap-2 text-red-500 mt-4 text-sm bg-red-100 p-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-message-circle-off-icon lucide-message-circle-off"
                >
                  <path d="M20.5 14.9A9 9 0 0 0 9.1 3.5" />
                  <path d="m2 2 20 20" />
                  <path d="M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7" />
                </svg>{' '}
                Omlouváme se, ale došlo k problému při odesílání Vaší zprávy, zkuste to později nebo
                mě kontaktujte prostřednictvím jiného kanálu.
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
