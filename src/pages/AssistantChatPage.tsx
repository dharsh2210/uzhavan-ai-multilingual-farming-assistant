import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { VoiceInputButton } from '../components/VoiceInputButton';
import { SpeechSpeaker } from '../components/SpeechSpeaker';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Sprout
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  language: 'en' | 'ta';
  timestamp: string;
  sources?: string[];
}

export const AssistantChatPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: language === 'ta'
        ? `வணக்கம் ${user.name}! நான் உங்கள் உழவன் AI வேளாண்மை உதவியாளர். உங்கள் ${user.primaryCrop} பயிர், இன்றைய மழை முன்னறிவிப்பு, பூச்சி மருந்து அல்லது அரசு மானியங்கள் பற்றி எதையும் தமிழில் குரல் மூலமாகவோ அல்லது தட்டச்சு செய்தோ கேட்கலாம்.`
        : `Hello ${user.name}! I am your Uzhavan AI Agronomic Assistant. Feel free to ask any question about your ${user.primaryCrop} crop, rain forecasts, pest management, or government subsidies in English or Tamil.`,
      language: language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['TNAU Agritech Portal', 'IMD Agromet Advisory']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickFollowUps, setQuickFollowUps] = useState<{ label: string; query: string }[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickQuestions = language === 'ta'
    ? [
        { label: 'இன்று மருந்து அடிக்கலாமா?', query: 'இன்று மழை வருமா? பூச்சிக்கொல்லி மருந்து தெளிக்கலாமா?' },
        { label: 'நெல் இலை கருகல் மருந்து', query: 'நெல் பயிரில் இலை கருகல் நோய்க்கு என்ன இயற்கை மருந்து தெளிக்கலாம்?' },
        { label: '100% சொட்டுநீர் மானியம்', query: 'சிறு விவசாயிகளுக்கு 100% சொட்டுநீர் பாசன மானியம் பெறுவது எப்படி?' },
        { label: 'PM-KISAN ₹6,000 நிலை', query: 'PM கிசான் திட்டத்திற்கு என்னென்ன ஆவணங்கள் தேவை?' }
      ]
    : [
        { label: 'Safe to spray pesticide today?', query: 'Is it safe to spray pesticide on my crop today with the current weather forecast?' },
        { label: 'Bio-remedies for Rice Blast', query: 'What are the recommended biological remedies for Rice Blast disease?' },
        { label: '100% Drip Irrigation Subsidy', query: 'How can a small farmer get 100% subsidy for micro-irrigation in Tamil Nadu?' },
        { label: 'PM-KISAN Scheme checklist', query: 'What documents are required to apply for the PM-KISAN ₹6,000 scheme?' }
      ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isTyping) return;

    const userMsg: ChatMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text: textToSend,
      language: language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const res = await api.askAssistant(textToSend, language);

      const botMsg: ChatMessage = {
        id: 'msg-bot-' + Date.now(),
        sender: 'bot',
        text: res.response || (language === 'ta' ? 'மன்னிக்கவும், தகவலை பெற இயலவில்லை.' : 'Sorry, could not process request.'),
        language: res.language || language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: res.groundedSources || ['TNAU Agritech Portal', 'IMD Agromet Advisory']
      };

      setMessages(prev => [...prev, botMsg]);
      if (res.quickFollowUps) {
        setQuickFollowUps(res.quickFollowUps);
      }
    } catch (err) {
      console.error("AI Assistant chat failed:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      
      {/* Header Banner - Vibrant #1B4332 with Gold Accents */}
      <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-green-950 shadow-md">
            <Bot className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white">
              {language === 'ta' ? 'உழவன் AI விவசாய உதவியாளர்' : 'Uzhavan AI Farm Voice Assistant'}
            </h1>
            <p className="text-xs text-green-200 font-medium">
              {language === 'ta' ? 'தமிழ் & ஆங்கிலத்தில் பேசவும் கேட்கவும் செய்யலாம்' : 'Multilingual Voice & Text Agronomic Advisor'}
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right text-xs text-green-200 bg-green-950/60 border border-green-800/80 px-3 py-1.5 rounded-2xl">
          <span className="font-bold block text-white">{user.name} ({user.district})</span>
          <span>{user.primaryCrop} • {user.cropStage}</span>
        </div>
      </div>

      {/* Chat Messages Window */}
      <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-4 sm:p-6 min-h-[450px] max-h-[550px] overflow-y-auto flex flex-col space-y-4">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-full bg-yellow-400 text-green-950 flex items-center justify-center shrink-0 mt-0.5 shadow-xs font-black text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 shadow-2xs ${
                isBot
                  ? 'bg-[#F0F7F0] border border-green-200 text-green-950'
                  : 'bg-[#1B4332] text-white'
              }`}>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                  {msg.text}
                </p>

                {/* Bot Footer: Timestamp, TTS, and Sources */}
                {isBot && (
                  <div className="pt-2 border-t border-green-200/80 flex items-center justify-between gap-2 flex-wrap text-[11px] text-green-800">
                    <span className="text-[10px] font-semibold">{msg.timestamp}</span>

                    <div className="flex items-center gap-2">
                      {msg.sources && msg.sources.length > 0 && (
                        <span className="text-[10px] bg-green-200 text-green-900 px-2.5 py-0.5 rounded-full font-bold">
                          Grounded: {msg.sources[0]}
                        </span>
                      )}
                      <SpeechSpeaker
                        textToSpeak={msg.text}
                        language={msg.language}
                        size="sm"
                      />
                    </div>
                  </div>
                )}

                {!isBot && (
                  <div className="text-right text-[10px] text-green-200 font-semibold">
                    {msg.timestamp}
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-full bg-yellow-400 text-green-950 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs shadow-inner">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 text-green-950 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#F0F7F0] border border-green-200 rounded-2xl px-4 py-3 text-xs text-green-900 font-semibold flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-green-700" />
              <span>{language === 'ta' ? 'பரிந்துரையை தயார் செய்கிறது...' : 'Analyzing agronomic knowledge base...'}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips in Yellow/Green Aesthetic */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-extrabold text-green-900 uppercase tracking-wider block">
          {language === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்:' : 'Quick Suggested Questions:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {(quickFollowUps.length > 0 ? quickFollowUps : quickQuestions).map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q.query)}
              className="text-xs bg-white border border-green-200 hover:border-yellow-400 hover:bg-yellow-50 text-green-950 px-3.5 py-1.5 rounded-full font-bold transition-all shadow-2xs text-left"
            >
              💬 {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar with Voice Button & Gold Send Button */}
      <div className="bg-white border border-green-200 rounded-3xl p-3 shadow-md flex items-center gap-2.5">
        <VoiceInputButton
          language={language}
          onTranscript={(transcript) => {
            setInputQuery(transcript);
            handleSendMessage(transcript);
          }}
        />

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder={t.aiAssistant.inputPlaceholder}
          className="flex-1 text-xs sm:text-sm bg-transparent px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
        />

        <button
          type="button"
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isTyping}
          className="p-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-200 disabled:text-slate-400 text-green-950 font-black rounded-2xl transition-all shadow-md hover:scale-105"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
