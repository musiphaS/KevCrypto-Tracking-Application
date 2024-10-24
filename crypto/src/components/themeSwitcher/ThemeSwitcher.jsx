import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // we use it for icons
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; // icons
import { useEffect, useState } from 'react';


const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(false); //track dark mode state 

    // update background when isDarkMode
    useEffect(() => {
        document.documentElement.setAttribute(
          'data-theme', 
          isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const handleThemeSwitcher = () => setIsDarkMode(!isDarkMode); //toggle effect

  return (
    <div className='theme-wrap'>
        <FontAwesomeIcon icon={faSun} color={isDarkMode ? '#fff' : '#222325'} />
        <label className='theme-switcher' htmlFor='checkbox'>
        <input type='checkbox' id='checkbox' checked={isDarkMode} onChange={handleThemeSwitcher} />
        <div className='slider-rounded'></div>
        </label>
        <FontAwesomeIcon icon={faMoon} color={isDarkMode ? '#fff' : '#222325'} />
    </div>
  )
}

export default ThemeSwitcher