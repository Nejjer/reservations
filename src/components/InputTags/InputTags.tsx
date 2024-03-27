import { FC, useState } from 'react';
import { IconButton } from '../IconButton';
import { Input } from '../Input';

interface Props {}

export const InputTags: FC<Props> = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleClickAdd = () => {
    setTags([...tags, currentTag]);
    setCurrentTag('');
  };

  return (
    <div className={'flex items-center gap-2'}>
      <ul className={'flex h-11 gap-2.5 border border-black p-2'}>
        {tags.map((tag) => (
          <li className={'py bg-green px-2'}>{tag}</li>
        ))}
        <Input
          placeholder={'тег'}
          className={'h-7 w-20'}
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
        />
        <IconButton onClick={handleClickAdd}>+</IconButton>
      </ul>
    </div>
  );
};
