import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';


// Add icons to library
library.add(faSun, faMoon);


const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute(
          'data-theme',
          isDarkMode ? 'dark' : 'light'
        );
    }, [isDarkMode]);

    const handleThemeSwitcher = () => setIsDarkMode(!isDarkMode);

    return (
        <div className='theme-wrap'>
            <FontAwesomeIcon icon={faSun} color={isDarkMode ? '#fff' : '#222325'} />
            <label className='theme-switcher' htmlFor='checkbox'>
                <input 
                    type='checkbox' 
                    id='checkbox' 
                    checked={isDarkMode} 
                    onChange={handleThemeSwitcher} 
                />
                <div className='slider-rounded'></div>
            </label>
            <FontAwesomeIcon icon={faMoon} color={isDarkMode ? '#fff' : '#222325'} />
        </div>
    );
};

export default ThemeSwitcher;