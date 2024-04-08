import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, IProfile } from '../../api/authApi.ts';
import { PATHS } from '../../utils/PATHS.ts';
import PersonIcon from '../../icons/person.svg?react';
import PhoneIcon from '../../icons/phone.svg?react';
import MailIcon from '../../icons/mail.svg?react';

interface Props {}

export const Profile: FC<Props> = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IProfile>();

  useEffect(() => {
    authApi
      .getProfile()
      .then((res) => setUser(res))
      .catch((e) => {
        console.error(e);
        navigate(`/${PATHS.auth}`);
      });
  }, []);

  if (!user) return;
  return (
    <div>
      <div className={'mb-4 mt-8'}>
        <h2 className={'text-3xl font-bold'}>Личный кабинет</h2>
      </div>
      <div className={'grid grid-cols-[auto_1fr] gap-8'}>
        <div className={'grid-cols-profileInfo grid gap-4 [&>*]:self-center'}>
          <PersonIcon />
          <p>{user.name}</p>
          <MailIcon />
          <p>{user.email}</p>
        </div>
        <div className={'grid-cols-profileInfo grid gap-4 [&>*]:self-end'}>
          <PhoneIcon />
          <p>{user.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};
