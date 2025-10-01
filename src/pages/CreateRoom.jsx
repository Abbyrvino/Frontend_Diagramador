import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importar useNavigate y Link
import { createRoom } from '../services/api';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Para redirigir al usuario a la sala

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');  // Obtener token

    if (!token) {
      setError('No se ha encontrado el token. Por favor, inicia sesión.');
      return;
    }

    if (!roomName) {
      setError('Por favor, ingresa un nombre para la sala.');
      return;
    }

    try {
      const { data } = await createRoom(token, roomName);
      // Redirigir al usuario a la nueva sala usando el room_code
      navigate(`/room/${data.room_code}`);
    } catch (err) {
      console.error(err);
      setError('Error al crear la sala');
    }
  };

  return (
    <div className="bg-black text-white flex flex-col justify-center items-center h-screen w-screen">
      <a href="#" className="mb-4">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.042 21.672L13.684 16.6m0 0L11.174 18.825l.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
            </svg>
          </div>
          Diagramador de Clases Colaborativo
        </div>
      </a>

      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-lg rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">Crear Sala</h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Crea un espacio para colaborar con tu equipo en tiempo real 👌🏻.
            </p>
          </div>

          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              {/* Error */}
              {error && (
                <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* Nombre de la sala */}
              <div className="group relative rounded-lg border px-3 pb-1.5 pt-2.5">
                <label className="text-xs font-medium text-gray-400">Nombre de la sala</label>
                <input
                  type="text"
                  placeholder="Room Name"
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0 text-foreground"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Link to="/dashboard" className="text-sm font-medium text-foreground underline">
                  Volver al Dashboard
                </Link>
                <button
                  type="submit"
                  className="font-semibold hover:bg-white hover:text-black hover:ring hover:ring-black transition duration-300 inline-flex items-center justify-center rounded-md text-sm bg-cyan text-black px-4 py-2"
                >
                  Crear Sala
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
