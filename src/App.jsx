import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RairSDK } from "@rair-protocol/sdk";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const settings = {
    serverURL: "http://35.226.25.117:5000",
    socketURL: "http://35.226.25.117:8080",
  };
  const rairSDK = new RairSDK(settings);

  console.log({ rairSDK });

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const { data } = await rairSDK.users.listUsers();
      console.log({ data });
      setUsers(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-white text-shadow">
        Users List
      </h1>
      <h3 className="text-md font-bold mb-12 text-gray-300">
        Rair Protocol SDK Example <a className='text-blue-300 underline hover:text-blue-500' href="https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?pli=1">need CORS unblocker</a>
      </h3>
      <main className='grid grid-cols-3 gap-4'>
        {loading ? (
          <div className="flex justify-center items-center col-span-3">
            <div className="w-8 h-8 border-4 border-white-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className='p-4 bg-white rounded-lg shadow-lg border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-xl antialiased'>

              <h2 className='text-purple-600 text-base font-bold'>{user.publicAddress !== user.nickName ? user.nickName : 'Anonymous'}</h2>
              <p className='text-sm text-gray-500'>{user.publicAddress}</p>
              {/* creation date e.g. 2024-06-28T06:10:07.998Z */}
              <p className='text-sm text-gray-500'>{user.createdAt}</p>
            </div>
          ))
        )}
      </main>
    </>
  )
}

export default App
