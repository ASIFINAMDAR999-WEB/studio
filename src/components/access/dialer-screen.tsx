

'use client';

import React, { useState, useRef, useEffect, ChangeEvent, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Settings, ChevronDown, X, Clock, History, Mic, MicOff, Volume2, Grid2x2, PhoneOff, Award, ContactRound, Mail, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { keypad } from '@/lib/data';
import { Label } from '../ui/label';
import { EmailSpoofScreen } from './email-spoof-screen';
import { SmsSpoofScreen } from './sms-spoof-screen';

type CallLog = {
  number: string;
  time: string;
};

type CallStatus = 'idle' | 'calling' | 'connected' | 'ended';

interface DialerScreenProps {
  planName: string;
}

/**
 * DialerScreen Component
 * This component provides a fully functional and animated dialer interface.
 * It appears after the user has successfully entered the access code.
 */
export const DialerScreen: React.FC<DialerScreenProps> = ({ planName }) => {
  const [number, setNumber] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dialer'); // 'dialer', 'history', 'email', 'sms'
  const [selectedVoice, setSelectedVoice] = useState('Disabled');
  const [callerId, setCallerId] = useState('');
  const [tempCallerId, setTempCallerId] = useState('');
  const [callHistory, setCallHistory] = useState<CallLog[]>([]);
  const [inCallDtmf, setInCallDtmf] = useState('');


  // In-call state
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [showInCallKeypad, setShowInCallKeypad] = useState(false);


  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const callIntervalRef = useRef<NodeJS.Timeout>();

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const savedCallerId = localStorage.getItem('callerId');
      const initialCallerId = savedCallerId || '+';
      setCallerId(initialCallerId);
      setTempCallerId(initialCallerId);

      const savedHistory = localStorage.getItem('callHistory');
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) {
            setCallHistory(parsedHistory);
          }
        } catch (e) {
          console.error("Failed to parse call history from localStorage", e);
          setCallHistory([]); // Fallback to an empty array
        }
      }
    } catch (error) {
      console.error("Failed to access localStorage", error);
    }
  }, []);


  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      if (callerId) {
        localStorage.setItem('callerId', callerId);
      }
    } catch (error) {
       console.error("Failed to save callerId to localStorage", error);
    }
  }, [callerId]);

  useEffect(() => {
    try {
      localStorage.setItem('callHistory', JSON.stringify(callHistory));
    } catch (error) {
      console.error("Failed to save call history to localStorage", error);
    }
  }, [callHistory]);


  // Effect for the call timer
  useEffect(() => {
    if (callStatus === 'connected') {
      callIntervalRef.current = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(callIntervalRef.current);
    }
    return () => clearInterval(callIntervalRef.current);
  }, [callStatus]);

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+*#]/g, '');
    if (value.length > 16) {
      setNumber(value.slice(0, 16));
    } else {
      setNumber(value);
    }
  };


  const handleKeyPress = (digit: string) => {
    if (number.length < 16) {
        setNumber((prev) => prev + digit);
    }
  };
  
  const handleInCallKeyPress = (digit: string) => {
    setInCallDtmf((prev) => prev + digit);
  };

  const handleDelete = () => {
    setNumber((prev) => prev.slice(0, -1));
  };

  const handlePressStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    longPressTimer.current = setTimeout(() => {
      setNumber('');
    }, 700);
  };
  
  const handlePressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleCall = () => {
    if (number.length <= 1) return;

    setCallStatus('calling');
    setShowInCallKeypad(false);
    setCallTimer(0);
    setInCallDtmf('');
    
    // Simulate connection time
    setTimeout(() => {
      setCallStatus('connected');
    }, 5000); // Ring for 5 seconds before "connecting"
  };

  const handleEndCall = () => {
    const newCall: CallLog = {
      number: number,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setCallHistory(prev => [newCall, ...prev]);
    setCallStatus('ended');
    
    setTimeout(() => {
        setNumber('');
        setCallStatus('idle');
    }, 1500);
  };
  
  const handleHistoryClick = (logNumber: string) => {
    setNumber(logNumber);
    setActiveTab('dialer');
  };


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleTempCallerIdChange = (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (value.toLowerCase() === 'random') {
        setTempCallerId('random');
        return;
      }
      
      const digits = value.replace(/[^\d+]/g, '');
      if (digits.length > 0 && !digits.startsWith('+')) {
        value = `+${digits.replace(/\+/g, '')}`;
      } else if (digits.startsWith('+')) {
        value = '+' + digits.slice(1).replace(/\+/g, '');
      } else {
        value = digits;
      }

      if (value.length <= 16) {
        setTempCallerId(value);
      }
  };

  const handleSaveSettings = () => {
    setCallerId(tempCallerId);
    setShowSettingsModal(false);
  };
  
  const handleCloseSettings = () => {
    setTempCallerId(callerId);
    setShowSettingsModal(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const InCallButton = ({ children, onClick, text, active, 'aria-label': ariaLabel }: { children: React.ReactNode, onClick?: () => void, text: string, active?: boolean, 'aria-label'?: string }) => (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        onClick={onClick}
        aria-label={ariaLabel || text}
        className={cn(
          "h-14 w-14 sm:h-16 sm:w-16 rounded-full flex items-center justify-center transition-colors duration-200 transform-gpu",
          active ? 'bg-white text-gray-800' : 'bg-white/10 hover:bg-white/20 text-white/80'
        )}
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.button>
      <span className='text-xs text-white/70'>{text}</span>
    </div>
  );
  
  const renderCallStatus = () => {
    if (callStatus === 'calling') return "Calling...";
    if (callStatus === 'connected') {
       if (inCallDtmf) {
        return inCallDtmf;
       }
       return formatTime(callTimer);
    }
    if (callStatus === 'ended') return "Call Ended";
    return "";
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dialer':
        return (
          <motion.div key="dialpad-view" role="tabpanel" id="dialpad-panel" aria-labelledby="dialpad-tab" variants={itemVariants} initial="hidden" animate="visible" exit="exit">
            <div className="relative mb-4">
               <label htmlFor="phone-number-input" className="sr-only">Phone Number</label>
              <Input
                id="phone-number-input"
                type="tel"
                value={number}
                onChange={handleNumberChange}
                className="bg-card rounded-xl h-14 w-full text-center p-4 text-2xl lg:text-3xl font-light tracking-wider text-foreground focus:outline-none focus:ring-0 border-none"
                placeholder="Enter number"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {keypad.map((key, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleKeyPress(key.digit)}
                  className="relative aspect-square rounded-xl bg-card text-foreground transition-colors duration-100 ease-out active:bg-muted transform-gpu flex flex-col items-center justify-center"
                  whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                  aria-label={`Dialpad key ${key.digit}${key.letters ? `, letters ${key.letters}` : ''}`}
                >
                  <span className="text-3xl font-semibold">{key.digit}</span>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase">{key.letters}</p>
                </motion.button>
              ))}

              <div /> 
              <motion.button
                onClick={handleCall}
                disabled={number.length <= 1}
                className={cn(
                    'relative aspect-square rounded-xl transition-all duration-300 flex items-center justify-center bg-green-500 text-white active:scale-95 transform-gpu',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
                     number.length > 1 && 'shadow-glow'
                )}
                whileTap={{ scale: 0.95 }}
                aria-label="Make call"
              >
                <Phone className="h-7 w-7"/>
              </motion.button>
              <motion.button
                onClick={handleDelete}
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                className="flex items-center justify-center text-muted-foreground bg-card rounded-xl active:bg-muted active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transform-gpu"
                whileTap={{ scale: 0.95 }}
                disabled={number.length === 0}
                aria-label="Delete last digit. Hold to clear all."
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.div>
        );
      case 'history':
        return (
          <motion.div key="history-view" role="tabpanel" id="history-panel" aria-labelledby="history-tab" variants={itemVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow flex flex-col bg-card rounded-xl p-4 space-y-2 overflow-y-auto max-h-[420px]">
              {callHistory.length > 0 ? (
                callHistory.map((log, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleHistoryClick(log.number)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted text-left w-full"
                    aria-label={`Call ${log.number}`}
                  >
                    <div className="flex items-center gap-3">
                      <History className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">{log.number}</p>
                        <p className="text-sm text-muted-foreground">Outgoing call</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.time}</p>
                  </button>
                ))
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">No Call History</h3>
                  <p className="text-muted-foreground mt-2">Your recent calls will appear here.</p>
                </div>
              )}
          </motion.div>
        );
      case 'email':
        return (
            <motion.div key="email-spoof-view" role="tabpanel" id="email-spoof-panel" aria-labelledby="email-spoof-tab" variants={itemVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow flex flex-col">
                <EmailSpoofScreen />
            </motion.div>
        );
      case 'sms':
        return (
            <motion.div key="sms-spoof-view" role="tabpanel" id="sms-spoof-panel" aria-labelledby="sms-spoof-tab" variants={itemVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow flex flex-col">
                <SmsSpoofScreen />
            </motion.div>
        );
      default:
        return null;
    }
  }


  return (
    <>
      <div className="w-full max-w-sm mx-auto p-2 sm:p-4 flex flex-col bg-background">
        <AnimatePresence mode="wait">
        {callStatus === 'idle' ? (
          <motion.div
            key="dialer"
            className="flex flex-col h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={itemVariants} className="text-center">
                <h1 className="text-2xl font-bold text-foreground">Client Access</h1>
                <div role="tablist" aria-label="Access Tools Navigation" className="flex justify-center gap-1 mt-4 mb-4 bg-muted p-1 rounded-lg">
                    <button 
                      role="tab"
                      aria-selected={activeTab === 'dialer'}
                      id="dialpad-tab"
                      aria-controls="dialpad-panel"
                      onClick={() => setActiveTab('dialer')}
                      className={cn(
                        "py-1.5 px-3 rounded-md text-sm font-semibold flex items-center gap-2 flex-1 justify-center transition-colors",
                        activeTab === 'dialer' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <Phone className="h-4 w-4"/>
                      Dialer
                    </button>
                    <button 
                      role="tab"
                      aria-selected={activeTab === 'history'}
                      id="history-tab"
                      aria-controls="history-panel"
                      onClick={() => setActiveTab('history')}
                      className={cn(
                        "py-1.5 px-3 rounded-md text-sm font-semibold flex items-center gap-2 flex-1 justify-center transition-colors",
                        activeTab === 'history' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <History className="h-4 w-4"/>
                      History
                    </button>
                    <button 
                      role="tab"
                      aria-selected={activeTab === 'email'}
                      id="email-spoof-tab"
                      aria-controls="email-spoof-panel"
                      onClick={() => setActiveTab('email')}
                      className={cn(
                        "py-1.5 px-3 rounded-md text-sm font-semibold flex items-center gap-2 flex-1 justify-center transition-colors",
                        activeTab === 'email' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <Mail className="h-4 w-4"/>
                      Email
                    </button>
                     <button 
                      role="tab"
                      aria-selected={activeTab === 'sms'}
                      id="sms-spoof-tab"
                      aria-controls="sms-spoof-panel"
                      onClick={() => setActiveTab('sms')}
                      className={cn(
                        "py-1.5 px-3 rounded-md text-sm font-semibold flex items-center gap-2 flex-1 justify-center transition-colors",
                        activeTab === 'sms' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <MessageSquare className="h-4 w-4"/>
                      SMS
                    </button>
                </div>
            </motion.div>

            {activeTab === 'dialer' && (
              <motion.div variants={itemVariants} className="bg-card rounded-xl p-4 space-y-3 mb-4">
                {planName && (
                  <div className="flex justify-between items-center text-sm border-b pb-3 mb-3">
                      <span className="text-muted-foreground flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Active Plan:
                      </span>
                      <span className="text-primary font-bold">{planName}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Caller ID: <span className="text-foreground font-semibold">{callerId || "Not set"}</span></span>
                  <button onClick={() => setShowSettingsModal(true)} aria-label="Open dialer settings">
                    <Settings className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span id="voice-changer-label" className="text-muted-foreground">Voice:</span>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 text-foreground font-semibold bg-muted px-3 py-1 rounded-md" aria-labelledby="voice-changer-label">
                              {selectedVoice}
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent aria-label="Voice changer options">
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Disabled')}>Disabled</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Male 1')}>Male 1</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Male 2')}>Male 2</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Male 3')}>Male 3</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Male 4')}>Male 4</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Male 5')}>Male 5</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Female 1')}>Female 1</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Female 2')}>Female 2</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Female 3')}>Female 3</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Female 4')}>Female 4</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Female 5')}>Female 5</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedVoice('Robot')}>Robot</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            )}

            <div className="flex-grow flex flex-col">
              <AnimatePresence mode="wait">
                {renderActiveView()}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
              key="in-call"
              className="flex flex-col h-full items-center justify-between transform-gpu"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
          >
              <div className="relative w-full flex-grow flex flex-col justify-between items-center p-6 bg-gradient-to-br from-gray-800 to-black text-white rounded-2xl shadow-2xl transform-gpu overflow-hidden">
                <AnimatePresence>
                  {callStatus === 'connected' && (
                    <motion.div
                      className="absolute inset-0 bg-black/20 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-1/2 w-0 h-0 rounded-full bg-primary/20 animate-ripple -z-10" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="text-center pt-8 relative">
                     {callStatus === 'connected' && <div className="absolute inset-0 -m-4 rounded-full border-2 border-primary/50 animate-pulse-ring -z-10" />}
                    <motion.h2 
                      className="text-3xl font-bold"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
                    >
                      {number}
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-white/70 mt-2 font-mono h-7"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                      aria-live="polite"
                    >
                      {renderCallStatus()}
                    </motion.p>
                </div>

                <div className="w-full max-w-xs">
                    <AnimatePresence>
                      {showInCallKeypad ? (
                          <motion.div
                            key="in-call-keypad"
                            className="w-full grid grid-cols-3 gap-2 sm:gap-3 mb-6"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                          >
                            {keypad.map((key, i) => (
                              <motion.button
                                key={i}
                                onClick={() => handleInCallKeyPress(key.digit)}
                                className="relative aspect-square rounded-full bg-white/10 hover:bg-white/20 text-white active:bg-white/30 transform-gpu transition-colors flex flex-col items-center justify-center"
                                whileTap={{ scale: 0.95 }}
                                aria-label={`Keypad ${key.digit}${key.letters ? `, letters ${key.letters}` : ''}`}
                              >
                                <span className="text-2xl sm:text-3xl font-semibold">{key.digit}</span>
                                {key.letters && <p className="text-[10px] sm:text-xs tracking-widest uppercase">{key.letters}</p>}
                              </motion.button>
                            ))}
                            <div/>
                            <div/>
                            <motion.button
                                onClick={() => setShowInCallKeypad(false)}
                                className="relative aspect-square rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transform-gpu"
                                whileTap={{ scale: 0.95 }}
                                aria-label="Hide keypad"
                              >
                                <ChevronDown className="w-6 h-6"/>
                              </motion.button>
                          </motion.div>
                      ) : (
                        <motion.div 
                          className="grid grid-cols-3 gap-x-4 sm:gap-x-6 w-full max-w-xs mx-auto mb-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                            <InCallButton onClick={() => setIsMuted(!isMuted)} active={isMuted} text={isMuted ? 'Unmute' : 'Mute'} aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}>
                              {isMuted ? <MicOff className="w-6 h-6"/> : <Mic className="w-6 h-6"/>}
                            </InCallButton>
                            <InCallButton onClick={() => setShowInCallKeypad(true)} text="Keypad" aria-label="Show keypad">
                              <Grid2x2 className="w-6 h-6"/>
                            </InCallButton>
                            <InCallButton onClick={() => setIsSpeaker(!isSpeaker)} active={isSpeaker} text="Speaker" aria-label={isSpeaker ? 'Turn off speaker phone' : 'Turn on speaker phone'}>
                              <Volume2 className="w-6 h-6"/>
                            </InCallButton>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
                
                <div className="flex justify-center w-full pb-8">
                  <motion.button
                      onClick={handleEndCall}
                      className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg active:scale-95 transform-gpu"
                      whileTap={{ scale: 0.9 }}
                      aria-label="End call"
                  >
                      <PhoneOff className="w-8 h-8" />
                  </motion.button>
                </div>
              </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      
      <Modal
          isOpen={showSettingsModal}
          onClose={handleCloseSettings}
          title="Dialer Settings"
      >
        <div className="space-y-6 pt-4">
            <div>
              <Label htmlFor="callerIdInput" className="text-sm font-medium text-foreground">
                  Caller ID
              </Label>
              <p className='text-xs text-muted-foreground mb-2'>Enter the ID to display. Type 'random' for a random number.</p>
              <div className="relative flex items-center group/input">
                <ContactRound className="absolute left-3 h-5 w-5 text-muted-foreground pointer-events-none transition-colors group-focus-within/input:text-primary" />
                <Input
                    id="callerIdInput"
                    type="text"
                    inputMode='tel'
                    value={tempCallerId}
                    onChange={handleTempCallerIdChange}
                    placeholder="e.g. 18001234567 or 'random'"
                    className="w-full pl-10 bg-background/50 border-muted-foreground/30 focus:border-primary"
                />
              </div>
            </div>
            <motion.div whileTap={{ scale: 0.97 }}>
                <Button onClick={handleSaveSettings} className="w-full text-base py-5">
                  Save
                </Button>
            </motion.div>
        </div>
      </Modal>
    </>
  );
};
