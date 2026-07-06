import { createContext, useContext, useState, useEffect } from 'react';
import { FEATURES as defaultFeatures } from '../config/featureFlags';

const FeatureFlagsContext = createContext();

export const useFeatureFlags = () => {
    const context = useContext(FeatureFlagsContext);
    if (!context) {
        throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
    }
    return context;
};

export const FeatureFlagsProvider = ({ children }) => {
    const [features, setFeatures] = useState(() => {
        try {
            const savedFeatures = localStorage.getItem('siteFeatures');
            return savedFeatures ? JSON.parse(savedFeatures) : defaultFeatures;
        } catch (error) {
            console.error('Error loading feature flags:', error);
            return defaultFeatures;
        }
    });

    useEffect(() => {
        localStorage.setItem('siteFeatures', JSON.stringify(features));
    }, [features]);

    const toggleFeature = (featureName) => {
        setFeatures(prev => ({
            ...prev,
            [featureName]: !prev[featureName]
        }));
    };

    const value = {
        features,
        toggleFeature
    };

    return (
        <FeatureFlagsContext.Provider value={value}>
            {children}
        </FeatureFlagsContext.Provider>
    );
};
