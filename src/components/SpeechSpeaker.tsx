import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface SpeechSpeakerProps {
  textToSpeak: string;
  language?: Language;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SpeechSpeaker: React.FC<SpeechSpeakerProps> = ({
  textToSpeak,
  language = 'ta',
  label,
  size = 'md'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported by your browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.rate = language === 'ta' ? 0.9 : 0.95; // Slightly slower for clear regional vernacular pronunciation
    utterance.pitch = 1.0;

    // Try finding Indian/Tamil voice if available
    const voices = window.speechSynthesis.getVoices();
    if (language === 'ta') {
      const taVoice = voices.find(v => v.lang.includes('ta') || v.name.toLowerCase().includes('tamil'));
      if (taVoice) utterance.voice = taVoice;
    } else {
      const enInVoice = voices.find(v => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india'));
      if (enInVoice) utterance.voice = enInVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const buttonClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2'
  }[size];

  return (
    <button
      id={`speech-speaker-${Math.random().toString(36).substring(7)}`}
      type="button"
      onClick={handleSpeak}
      title={isPlaying ? "Stop Voice" : (language === 'ta' ? "தமிழில் கேட்க" : "Listen in Voice")}
      className={`inline-flex items-center rounded-lg font-medium transition-all shadow-xs ${buttonClasses} ${
        isPlaying
          ? 'bg-amber-500 text-white animate-pulse shadow-md'
          : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
      }`}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-white" />
          <span>{language === 'ta' ? 'நிறுத்து' : 'Stop'}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{label || (language === 'ta' ? 'குரலில் கேட்க' : 'Listen')}</span>
          <Sparkles className="w-3 h-3 text-emerald-600 opacity-70" />
        </>
      )}
    </button>
  );
};
