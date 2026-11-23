import React, { useEffect, useState } from 'react';
import { ScreenType, CheckInRecord, SupportRecord } from '../types';
import { api } from '../services/api';
import { Mail, Heart, CheckCircle2, RefreshCw } from 'lucide-react';

interface InboxScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const InboxScreen: React.FC<InboxScreenProps> = ({ onNavigate }) => {
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    const data = await api.fetchInbox();
    setCheckIns(data.checkIns || []);
    setSupportRequests(data.supportRequests || []);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleMarkRead = async (type: 'check_in' | 'support_request', id: string) => {
    await api.markAsRead(type, id);
    if (type === 'check_in') {
      setCheckIns(prev => prev.map(x => (x.id === id ? { ...x, is_read: true } : x)));
    } else {
      setSupportRequests(prev => prev.map(x => (x.id === id ? { ...x, is_read: true } : x)));
    }
  };

  const totalCount = checkIns.length + supportRequests.length;
  const unreadCount =
    checkIns.filter(x => !x.is_read).length + supportRequests.filter(x => !x.is_read).length;

  return (
    <div className="relative z-10 w-full flex flex-col items-center gap-7 px-4 sm:px-6 pt-6 pb-20 max-w-4xl mx-auto anim-welcome">
      {/* Back navigation */}
      <div className="w-full flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="font-sans text-[14px] text-[#c5a66a] hover:text-[#fff9ef] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>←</span>
          <span>Back to the little space</span>
        </button>

        <button
          onClick={loadMessages}
          className="text-[#c5a66a] hover:text-[#fff9ef] text-sm flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-2">
        <h2 className="font-garamond font-medium text-[36px] sm:text-[44px] text-[#fff9ef]">
          The Quiet Inbox
        </h2>
        <p className="font-sans text-[15px] text-[#b7b5c7] max-w-md">
          Heartfelt notes, thoughts, and support requests left for you by the person you care about.
        </p>
        <div className="flex gap-3 text-xs mt-1">
          <span className="px-3 py-1 rounded-full bg-[#25263f] text-[#c5a66a] border border-[#393a50]">
            {totalCount} Total Note{totalCount === 1 ? '' : 's'}
          </span>
          {unreadCount > 0 && (
            <span className="px-3 py-1 rounded-full bg-[#642f43] text-[#fff9ef]">
              {unreadCount} New
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-[#c5a66a] font-sans">Listening for gentle notes...</div>
      ) : totalCount === 0 ? (
        <div className="w-full bg-[#25263f]/80 border border-[#393a50] rounded-2xl p-12 text-center text-[#b7b5c7] flex flex-col items-center gap-3">
          <span className="text-4xl">🕯️</span>
          <p className="font-garamond text-2xl text-[#f1e6d0]">Quiet for now</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {/* Check-in Notes Section */}
          {checkIns.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="font-garamond text-2xl text-[#c5a66a] flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#c5a66a]" />
                <span>Check-in Notes</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {checkIns.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      item.is_read
                        ? 'bg-[#1e223f]/80 border-[#393a50] opacity-80'
                        : 'bg-[#25263f] border-[#c5a66a]/60 shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        {!item.is_read && (
                          <span className="w-2 h-2 rounded-full bg-[#c5a66a] animate-ping" />
                        )}
                        <span className="font-sans text-xs text-[#c5a66a] font-medium">
                          {item.ready_to_talk ? "Wanted to talk" : "Needed space / Not ready yet"}
                        </span>
                      </div>
                      <span className="font-sans text-xs text-[#b7b5c7]">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>

                    {item.message ? (
                      <p className="font-sans text-[15px] text-[#fff9ef] whitespace-pre-wrap leading-relaxed mt-2 bg-[#171b35]/60 p-4 rounded-xl border border-[#393a50]">
                        {item.message}
                      </p>
                    ) : (
                      <p className="font-sans text-xs text-[#b7b5c7] italic mt-1">
                        (Left blank — just wanted you to know they visited)
                      </p>
                    )}

                    <div className="flex justify-end mt-3">
                      {!item.is_read && (
                        <button
                          onClick={() => handleMarkRead('check_in', item.id)}
                          className="text-xs text-[#c5a66a] hover:text-[#fff9ef] flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark as read</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Support Requests Section */}
          {supportRequests.length > 0 && (
            <div className="flex flex-col gap-3 mt-4">
              <h3 className="font-garamond text-2xl text-[#c5a66a] flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#c5a66a]" />
                <span>Support Choices & Requests</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {supportRequests.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      item.is_read
                        ? 'bg-[#1e223f]/80 border-[#393a50] opacity-80'
                        : 'bg-[#25263f] border-[#c5a66a]/60 shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        {!item.is_read && (
                          <span className="w-2 h-2 rounded-full bg-[#c5a66a] animate-ping" />
                        )}
                        <span className="font-sans text-xs text-[#c5a66a] font-medium">
                          Support Request
                        </span>
                      </div>
                      <span className="font-sans text-xs text-[#b7b5c7]">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>

                    {item.choices && item.choices.length > 0 && (
                      <div className="flex flex-wrap gap-2 my-2.5">
                        {item.choices.map((choice, i) => (
                          <span
                            key={i}
                            className="text-xs bg-[#642f43] text-[#fff9ef] px-3 py-1 rounded-full font-sans"
                          >
                            {choice}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.specific_request && (
                      <div className="mt-2 bg-[#171b35]/60 p-4 rounded-xl border border-[#393a50]">
                        <span className="text-xs text-[#c5a66a] font-sans block mb-1">
                          Specific Note:
                        </span>
                        <p className="font-sans text-[15px] text-[#fff9ef] whitespace-pre-wrap leading-relaxed">
                          {item.specific_request}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end mt-3">
                      {!item.is_read && (
                        <button
                          onClick={() => handleMarkRead('support_request', item.id)}
                          className="text-xs text-[#c5a66a] hover:text-[#fff9ef] flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark as read</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
