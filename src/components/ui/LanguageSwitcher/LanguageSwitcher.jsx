import { useLanguage } from '../../../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ mobile = false }) => {
    const { language, toggleLanguage } = useLanguage();

    // Estilos diferentes para móvil vs desktop
    const styles = mobile ? {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '20px',
        border: '2px solid #ff6b9d',
        background: 'rgba(255, 107, 157, 0.1)',
        color: '#333',
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
        marginLeft: '16px'
    };

    return (
        <button
            onClick={toggleLanguage}
            style={styles}
            onMouseOver={(e) => {
                e.currentTarget.style.background = mobile ? 'rgba(255, 107, 157, 0.2)' : 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = mobile ? 'rgba(255, 107, 157, 0.1)' : 'rgba(255, 255, 255, 0.1)';
            }}
        >
            <Globe size={16} />
            <span>{language === 'es' ? 'EN' : 'ES'}</span>
        </button>
    );
};

export default LanguageSwitcher;
