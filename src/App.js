import './App.scss';
import { getAlbums, getUsers } from './api';
import { useEffect, useState } from 'react';
import { Posts } from './Posts';
import { Routes, Route, Link} from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '320px',
    height: '400px',
  },
};

Modal.setAppElement('#root');


function App() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(res => {
        setUsers(res);
        console.log(res)
      });
    getAlbums(selectedUserId)
      .then(res => {
        setAlbums(res);
      })
  }, [selectedUserId]);

  const selectUser = (id) => {
    setSelectedUserId(id);
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#000';
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
          <ul className='list' ref={(_subtitle) => (subtitle = _subtitle)}>
          {users.map(user => (
            <li className='list__item' key={user.id}>
              <span className='list__item-txt'>
                {user.name}
              </span>
              <Link 
                to='/posts' 
                onClick={() => {
                  selectUser(user.id);
                }}
                className='list__item-link'
              >
                Posts
              </Link>
              <button  
                onClick={() => {
                  selectUser(user.id);
                  openModal()
                }}
                className='list__item-link'
              >
                Albums
              </button>
            </li>
          ))}
        </ul>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ul className='list'>
          {albums.map(album => (
            <li key={album.id}>
              {album.title}
            </li>
          ))}
        </ul>
      </Modal>
          </>
        }>

        </Route>
        <Route 
          path='/posts' 
          element={<Posts selectedUserId={selectedUserId} />}
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
