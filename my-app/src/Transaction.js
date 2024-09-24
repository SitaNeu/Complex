import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Transaction.css';

const BIN_ID = '66f307b4ad19ca34f8ac1cab'; // Your JSONBin ID
const API_KEY = '$2a$10$7mjT9aeQtxXINcc8zlRKKOplgg0buh0Py7aLGLuPMJjK.MME4zCnW'; // Replace with your API key

function Deposit({ onSubmit }) {
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');

    const handleDeposit = () => {
        onSubmit(accountNumber, parseFloat(amount)); // Ensure the amount is treated as a number
        resetFields();
    };

    const resetFields = () => {
        setAccountNumber('');
        setAmount('');
    };

    return (
        <div className="container my-4">
            <h2>Deposit</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Account Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleDeposit}>
                    Deposit
                </button>
                <button type="button" className="btn btn-secondary mx-2" onClick={resetFields}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

function Withdraw({ onSubmit }) {
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');

    const handleWithdraw = () => {
        onSubmit(accountNumber, parseFloat(amount)); // Ensure the amount is treated as a number
        resetFields();
    };

    const resetFields = () => {
        setAccountNumber('');
        setAmount('');
    };

    return (
        <div className="container my-4">
            <h2>Withdraw</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Account Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleWithdraw}>
                    Withdraw
                </button>
                <button type="button" className="btn btn-secondary mx-2" onClick={resetFields}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

function Transfer({ onSubmit }) {
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = () => {
        onSubmit(fromAccount, toAccount, parseFloat(amount)); // Ensure the amount is treated as a number
        resetFields();
    };

    const resetFields = () => {
        setFromAccount('');
        setToAccount('');
        setAmount('');
    };

    return (
        <div className="container my-4">
            <h2>Transfer</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">From Account Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fromAccount}
                        onChange={(e) => setFromAccount(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">To Account Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={toAccount}
                        onChange={(e) => setToAccount(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleTransfer}>
                    Transfer
                </button>
                <button type="button" className="btn btn-secondary mx-2" onClick={resetFields}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

function App() {
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState({});
    const [activeComponent, setActiveComponent] = useState(null);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                    headers: {
                        'X-Master-Key': API_KEY,
                        'X-Bin-Meta': 'false',
                    },
                });

                const { accounts: savedAccounts, transactions: savedTransactions } = response.data;
                setAccounts(savedAccounts || {});
                setTransactions(savedTransactions || []);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const saveTransactions = async (updatedAccounts, updatedTransactions) => {
        try {
            await axios.put(
                `https://api.jsonbin.io/v3/b/${BIN_ID}`,
                { accounts: updatedAccounts, transactions: updatedTransactions },
                {
                    headers: {
                        'X-Master-Key': API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error) {
            console.error('Error saving transactions:', error);
        }
    };

    const handleDeposit = async (accountNumber, amount) => {
        const finalAmount = (accounts[accountNumber] || 0) + amount;

        const newTransaction = {
            type: 'Deposit',
            accountNumber,
            amount,
            finalAmount,
            date: new Date().toISOString(),
            email: userEmail // Include user email
        };

        const updatedTransactions = [...transactions, newTransaction];
        const updatedAccounts = { ...accounts, [accountNumber]: finalAmount };

        setAccounts(updatedAccounts);
        setTransactions(updatedTransactions);
        await saveTransactions(updatedAccounts, updatedTransactions);
    };

    const handleWithdraw = async (accountNumber, amount) => {
        const finalAmount = (accounts[accountNumber] || 0) - amount;

        const newTransaction = {
            type: 'Withdraw',
            accountNumber,
            amount,
            finalAmount,
            date: new Date().toISOString(),
            email: userEmail // Include user email
        };

        const updatedTransactions = [...transactions, newTransaction];
        const updatedAccounts = { ...accounts, [accountNumber]: finalAmount };

        setAccounts(updatedAccounts);
        setTransactions(updatedTransactions);
        await saveTransactions(updatedAccounts, updatedTransactions);
    };

    const handleTransfer = async (fromAccount, toAccount, amount) => {
        const fromFinalAmount = (accounts[fromAccount] || 0) - amount;
        const toFinalAmount = (accounts[toAccount] || 0) + amount;

        const newTransaction = {
            type: 'Transfer',
            fromAccount,
            toAccount,
            amount,
            fromFinalAmount,
            toFinalAmount,
            date: new Date().toISOString(),
            email: userEmail // Include user email
        };

        const updatedTransactions = [...transactions, newTransaction];
        const updatedAccounts = { 
            ...accounts, 
            [fromAccount]: fromFinalAmount, 
            [toAccount]: toFinalAmount 
        };

        setAccounts(updatedAccounts);
        setTransactions(updatedTransactions);
        await saveTransactions(updatedAccounts, updatedTransactions);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    // Filter transactions for the currently signed-in user
    const userTransactions = transactions.filter(transaction => transaction.email === userEmail);

    return (
        <div className="container">
            <h1 className="my-4">Bank App</h1>
            <button className="btn btn-danger mb-4" onClick={handleLogout}>
                Logout
            </button>
            {activeComponent === 'Deposit' && (
                <Deposit onSubmit={handleDeposit} />
            )}
            {activeComponent === 'Withdraw' && (
                <Withdraw onSubmit={handleWithdraw} />
            )}
            {activeComponent === 'Transfer' && (
                <Transfer onSubmit={handleTransfer} />
            )}

            




            <div className="d-flex justify-content-between mb-4">
                <button className="btn btn-info" onClick={() => setActiveComponent('Deposit')}>
                    Deposit
                </button>
                <button className="btn btn-info" onClick={() => setActiveComponent('Withdraw')}>
                    Withdraw
                </button>
                <button className="btn btn-info" onClick={() => setActiveComponent('Transfer')}>
                    Transfer
                </button>
            </div>

            {/* Transactions Table */}
            <h2>User Transactions</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction Type</th>
                        <th>Account Number</th>
                        <th>Transaction Amount</th>
                        <th>Final Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {userTransactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{new Date(transaction.date).toLocaleString()}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.type === 'Transfer' ? transaction.fromAccount : transaction.accountNumber}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.type === 'Transfer' ? transaction.toFinalAmount : transaction.finalAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
