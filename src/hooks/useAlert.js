import { useState } from 'react';

const useAlert = () => {
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    };

    return [alert, showAlert];
};

export default useAlert;
