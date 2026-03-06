import { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import CatAvatar from './CatAvatar';
import CatAnimation from './CatAnimation';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiBaseUrl = import.meta.env.VITE_DIFY_API_BASE_URL?.replace(/\/$/, '') || 'https://api.dify.ai/v1';
  const apiKey = import.meta.env.VITE_DIFY_API_KEY || '';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!apiKey) {
        throw new Error('Dify APIキーが設定されていません。.env に VITE_DIFY_API_KEY を設定してください。');
      }

      const response = await fetch(`${apiBaseUrl}/chat-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          query: input,
          user: 'user-default',
          conversation_id: conversationId || undefined,
          response_mode: 'blocking' as const,
          inputs: {},
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API エラー: ${response.status}`);
      }

      const data = await response.json();

      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer || 'すみません、応答できませんでした。',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorContent = error instanceof Error ? error.message : 'エラーが発生しました。もう一度お試しください。';
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorContent,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="w-12 h-12">
            <CatAvatar mood="happy" size="lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              ねこちゃんアシスタント
            </h1>
            <p className="text-sm text-amber-700">Powered by Dify</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-8">
                <CatAnimation mood="greeting" size="xl" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-3">
                こんにちは!
              </h2>
              <p className="text-lg text-slate-600 mb-2">
                ねこちゃんアシスタントです
              </p>
              <p className="text-slate-500">
                何かお手伝いできることはありますか?
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className="w-10 h-10 flex-shrink-0">
                  {message.role === 'user' ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <CatAvatar mood="neutral" size="md" />
                  )}
                </div>
                <div
                  className={`flex-1 max-w-2xl ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block px-5 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md'
                        : 'bg-gradient-to-br from-orange-100 to-amber-100 text-slate-800 shadow-sm border border-orange-200'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3 items-end">
              <div className="w-10 h-10">
                <CatAvatar mood="thinking" size="md" />
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 px-5 py-3 rounded-2xl shadow-sm border border-orange-200">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 bg-white rounded-2xl border-2 border-orange-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力..."
                className="w-full px-5 py-3 bg-transparent resize-none outline-none text-slate-800 placeholder-slate-400 max-h-32"
                rows={1}
                style={{
                  minHeight: '48px',
                  maxHeight: '128px',
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:from-slate-300 disabled:to-slate-300 text-white p-3 rounded-xl transition-all disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
