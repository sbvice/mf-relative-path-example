import { ComponentType, ReactElement, useCallback } from 'react';
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

enum Emoji {
  Shades = '😎',
  Poop ='💩',
  Unicorn = '🦄',
  Rainbow = '🌈'
}

interface ConfettiButtonProps {
  emojis: Emoji[];
  children: ReactElement;
}

const ConfettiButton: ComponentType<ConfettiButtonProps> = ({
    emojis,
    children,
}) => {
    const onClick = useCallback(() => {
        jsConfetti.addConfetti({
            emojis,
            emojiSize: 70,
            confettiNumber: 40,
        });
    }, [emojis]);

    return <button onClick={onClick}>{children}</button>;
}

export default ConfettiButton;
