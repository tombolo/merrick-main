import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './GlobalLoading.scss';
import LOGO from './Logo/NILOTE.png';

const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        // 15 second progress timer (150ms interval * 100 = 15000ms)
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 1;
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                }
                return newProgress;
            });
        }, 150);

        // Animated entrance
        setTimeout(() => {
            controls.start('visible');
        }, 300);

        return () => {
            clearInterval(progressInterval);
        };
    }, [controls]);

    return (
        <div className='global-loading'>
            {/* Animated particles background */}
            <div className='particles-bg'>
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='particle'
                        initial={{ 
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0
                        }}
                        animate={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* Hexagonal pattern overlay */}
            <div className='hex-pattern' />

            {/* Main content container */}
            <div className='loading-content'>
                {/* Brand Title with new style */}
                <motion.div
                    className='brand-title'
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            scale: 1,
                            rotateY: 0,
                            transition: {
                                duration: 1.2,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            },
                        },
                    }}
                >
                    <div className='title-container'>
                        <h1 className='brand-text'>MERRICK</h1>
                        <div className='title-glow' />
                        <div className='title-particles'>
                            {[...Array(8)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    className='title-particle'
                                    animate={{
                                        scale: [0, 1, 0],
                                        rotate: [0, 180, 360]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Logo section with new design */}
                <motion.div
                    className='logo-section'
                    initial={{ opacity: 0, y: 50, rotateX: -45 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            transition: {
                                duration: 0.8,
                                delay: 0.3,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            },
                        },
                    }}
                >
                    <div className='logo-container'>
                        <div className='logo-rings'>
                            <div className='ring ring-1' />
                            <div className='ring ring-2' />
                            <div className='ring ring-3' />
                        </div>
                        <div className='logo-glow' />
                        <img src={LOGO} alt='Logo' className='main-logo' />
                        <div className='logo-sparkles'>
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className='sparkle'
                                    animate={{
                                        scale: [0, 1, 0],
                                        rotate: [0, 180, 360]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.3
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* New progress visualization */}
                <motion.div
                    className='progress-section'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className='progress-container'>
                        <div className='progress-info'>
                            <span className='progress-label'>Initializing System</span>
                            <motion.span
                                className='progress-percentage'
                                animate={{
                                    textShadow: [
                                        '0 0 10px rgba(255, 255, 255, 0.5)',
                                        '0 0 20px rgba(255, 255, 255, 0.8)',
                                        '0 0 10px rgba(255, 255, 255, 0.5)'
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                            >
                                {progress}%
                            </motion.span>
                        </div>
                        
                        {/* Multi-layer progress bar */}
                        <div className='progress-multi'>
                            <div className='progress-bg' />
                            <motion.div
                                className='progress-fill-1'
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 15, ease: 'linear' }}
                            />
                            <motion.div
                                className='progress-fill-2'
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 15, ease: 'linear', delay: 0.1 }}
                            />
                            <motion.div
                                className='progress-fill-3'
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 15, ease: 'linear', delay: 0.2 }}
                            />
                        </div>

                        {/* Progress dots */}
                        <div className='progress-dots'>
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`dot ${progress >= (i + 1) * 5 ? 'active' : ''}`}
                                    animate={{
                                        scale: progress >= (i + 1) * 5 ? [1, 1.2, 1] : 1
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: i * 0.05
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Partnership text */}
                <motion.div
                    className='partnership-section'
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className='partnership-card'>
                        <div className='partnership-glow' />
                        <span className='partnership-label'>IN PARTNERSHIP WITH</span>
                        <span className='partnership-brand'>DERIV</span>
                    </div>
                </motion.div>
            </div>

            {/* Footer - Powered by Deriv */}
            <motion.div
                className='powered-footer'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
                <div className='powered-card'>
                    <div className='powered-glow' />
                    <span className='powered-text'>POWERED BY</span>
                    <span className='deriv-highlight'>DERIV</span>
                </div>
            </motion.div>
        </div>
    );
};

export default GlobalLoading;
