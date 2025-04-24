'use client';

import { useEffect } from 'react';
import AudioPlayer from './audio-player';
import Lyrics from './lyrics';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-bricolage',
});

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
const variants = {
    hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
    visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 },
};

const text = 'Happy Birthday!';

export default function Home() {
    const words = text.split(' ');

    useEffect(() => {
        function createConfettiPiece() {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = randomColor();

            const direction = Math.random() < 0.5 ? -1 : 1;
            const x = direction * (Math.random() * 700 + 100) + 'px';
            const y = -(Math.random() * 800 + 200) + 'px';

            confetti.style.setProperty('--x', x);
            confetti.style.setProperty('--y', y);
            confetti.style.left = '50%';
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.animation = `explode ${
                Math.random() * 1 + 1
            }s ease-out forwards`;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }

        function randomColor() {
            const colors = [
                '#FF4136',
                '#2ECC40',
                '#FFDC00',
                '#0074D9',
                '#B10DC9',
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        function explodeConfetti(count = 40) {
            for (let i = 0; i < count; i++) {
                setTimeout(createConfettiPiece, i * 15);
            }
        }

        explodeConfetti(300);
    }, []);

    return (
        <div className="overflow-auto">
            {/* Full-screen hero section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                className="flex flex-col justify-center items-center h-screen"
                transition={{ staggerChildren: 0.09 }}
            >
                <h1 className="mb-6 text-6xl font-semibold text-center md:text-7xl text-white">
                    {words.map((word, index) => (
                        <React.Fragment key={index}>
                            <motion.span
                                className="inline-block"
                                transition={transition}
                                variants={variants}
                            >
                                {word}
                            </motion.span>
                            {index < words.length - 1 && ' '}
                        </React.Fragment>
                    ))}
                </h1>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown size={50} />
                </div>
            </motion.div>

            <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-5 px-[20%] py-10 bg-black ${bricolage.className}`}
            >
                <div className="grid grid-cols-1 gap-4">
                    {' '}
                    <img
                        src="/happy-birthday.gif"
                        alt="Happy birthday"
                        className="rounded-4xl"
                    />
                    <span className='flex bg-white text-center justify-center items-center rounded-4xl'>
                      <h1 className='text-black font-bold text-4xl md:text-6xl'>Happy Birthday!</h1>
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <AudioPlayer
                        audioUrl="https://cdn1.suno.ai/45c18199-e16f-4661-8afa-7a5454d1f5e3.mp3"
                        title="May the Lord Keep You"
                        shareUrl="https://www.suno.com/@wend"
                        className="https://www.suno.com/@wend"
                    />
                    <Lyrics />
                </div>
            </div>
        </div>
    );
}
