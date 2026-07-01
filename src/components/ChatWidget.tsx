'use client';
import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, X, Send, Bot, User, Sparkles, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const quickReplies = [
  'Book a consultation',
  'Office hours',
  'Practice areas',
  'Case status',
];

const initialMessages = [
  { role: 'assistant', content: 'Hello! I am AI Legal Assistant from Legacy Legal Partners. How can I help you today?' },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const content = (text || input).trim();
    if (!content) return;

    setMessages(prev => [...prev, { role: 'user', content }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responses: Record<string, string> = {
        'book a consultation': 'You can book a consultation directly from our website via the "Book Consultation" button, or call us at 1800-123-4567. Our team will schedule a meeting within 24 hours.',
        'office hours': 'Our office hours are Monday to Friday, 9:00 AM to 7:00 PM, and Saturday, 10:00 AM to 4:00 PM. We are closed on Sundays and public holidays.',
        'practice areas': 'We specialize in 11 practice areas including Corporate Law, Criminal Law, Civil Litigation, Divorce, Family Law, Property Law, Immigration, Tax Law, Intellectual Property, Startup Legal, and Consumer Law.',
        'case status': 'For case status inquiries, please log in to our Client Portal at legacylegal.in/portal or contact our support team directly.',
      };

      const matched = Object.entries(responses).find(([key]) =>
        content.toLowerCase().includes(key)
      );

      const reply = matched
        ? matched[1]
        : 'Thank you for your message. A legal expert will review it and get back to you shortly. For immediate assistance, please call us at 1800-123-4567.';

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 lg:bottom-6 right-6 z-50 w-14 h-14 bg-accent-500 text-white rounded-full shadow-lg shadow-accent-500/30 hover:bg-accent-600 transition-colors flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
            <motion.span
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 lg:bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-modal border border-gray-200/80 overflow-hidden"
          >
            <div className="bg-gradient-primary px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                >
                  <Bot className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <p className="text-white font-semibold text-sm">Legal Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <p className="text-white/70 text-xs">Online</p>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="h-[380px] overflow-y-auto p-4 space-y-3 bg-gray-50/80 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={cn('flex gap-2.5', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-primary-600" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-primary-500 text-white rounded-2xl rounded-tr-md shadow-sm'
                        : 'bg-white border border-gray-200/70 rounded-2xl rounded-tl-md text-gray-700 shadow-sm'
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-accent-100 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-accent-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="bg-white border border-gray-200/70 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1">
                      <motion.span className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                      <motion.span className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} />
                      <motion.span className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="pt-2"
                >
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Quick suggestions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickReplies.map((reply) => (
                      <motion.button
                        key={reply}
                        onClick={() => handleSend(reply)}
                        className="px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-full border border-primary-200/50 transition-colors"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Type your message..."
                  className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-gray-400"
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-button shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
