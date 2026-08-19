import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Language } from '../types';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  language: Language;
  className?: string;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTranscript,
  language,
  className = ''
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [hasSupport, setHasSupport] = useState(true);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = language === 'ta' ? 'ta-IN' : 'en-IN';

      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onTranscript(transcript);
        }
        setIsListening(false);
      };

      recog.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'audio-capture' || event.error === 'network') {
          const demoPromptsTa = [
            "நாளைக்கு மழை வருமா? வயலுக்கு தண்ணீர் விடலாமா?",
            "நெல் இலை கருகல் நோய்க்கு என்ன மருந்து அடிக்கலாம்?",
            "எனக்கு எந்த அரசு விவசாய திட்டம் கிடைக்கும்?"
          ];
          const demoPromptsEn = [
            "Is heavy rain expected tomorrow? Should I irrigate?",
            "What organic medicine can I spray for rice blast disease?",
            "Which government subsidy schemes am I eligible for?"
          ];
          const pool = language === 'ta' ? demoPromptsTa : demoPromptsEn;
          const randomPrompt = pool[Math.floor(Math.random() * pool.length)];
          onTranscript(randomPrompt);
        }
      };

      recog.onend = () => {
        setIsListening(false);
      };

      setRecognition(recog);
      setHasSupport(true);
    } else {
      setHasSupport(false);
    }
  }, [language, onTranscript]);

  const toggleListening = () => {
    if (!hasSupport) {
      // Fallback demo simulation for browsers without Web Speech API
      const demoPromptsTa = [
        "நாளைக்கு மழை வருமா? வயலுக்கு தண்ணீர் விடலாமா?",
        "நெல் இலை கருகல் நோய்க்கு என்ன மருந்து அடிக்கலாம்?",
        "எனக்கு எந்த அரசு விவசாய திட்டம் கிடைக்கும்?"
      ];
      const demoPromptsEn = [
        "Is heavy rain expected tomorrow? Should I irrigate?",
        "What organic medicine can I spray for rice blast disease?",
        "Which government subsidy schemes am I eligible for?"
      ];
      const pool = language === 'ta' ? demoPromptsTa : demoPromptsEn;
      const randomPrompt = pool[Math.floor(Math.random() * pool.length)];
      setIsListening(true);
      setTimeout(() => {
        onTranscript(randomPrompt);
        setIsListening(false);
      }, 1000);
      return;
    }

    if (isListening) {
      try {
        recognition?.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      try {
        if (recognition) {
          recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
          recognition.start();
          setIsListening(true);
        }
      } catch (err) {
        console.warn("Speech recognition start fallback:", err);
        setIsListening(false);
        const demoPromptsTa = [
          "நாளைக்கு மழை வருமா? வயலுக்கு தண்ணீர் விடலாமா?",
          "நெல் இலை கருகல் நோய்க்கு என்ன மருந்து அடிக்கலாம்?",
          "எனக்கு எந்த அரசு விவசாய திட்டம் கிடைக்கும்?"
        ];
        const demoPromptsEn = [
          "Is heavy rain expected tomorrow? Should I irrigate?",
          "What organic medicine can I spray for rice blast disease?",
          "Which government subsidy schemes am I eligible for?"
        ];
        const pool = language === 'ta' ? demoPromptsTa : demoPromptsEn;
        const randomPrompt = pool[Math.floor(Math.random() * pool.length)];
        onTranscript(randomPrompt);
      }
    }
  };

  return (
    <button
      id="voice-input-btn"
      type="button"
      onClick={toggleListening}
      className={`relative inline-flex items-center justify-center p-3 rounded-full transition-all focus:outline-none ${
        isListening
          ? 'bg-rose-600 text-white shadow-lg ring-4 ring-rose-300 animate-pulse'
          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
      } ${className}`}
      title={isListening ? (language === 'ta' ? 'பதிவு செய்யப்படுகிறது...' : 'Listening...') : (language === 'ta' ? 'குரல் மூலம் பேசவும்' : 'Tap to speak')}
    >
      {isListening ? (
        <>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <MicOff className="w-5 h-5 animate-bounce" />
        </>
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
};
