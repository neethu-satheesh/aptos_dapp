import { useEffect, useState } from 'react';
import { Types, AptosClient } from 'aptos';

const useApp = () => {
  const [account, setAccount] = useState(null);
  const [accountFromClient, setAccountFromClient] = useState(null);
  const [message, setMessage] = useState(null);
  const [client, setClient] = useState(null);
  const [modules, setModules] = useState(null);
  const [messageResources, setMessageResources] = useState(null);

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    getAccountFromClient();
  }, [account]);

  useEffect(() => {
    if (client) getModule();
  }, [client]);

  useEffect(() => {
    if (modules) getMessageResource();
  }, [modules]);

  const getAccount = async () => {
    if (window && window.aptos) {
      console.log('window.aptos', window.aptos);
      try {
        const accountObj = await window.aptos.connect();
        console.log('accountObj', accountObj);
        if (accountObj) {
          setAccount(accountObj);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const accountObj = await window.aptos.account();
        console.log('accountObj', accountObj);
        if (accountObj) {
          setAccount(accountObj);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getAccountFromClient = async () => {
    const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');
    console.log('Aptos client');
    console.log(client);
    setClient(client);
    try {
      const accountObj = await client.getAccount(account?.address);
      console.log('accountObj from client', accountObj);
      if (accountObj) {
        setAccountFromClient(accountObj);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getModule = async () => {
    console.log('getModule');
    if (account) {
      const modulesObj = await client.getAccountModules(account?.address);
      console.log('modulesObj', modulesObj);
      if (modulesObj) {
        setModules(modulesObj);
      }
    }
  };

  const getMessageResource = async () => {
    console.log('getMessageResource');
    if (account) {
      const resourcesObj = await client.getAccountResources(account?.address);
      console.log('resourcesObj', resourcesObj);
      if (resourcesObj) {
        setMessageResources(resourcesObj);
      }
    }
  };

  const displayMessage = () => {
    if (messageResources) {
      const resourceType = `${account?.address}::message::MessageHolder`;
      const resource = messageResources.find((r) => r.type === resourceType);
      const data = resource?.data;
      const message = data?.message;
      return message;
    }
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit');
    e.preventDefault();
    console.log('event e');
    console.log(e);
    console.log('message');
    console.log(message);
    // if (!message) return;

    const transaction = {
      type: 'entry_function_payload',
      function: `${account?.address}::message::set_message`,
      arguments: [message],
      type_arguments: [],
    };

    try {
      const result = await window.aptos.signAndSubmitTransaction(transaction);
      console.log('result');
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    account,
    accountFromClient,
    handleSubmit,
    setMessage,
    modules,
    displayMessage,
  };
};

export default useApp;
