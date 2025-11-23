import { useTheme } from '../../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = ({ mobile = false }) => {
    const { theme, toggleTheme } = useTheme();

    // Estilos diferentes para móvil vs desktop
    const styles = mobile ? {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '20px',
        border: '2px solid #ff6b9d',
        background: theme === 'dark' ? 'rgba(255, 107, 157, 0.2)' : 'rgba(255, 107, 157, 0.1)',
        color: theme === 'dark' ? '#fff' : '#333',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        width: '100%',
        justifyContent: 'center'
    } : {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        marginLeft: '8px'
    };

    return (
        <button
            onClick={toggleTheme}
            style={styles}
            onMouseOver={(e) => {
                e.currentTarget.style.background = mobile
                    ? (theme === 'dark' ? 'rgba(255, 107, 157, 0.3)' : 'rgba(255, 107, 157, 0.2)')
                    : 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = mobile
                    ? (theme === 'dark' ? 'rgba(255, 107, 157, 0.2)' : 'rgba(255, 107, 157, 0.1)')
                    : 'rgba(255, 255, 255, 0.1)';
            }}
            title={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}

        </button>
    );
};

export default ThemeSwitcher;
