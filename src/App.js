import logo from './logo.svg';
import './App.css';
import useApp from './useApp';

function App() {
  const {
    account,
    accountFromClient,
    modules,
    setMessage,
    handleSubmit,
    displayMessage,
  } = useApp();
  const moduleList = modules?.map((m) => m?.abi?.name);
  console.log('moduleList');
  console.log(moduleList);
  const message = displayMessage();
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Account: {account?.address}</p>

        <p>Account From Client: {accountFromClient?.authentication_key}</p>
        <p>Module: {moduleList?.join(', ')}</p>

        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>

        <form onSubmit={handleSubmit}>
          <p>On-chain message</p>
          <textarea onChange={(e) => setMessage(e.target.value)} />
          <input type='submit' />
        </form>

        <p>Message: {message}</p>
      </header>
    </div>
  );
}

export default App;
