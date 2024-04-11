import React from 'react';
import './Loading.scss';

interface LoadingProps {
    label: string;
}

const Loading: React.FC<LoadingProps> = ({ label }) => {
    return <div className="loadingContainer">{label}</div>;
};

export default Loading;
