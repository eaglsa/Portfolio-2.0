import { useState, useEffect } from 'react';

/**
 * Reusable typewriter hook optimized to prevent dropped initial characters.
 */
export default function useTypewriter(text, speed = 40, startDelay = 100) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // 1. Reset text immediately when changing views/text inputs
    setDisplayedText('');
    
    if (!text) return;

    let timer;

    const startTyping = () => {
      timer = setInterval(() => {
        setDisplayedText((currentValue) => {
          // 2. Use the actual length of what's on screen to find the next character
          const nextIndex = currentValue.length;
          
          if (nextIndex < text.length) {
            return currentValue + text.charAt(nextIndex);
          } else {
            clearInterval(timer);
            return currentValue;
          }
        });
      }, speed);
    };

    // 3. Apply the sleep grace period before execution begins
    const initialTimeout = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return displayedText;
}