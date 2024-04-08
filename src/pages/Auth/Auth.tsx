import { FC, FormEvent, useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { authApi } from '../../api/authApi.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {}

export const Auth: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [isEmailSend, setIsEmailSend] = useState(false);

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      authApi.authByToken(token).then(() => navigate('/'));
    }
  }, []);

  const handleEmailChange = (val: string) => {
    setIsValid(
      !!val
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
    );
    setEmail(val);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsValid(false);
    try {
      await authApi.authenticate(email);
      setIsEmailSend(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={'grid h-screen grid-cols-3'}>
      <div
        className={
          'col-start-1 col-end-4 flex items-center justify-center md:col-end-3'
        }
      >
        {isEmailSend ? (
          <div className={'text-2xl'}>
            Отправили ссылку на почту{' '}
            <span className={'font-bold'}>{email}</span>
          </div>
        ) : (
          <form
            className={'flex w-[320px] flex-col gap-6'}
            onSubmit={handleSubmit}
          >
            <Input
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder={'E-mail'}
            />
            <Button
              disabled={!isValid}
              className={'!bg-blue disabled:!bg-blue/60'}
              type={'submit'}
            >
              Вход
            </Button>
            <div className={'flex justify-between'}>
              <span>Ещё нет аккаунта?</span>
              <a
                className={'font-bold'}
                href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
              >
                Зарегистрируйтесь!
              </a>
            </div>
          </form>
        )}
      </div>
      <div className={'hidden basis-1/2 bg-green md:flex'} />
    </div>
  );
};
