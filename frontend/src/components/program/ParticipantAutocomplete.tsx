'use client';

import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { getParticipants } from '@/src/services/users/userServiceClient';

interface ParticipantAutocompleteProps {
  onSelect: (selectedIds: string[]) => void;
  initialParticipants?: string[]; // Valores iniciales
}

export default function ParticipantAutocomplete({
  onSelect,
  initialParticipants = [],
}: Readonly<ParticipantAutocompleteProps>) {
  const [users, setUsers] = useState<{ _id: string; name: string; email: string }[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{ _id: string; name: string; email: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await getParticipants();
        setUsers(fetchedUsers);

        // Seleccionar automáticamente los usuarios iniciales
        const initialSelection = fetchedUsers.filter((user: { _id: string; name: string; email: string }) =>
          initialParticipants.includes(user._id)
        );
        setSelectedUsers(initialSelection);
        onSelect(initialParticipants); // Enviar los IDs iniciales
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleChange = (event: any, value: { _id: string; name: string; email: string }[]) => {
    setSelectedUsers(value);
    onSelect(value.map((user) => user._id)); // Enviar solo los IDs seleccionados
  };

  return (
    <div className='flex flex-col space-y-2'>
      <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
          Participantes (se pueden añadir mas tarde)
      </label>
        <Autocomplete
        id='participants'
        multiple
        options={users}
        getOptionLabel={(option) => option.email}
        value={selectedUsers}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        loading={loading}
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: 0,
            borderRadius: '0.375rem',
            backgroundColor: '#ffffff', // Fondo blanco, incluso sin selección
          },
          '& .MuiChip-root': {
            margin: '0.125rem', // Espaciado ajustado para los chips
          },
          '& .MuiAutocomplete-tag': {
            maxWidth: '100%', // Chips no se salen del contenedor
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm max-h-40 overflow-y-auto"
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Buscar usuarios"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
    
  );
}
