import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

export const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'أهلاً بك! أنا مساعدك الذكي المتخصص في مناهج مدرسة المياه. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Use process.env.API_KEY directly as per senior engineer guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMsg,
        config: {
          systemInstruction: "أنت خبير في تكنولوجيا مياه الشرب والصرف الصحي بمدرسة مياه قنا. أجب باللغة العربية الفصحى وبشكل تعليمي تقني فقط بناءً على مناهج شبكات المياه والمحطات. إذا حدث خطأ في الاتصال، اطلب من المستخدم التحقق من شبكة الإنترنت."
        }
      });
      
      // Accessing the .text property directly as per Gemini API guidelines (not a method call)
      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from AI service.");
      }

      setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
    } catch (err: any) {
      console.error("AI Error:", err);
      const errorMsg = err.message?.includes('refused to connect') 
        ? 'فشل الاتصال بالخادم (Connection Refused). يرجى التأكد من استقرار الإنترنت وصلاحية مفتاح API.'
        : 'حدث خطأ تقني في معالجة طلبك. يرجى المحاولة مرة أخرى.';
      
      setError(errorMsg);
      setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[500px]">
      <div className="water-gradient p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">🤖</div>
          <span className="font-black text-sm">المساعد الذكي (Water AI)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></div>
          <span className="text-[10px] bg-sky-400/30 px-2 py-1 rounded-full border border-white/20">
            {isLoading ? 'جاري المعالجة...' : 'متصل'}
          </span>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
              m.role === 'user' 
                ? 'bg-sky-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs text-center font-bold">
            {error}
            <button onClick={handleSend} className="block mx-auto mt-2 text-rose-800 underline">إعادة المحاولة</button>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            placeholder="اسأل عن محطات المعالجة أو الشبكات..."
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-sky-500 transition-all outline-none disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="w-10 h-10 water-gradient text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
          >
            ➔
          </button>
        </div>
      </div>
    </div>
  );
};