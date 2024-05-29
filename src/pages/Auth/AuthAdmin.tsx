import { FC, FormEvent, useContext, useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { authApi } from '../../api/authApi.ts';
import { useNavigate } from 'react-router-dom';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { observer } from 'mobx-react';

interface Props {}

const AuthAdmin: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const {
    appStore: { toastStore, profileStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    authApi.authByPasswordAdmin(email, password).then(() => navigate('/'));
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
      await authApi.authByPasswordAdmin(email, password);
      profileStore.update();
      navigate('/admin/');
    } catch (e) {
      toastStore.showSnackBar('Не удалось войти');
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
        <form
          className={'flex w-[320px] flex-col gap-6'}
          onSubmit={handleSubmit}
        >
          <div className={'text-center text-2xl'}>Вход администратора</div>
          <Input
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder={'E-mail'}
            name={'email'}
            autoComplete={'email'}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'Пароль'}
            name={'password'}
            type={'password'}
            autoComplete={'current-password'}
          />
          <Button
            disabled={!isValid}
            className={'!bg-blue disabled:!bg-blue/60'}
            type={'submit'}
          >
            Вход
          </Button>
          <a href={'/authEmployee'}>Перейти на вход сотрудника</a>
          {/* <div className={'flex justify-between'}>
              <span>Ещё нет аккаунта?</span>
              <a
                className={'font-bold'}
                href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
              >
                Зарегистрируйтесь!
              </a>
            </div> */}
        </form>
      </div>
      <div className={'hidden basis-1/2 bg-green md:flex'} />
    </div>
  );
};

const connected = observer(AuthAdmin);
export { connected as AuthAdmin };
