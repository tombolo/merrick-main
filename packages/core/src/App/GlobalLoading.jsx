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
            {/* Animated gradient background */}
            <div className='gradient-bg'>
                <div className='gradient-orb orb-1' />
                <div className='gradient-orb orb-2' />
                <div className='gradient-orb orb-3' />
            </div>

            {/* Grid pattern */}
            <div className='grid-pattern' />

            {/* Main content container */}
            <div className='loading-content'>
                {/* Brand Title - MERRICK */}
                <motion.div
                    className='brand-title'
                    initial={{ opacity: 0, y: -30 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.8,
                                ease: [0.17, 0.67, 0.24, 0.99],
                            },
                        },
                    }}
                >
                    <h1 className='rugara-text'>MERRICK</h1>
                    <div className='subtitle-line' />
                </motion.div>

                {/* Logo section */}
                    <motion.div
                    className='logo-section'
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0.17, 0.67, 0.24, 0.99],
                            },
                        },
                    }}
                >
                    <div className='logo-container'>
                        <div className='logo-frame' />
                        <img src={LOGO} alt='Logo' className='main-logo' />
                    </div>
                </motion.div>

                {/* Modern loading bars */}
                <motion.div
                    className='loading-bars'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                            className='loading-bar'
                                animate={{
                                scaleY: [0.3, 1, 0.3],
                                }}
                                transition={{
                                duration: 1.2,
                                    repeat: Infinity,
                                delay: i * 0.2,
                                ease: 'easeInOut',
                                    }}
                                />
                            ))}
                </motion.div>

                {/* Progress section */}
                <motion.div
                    className='progress-section'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <div className='progress-info'>
                        <span className='progress-label'>Loading</span>
                        <motion.span
                            className='progress-percentage'
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                        >
                            {progress}%
                        </motion.span>
                    </div>
                    <div className='progress-track'>
                        <motion.div
                            className='progress-fill'
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 15, ease: 'linear' }}
                        >
                            <div className='progress-shimmer' />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Alternate circular progress style */}
                <motion.div
                    className='progress-alt'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <div className='progress-ring'>
                        <svg className='ring-svg' viewBox='0 0 120 120'>
                            <defs>
                                <linearGradient id='ringGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                                    <stop offset='0%' stopColor='#2dd4bf' />
                                    <stop offset='50%' stopColor='#22d3ee' />
                                    <stop offset='100%' stopColor='#f59e0b' />
                                </linearGradient>
                            </defs>
                            <circle className='ring-bg' cx='60' cy='60' r='52' />
                            <circle
                                className='ring-progress'
                                cx='60'
                                cy='60'
                                r='52'
                                style={{
                                    strokeDasharray: 2 * Math.PI * 52,
                                    strokeDashoffset: (1 - progress / 100) * (2 * Math.PI * 52),
                                }}
                            />
                        </svg>
                        <div className='ring-center'>
                            <span className='ring-label'>Preparing</span>
                            <span className='ring-value'>{progress}%</span>
                        </div>
                    </div>
                    <div className='progress-segments'>
                        {[...Array(12)].map((_, i) => (
                            <span
                                // eslint-disable-next-line react/no-array-index-key
                                key={i}
                                className={`seg ${progress >= ((i + 1) / 12) * 100 ? 'on' : ''}`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Partnership text */}
                <motion.div
                    className='partnership-section'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className='partnership-card'>
                        <span className='partnership-label'>IN PARTNERSHIP WITH</span>
                        <span className='partnership-brand'>DERIV</span>
                    </div>
                </motion.div>
            </div>

            {/* Footer - Powered by Deriv */}
            <motion.div
                className='powered-footer'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <div className='powered-card'>
                    <span className='powered-text'>POWERED BY</span>
                    <span className='deriv-highlight'>DERIV</span>
                </div>
            </motion.div>
        </div>
    );
};

export default GlobalLoading;
