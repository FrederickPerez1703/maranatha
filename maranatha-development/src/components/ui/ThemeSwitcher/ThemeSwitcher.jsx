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
        border: '2px solid var(--color-primary)',
        background: theme === 'dark' ? 'rgba(255, 107, 157, 0.2)' : 'rgba(255, 107, 157, 0.1)',
        color: theme === 'dark' ? '#fff' : 'var(--color-gray-800)',
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
        padding: '6px 14px',
        borderRadius: '20px',
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)',
        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        color: theme === 'dark' ? 'var(--color-gray-300)' : 'var(--color-gray-700)',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
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
                    : (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)');
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = mobile
                    ? (theme === 'dark' ? 'rgba(255, 107, 157, 0.2)' : 'rgba(255, 107, 157, 0.1)')
                    : (theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)');
            }}
            title={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        >
            {theme === 'light' ? <Moon size={14} style={{ color: 'var(--color-primary)' }} /> : <Sun size={14} style={{ color: 'var(--color-primary)' }} />}
        </button>
    );
};

export default ThemeSwitcher;
