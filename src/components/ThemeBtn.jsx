import useTheme from './theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function ThemeBtn() {
    const { themeMode, lightTheme, darkTheme } = useTheme();

    const toggleTheme = () => {
        if (themeMode === 'dark') {
            lightTheme();
        } else {
            darkTheme();
        }
    };

    return (
        <button onClick={toggleTheme} className="text-2xl  rounded-full cursor-pointer transition">
            {themeMode === 'dark' ? (
                <FontAwesomeIcon icon={faSun} className="text-orange-500" />
            ) : (
                <FontAwesomeIcon icon={faMoon} className="text-gray-800" />
            )}
        </button>
    );
}
