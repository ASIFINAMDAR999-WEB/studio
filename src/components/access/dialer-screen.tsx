
'use client';

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Settings, ChevronDown, X, Clock, History, Mic, MicOff, Volume2, Grid2x2, PhoneOff, Award, Music2, Music2Off } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Label } from '../ui/label';

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
  const [activeTab, setActiveTab] = useState('dialpad');
  const [selectedVoice, setSelectedVoice] = useState('Disabled');
  const [callerId, setCallerId] = useState('');
  const [callHistory, setCallHistory] = useState<CallLog[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // In-call state
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [showInCallKeypad, setShowInCallKeypad] = useState(false);


  const longPressTimer = useRef<ReturnType<typeof setTimeout>>();
  const callIntervalRef = useRef<NodeJS.Timeout>();
  const ringtoneRef = useRef<HTMLAudioElement>(null);

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const savedCallerId = localStorage.getItem('callerId');
      if (savedCallerId) {
        setCallerId(savedCallerId);
      } else {
        setCallerId('+');
      }
      
      const savedSoundEnabled = localStorage.getItem('soundEnabled');
      if (savedSoundEnabled) {
          setSoundEnabled(JSON.parse(savedSoundEnabled));
      }

      const savedHistory = localStorage.getItem('callHistory');
      if (savedHistory) {
        setCallHistory(JSON.parse(savedHistory));
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

  useEffect(() => {
    try {
        localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
    } catch (error) {
        console.error("Failed to save sound setting to localStorage", error);
    }
  }, [soundEnabled]);


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
    let value = e.target.value;
    const digits = value.replace(/[^\d+]/g, '');
    if (digits.length > 0 && !digits.startsWith('+')) {
      value = `+${digits.replace(/\+/g, '')}`;
    } else if (digits === '+') {
      value = '+';
    } else {
      value = digits;
    }
    
    if (value.length <= 16) {
      setNumber(value);
    }
  };


  const handleKeyPress = (digit: string) => {
    if (number.length < 16) {
      setNumber((prev) => (prev.length === 0 ? '+' : prev) + digit);
    }
  };

  const handleDelete = () => {
     setNumber((prev) => (prev.length > 1 ? prev.slice(0, -1) : ''));
  };

  const handlePressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setNumber('');
    }, 700);
  };
  
  const handlePressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const playRinging = () => {
    if (soundEnabled && ringtoneRef.current) {
      ringtoneRef.current.loop = true;
      ringtoneRef.current.play().catch(error => console.error("Ringtone play failed. Ensure the audio file exists and the format is supported.", error));
    }
  };

  const stopRinging = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  };


  const handleCall = () => {
    if (number.length <= 1) return;
    setCallStatus('calling');
    playRinging();
    setShowInCallKeypad(false);
    setCallTimer(0);
    
    // Simulate connection time
    setTimeout(() => {
      stopRinging();
      setCallStatus('connected');
    }, 5000); // Ring for 5 seconds before "connecting"
  };

  const handleEndCall = () => {
    stopRinging();
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleCallerIdChange = (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (value.toLowerCase() === 'random') {
        setCallerId('random');
        return;
      }
      const digits = value.replace(/[^\d+]/g, '');
      if (digits.length > 0 && !digits.startsWith('+')) {
        value = `+${digits.replace(/\+/g, '')}`;
      } else {
        value = digits;
      }

      if (value.length <= 16) {
        setCallerId(value);
      }
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

  const InCallButton = ({ children, onClick, text, active }: { children: React.ReactNode, onClick?: () => void, text: string, active?: boolean }) => (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        onClick={onClick}
        className={cn(
          "h-14 w-14 rounded-full flex items-center justify-center transition-colors duration-200",
          active ? 'bg-white text-gray-800' : 'bg-white/10 hover:bg-white/20 text-white/80'
        )}
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.button>
      <span className='text-xs text-white/70'>{text}</span>
    </div>
  );

  return (
    <>
      {soundEnabled && <audio ref={ringtoneRef} src="/audio/ringing.mp3" preload="auto" />}
      <div className="w-full h-full md:h-auto max-w-md mx-auto p-0 md:p-4 flex flex-col bg-background overflow-hidden flex-grow md:flex-grow-0">
        <AnimatePresence mode="wait">
        {callStatus === 'idle' ? (
          <motion.div
            key="dialer"
            className="flex flex-col h-full p-2 sm:p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={itemVariants} className="text-center md:flex-grow-0">
                <h1 className="text-2xl font-bold text-foreground">Make a call</h1>
                <div className="flex justify-center gap-2 mt-4 mb-6">
                    <button 
                      onClick={() => setActiveTab('dialpad')}
                      className={cn(
                        "py-2 px-4 rounded-lg text-sm font-semibold",
                        activeTab === 'dialpad' ? 'bg-muted text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      Dialpad
                    </button>
                    <button 
                      onClick={() => setActiveTab('history')}
                      className={cn(
                        "py-2 px-4 rounded-lg text-sm font-semibold",
                        activeTab === 'history' ? 'bg-muted text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      Call history
                    </button>
                </div>
            </motion.div>

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
                <button onClick={() => setShowSettingsModal(true)}>
                  <Settings className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Voice:</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 text-foreground font-semibold bg-muted px-3 py-1 rounded-md">
                            {selectedVoice}
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
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

            <div className="flex-grow flex flex-col">
              <AnimatePresence mode="wait">
                {activeTab === 'dialpad' ? (
                  <motion.div key="dialpad-view" variants={itemVariants} initial="hidden" animate="visible" exit="exit" className='flex flex-col flex-grow'>
                    <div className="relative mb-4">
                      <Input
                        type="tel"
                        value={number}
                        onChange={handleNumberChange}
                        className="bg-card rounded-xl h-14 w-full text-center p-4 text-2xl font-light tracking-wider text-foreground focus:outline-none focus:ring-0 border-none"
                        placeholder="Enter number"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3 flex-grow">
                      {keypad.map((key, i) => (
                        <motion.button
                          key={i}
                          onClick={() => handleKeyPress(key.digit)}
                          className="relative aspect-[4/3] sm:aspect-[3/2] rounded-xl bg-card text-foreground transition-colors duration-100 ease-out active:bg-muted"
                          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                        >
                          <span className="text-2xl font-semibold">{key.digit}</span>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase">{key.letters}</p>
                        </motion.button>
                      ))}

                      <div /> 
                      <motion.button
                        onClick={handleCall}
                        disabled={number.length <= 1}
                        className={cn(
                            'relative aspect-[4/3] sm:aspect-[3/2] rounded-xl transition-all duration-300 flex items-center justify-center bg-green-500 text-white active:scale-95',
                            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground'
                        )}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone className="h-6 w-6"/>
                      </motion.button>
                      <motion.button
                        onClick={handleDelete}
                        onMouseDown={handlePressStart}
                        onMouseUp={handlePressEnd}
                        onMouseLeave={handlePressEnd}
                        onTouchStart={handlePressStart}
                        onTouchEnd={handlePressEnd}
                        className="flex items-center justify-center text-muted-foreground bg-card rounded-xl active:bg-muted active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileTap={{ scale: 0.95 }}
                        disabled={number.length === 0}
                      >
                        <X className="h-6 w-6" />
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="history-view" variants={itemVariants} initial="hidden" animate="visible" exit="exit" className="flex-grow flex flex-col bg-card rounded-xl p-4 space-y-2">
                      {callHistory.length > 0 ? (
                        callHistory.map((log, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted">
                            <div className="flex items-center gap-3">
                              <History className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-semibold text-foreground">{log.number}</p>
                                <p className="text-sm text-muted-foreground">Outgoing call</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{log.time}</p>
                          </div>
                        ))
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center">
                          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-xl font-semibold text-foreground">No Call History</h3>
                          <p className="text-muted-foreground mt-2">Your recent calls will appear here.</p>
                        </div>
                      )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
              key="in-call"
              className="flex flex-col h-full w-full items-center justify-between flex-grow md:flex-grow-0 md:max-h-[85vh] md:max-w-sm"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
          >
              <div className="w-full flex-grow flex flex-col justify-between items-center p-6 bg-gradient-to-br from-gray-800 to-black text-white md:rounded-2xl shadow-2xl">
                <div className="text-center pt-8">
                    <motion.h2 
                      className="text-3xl font-bold"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
                    >
                      {number}
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-white/70 mt-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    >
                        {callStatus === 'calling' && "Calling..."}
                        {callStatus === 'connected' && formatTime(callTimer)}
                        {callStatus === 'ended' && "Call Ended"}
                    </motion.p>
                </div>

                <div className="w-full max-w-xs">
                    <AnimatePresence>
                      {showInCallKeypad ? (
                          <motion.div
                            key="in-call-keypad"
                            className="w-full grid grid-cols-3 gap-3 mb-6"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                          >
                            {keypad.map((key, i) => (
                              <motion.button
                                key={i}
                                className="relative aspect-square rounded-full bg-white/10 hover:bg-white/20 text-white"
                                whileTap={{ scale: 0.95 }}
                              >
                                <span className="text-2xl font-semibold">{key.digit}</span>
                                {key.letters && <p className="text-xs tracking-widest uppercase">{key.letters}</p>}
                              </motion.button>
                            ))}
                              <div />
                              <motion.button
                                onClick={() => setShowInCallKeypad(false)}
                                className="relative aspect-square rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                                whileTap={{ scale: 0.95 }}
                              >
                                <ChevronDown className="w-6 h-6"/>
                              </motion.button>
                              <div />
                          </motion.div>
                      ) : (
                        <motion.div 
                          className="grid grid-cols-3 gap-x-6 w-full max-w-xs mx-auto mb-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                            <InCallButton onClick={() => setIsMuted(!isMuted)} active={isMuted} text="Mute">
                              {isMuted ? <MicOff className="w-6 h-6"/> : <Mic className="w-6 h-6"/>}
                            </InCallButton>
                            <InCallButton onClick={() => setShowInCallKeypad(true)} text="Keypad">
                              <Grid2x2 className="w-6 h-6"/>
                            </InCallButton>
                            <InCallButton onClick={() => setIsSpeaker(!isSpeaker)} active={isSpeaker} text="Speaker">
                              <Volume2 className="w-6 h-6"/>
                            </InCallButton>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
                
                <div className="flex justify-center w-full pb-8">
                  <motion.button
                      onClick={handleEndCall}
                      className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg active:scale-95"
                      whileTap={{ scale: 0.9 }}
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
          onClose={() => setShowSettingsModal(false)}
          title="Dialer Settings"
      >
          <div className="space-y-6">
              <div>
                <Label htmlFor="callerIdInput" className="block text-sm font-medium text-muted-foreground mb-2">
                    Caller ID
                </Label>
                <Input
                    id="callerIdInput"
                    type="tel"
                    value={callerId}
                    onChange={handleCallerIdChange}
                    placeholder="+18001234567 or 'random'"
                    className="w-full"
                />
                 <p className='text-xs text-muted-foreground mt-2'>Enter the ID to display. Type 'random' for a random number.</p>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-3'>
                <Label htmlFor="sound-switch" className="flex items-center gap-2 font-medium text-foreground cursor-pointer">
                    {soundEnabled ? <Music2 className='h-4 w-4'/> : <Music2Off className='h-4 w-4'/>}
                    <span>Enable Ringing Sound</span>
                </Label>
                <Switch
                    id="sound-switch"
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                />
              </div>
          </div>
      </Modal>
    </>
  );
};
