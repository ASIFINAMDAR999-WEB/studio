
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Settings, ChevronDown, X, Clock, History, Mic, MicOff, Volume2, Grid2x2, PhoneOff } from 'lucide-react';
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

type CallLog = {
  number: string;
  time: string;
};

type CallStatus = 'idle' | 'calling' | 'connected' | 'ended';

/**
 * DialerScreen Component
 * This component provides a fully functional and animated dialer interface.
 * It appears after the user has successfully entered the access code.
 */
export function DialerScreen() {
  const [number, setNumber] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dialpad');
  const [selectedVoice, setSelectedVoice] = useState('Disabled');
  const [callerId, setCallerId] = useState('random');
  const [callHistory, setCallHistory] = useState<CallLog[]>([]);

  // In-call state
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const longPressTimer = useRef<NodeJS.Timeout>();
  const callIntervalRef = useRef<NodeJS.Timeout>();

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedCallerId = localStorage.getItem('callerId');
    if (savedCallerId) {
      setCallerId(savedCallerId);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('callerId', callerId);
  }, [callerId]);

  // Effect for the call timer
  useEffect(() => {
    if (callStatus === 'connected') {
      callIntervalRef.current = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(callIntervalRef.current);
      setCallTimer(0);
    }
    return () => clearInterval(callIntervalRef.current);
  }, [callStatus]);

  const handleKeyPress = (digit: string) => {
    if (number.length < 15) {
      setNumber(number + digit);
    }
  };

  const handleDelete = () => {
    setNumber(number.slice(0, -1));
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

  const handleCall = () => {
    if (!number) return;
    setCallStatus('calling');
    
    // Simulate connection time
    setTimeout(() => {
      setCallStatus('connected');
    }, 2500);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    const newCall: CallLog = {
      number: number,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setCallHistory([newCall, ...callHistory]);
    setTimeout(() => {
        setNumber('');
        setCallStatus('idle');
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto p-4 flex flex-col h-full bg-background overflow-hidden">
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
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Caller ID: <span className="text-foreground font-semibold">{callerId}</span></span>
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

            {activeTab === 'dialpad' ? (
              <div className='flex flex-col flex-grow'>
                <motion.div variants={itemVariants} className="relative mb-4">
                  <div className="bg-card rounded-xl h-14 flex items-center justify-center p-4 text-lg font-light tracking-wider text-foreground">
                    {number || <span className="text-muted-foreground/80">Enter phone number</span>}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 flex-grow">
                  {keypad.map((key, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleKeyPress(key.digit)}
                      className="relative aspect-[3/2] rounded-xl bg-card text-foreground transition-colors duration-100 ease-out active:bg-muted"
                      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                    >
                      <span className="text-2xl font-semibold">{key.digit}</span>
                      <p className="text-xs text-muted-foreground tracking-widest uppercase">{key.letters}</p>
                    </motion.button>
                  ))}

                  <div /> 
                  <motion.button
                    onClick={handleCall}
                    disabled={!number}
                    className={cn(
                        'relative aspect-[3/2] rounded-xl transition-all duration-300 flex items-center justify-center bg-card active:bg-muted',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        number && 'animate-ringing'
                    )}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="h-6 w-6 text-green-500"/>
                  </motion.button>
                  <motion.button
                    onClick={handleDelete}
                    onMouseDown={handlePressStart}
                    onMouseUp={handlePressEnd}
                    onMouseLeave={handlePressEnd}
                    onTouchStart={handlePressStart}
                    onTouchEnd={handlePressEnd}
                    className="flex items-center justify-center text-muted-foreground bg-card rounded-xl active:bg-muted"
                    whileTap={{ scale: 0.95 }}
                    disabled={!number}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </motion.div>
              </div>
            ) : (
              <motion.div variants={itemVariants} className="flex-grow flex flex-col bg-card rounded-xl p-4 space-y-2">
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
          </motion.div>
        ) : (
          <motion.div
              key="in-call"
              className="flex flex-col items-center justify-between h-full w-full py-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
                <div className="text-center space-y-2">
                    <div className="relative inline-flex">
                        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                           <Phone className="h-10 w-10 text-foreground" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse-ring"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">{number}</h2>
                    <p className="text-lg text-muted-foreground">
                        {callStatus === 'calling' && 'Calling...'}
                        {callStatus === 'connected' && formatTime(callTimer)}
                        {callStatus === 'ended' && 'Call Ended'}
                    </p>
                </div>
                
                <div className="grid grid-cols-3 gap-8 w-full max-w-xs">
                    <button onClick={() => setIsMuted(!isMuted)} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground">
                        {isMuted ? <MicOff className="w-8 h-8"/> : <Mic className="w-8 h-8"/>}
                        <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                    </button>
                     <button className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Grid2x2 className="w-8 h-8"/>
                        <span>Keypad</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Volume2 className="w-8 h-8"/>
                        <span>Speaker</span>
                    </button>
                </div>

                <motion.button
                    onClick={handleEndCall}
                    className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                >
                    <PhoneOff className="w-10 h-10 text-white" />
                </motion.button>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      
      <Modal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          title="Change Caller ID"
      >
          <div className="space-y-4">
              <label htmlFor="callerIdInput" className="block text-sm font-medium text-muted-foreground">
                  Enter the new Caller ID you want to display.
              </label>
              <Input
                  id="callerIdInput"
                  type="text"
                  defaultValue={callerId}
                  placeholder="e.g., +18001234567"
                  onBlur={(e) => setCallerId(e.target.value || 'random')}
                  className="w-full"
              />
          </div>
      </Modal>
    </>
  );
}
