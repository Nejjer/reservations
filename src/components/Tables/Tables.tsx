import { FC, useEffect, useState } from 'react';
import PersonIcon from '../../icons/person.svg?react';
import CanIcon from '../../icons/can.svg?react';
import { Dialog } from '../Dialog';
import { EditTable } from '../EditTable';
import { CreateButton } from '../CreateButton';
import { ICreateTableDto, ITable, tablesApi } from '../../api/tableApi.ts';
import { ID } from '../../api/axiosInstance.ts';
import { useFetch } from '../../hooks/useFetch.ts';
import { Loading } from '../Loading';

interface Props {
  canEdit?: boolean;
  restaurantId: ID;
}

export const Tables: FC<Props> = ({ canEdit, restaurantId }) => {
  const [open, setOpen] = useState(false);

  const emptyTable = {
    places: [],
    reserveAll: false,
    title: '',
    restaurantId,
  };

  const [editableId, setEditableId] = useState(-1);

  const [editableTable, setEditableTable] =
    useState<ICreateTableDto>(emptyTable);

  const [loading, tables, fetchRestaurant] = useFetch<ITable[]>(async () => {
    return tablesApi.getTables(restaurantId);
  });

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantId]);

  useEffect(() => {
    if (editableId !== -1 && tables) {
      const table = tables?.find((table) => table.id === editableId);
      table && setEditableTable(table);
    }
  }, [editableId]);

  const handleUpdateCreateTable = async () => {
    if (editableId !== -1) {
      await tablesApi.updateTable(editableId, editableTable);
    } else {
      await tablesApi.createTable(editableTable);
    }
    setEditableId(-1);
    await fetchRestaurant();
  };

  const handleDeleteTable = async (id: ID) => {
    await tablesApi.deleteTable(id);
    await fetchRestaurant();
  };

  if (loading) {
    return <Loading className={'h-[560px] pt-5'} />;
  }

  return (
    <div className={'relative h-[560px]'}>
      <ul>
        {tables?.map((table) => (
          <li
            className={
              'flex cursor-pointer items-center border-b border-black px-4 py-2'
            }
            key={table.id}
            onClick={() => {
              setEditableId(table.id);
              setOpen(true);
            }}
          >
            <PersonIcon />
            <span className={'ml-1'}>{table.places.length}</span>
            <span className={'grow px-6'}>{table.title}</span>
            <CanIcon
              className={'cursor-pointer'}
              onClick={(e) => {
                handleDeleteTable(table.id);
                e.stopPropagation();
              }}
            />
          </li>
        ))}
      </ul>

      {canEdit && (
        <Dialog
          trigger={
            <CreateButton
              className={'absolute bottom-4 right-4'}
              onClick={() => setEditableTable(emptyTable)}
            />
          }
          title={'Создать'}
          onConfirm={handleUpdateCreateTable}
          onCancel={() => {
            setEditableTable(emptyTable);
            setEditableId(-1);
          }}
          open={open}
          onOpenChange={setOpen}
        >
          <EditTable
            table={editableTable}
            onEditTable={(table) => setEditableTable(table)}
          />
        </Dialog>
      )}
    </div>
  );
};
