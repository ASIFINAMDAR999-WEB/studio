'use client';

import React, { useState, useRef, useEffect, ChangeEvent, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Settings, ChevronDown, X, Clock, History, Mic, MicOff, Volume2, Grid2x2, PhoneOff, Award, ContactRound, Mail, MessageSquare, Contact, Check, Copy, Eye, EyeOff, SquarePen, PhoneForwarded, Mails } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { BulkSpoofScreen } from './bulk-spoof-screen';
import { Separator } from '@/components/ui/separator';


type CallStatus = 'idle' | 'calling' | 'connected' | 'ended' | 'no-answer';

interface DialerScreenProps {
  planName: string;
}

const triggerHapticFeedback = (pattern: number | number[] = 5) => {
  if (typeof window !== 'undefined' && window.navigator && 'vibrate' in window.navigator) {
    try {
      window.navigator.vibrate(pattern);
    } catch (error) {
      console.log("Haptic feedback is disabled or not supported.");
    }
  }
};

export const DialerScreen: React.FC<DialerScreenProps> = ({ planName }) => {
  const [number, setNumber] = useState('');
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [showSipModal, setShowSipModal] = useState(false);
  const [showCallerIdModal, setShowCallerIdModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dialer');
  const [selectedVoice, setSelectedVoice] = useState('Disabled');
  const [callerId, setCallerId] = useState('');
  const [tempCallerId, setTempCallerId] = useState('');
  const [inCallDtmf, setInCallDtmf] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showSipCredentials, setShowSipCredentials] = useState(false);

  const [isCallForwardingEnabled, setIsCallForwardingEnabled] = useState(false);
  const [forwardingNumber, setForwardingNumber] = useState('');
  const [isTempCallForwardingEnabled, setIsTempCallForwardingEnabled] = useState(false);
  const [tempForwardingNumber, setTempForwardingNumber] = useState('');

  const [isBulkSendingEnabled, setIsBulkSendingEnabled] = useState(false);
  const [isTempBulkSendingEnabled, setIsTempBulkSendingEnabled] = useState(false);

  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [showInCallKeypad, setShowInCallKeypad] = useState(false);
  const { toast } = useToast();

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const callIntervalRef = useRef<NodeJS.Timeout>();
  const callSimulationTimeoutRef = useRef<NodeJS.Timeout>();
  const ringoutAudioRef = useRef<HTMLAudioElement>(null);
  const copyAudioRef = useRef<HTMLAudioElement>(null);
  const dtmfAudioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    const keyMap: { [key: string]: string } = {
        '1': '/1dtmf.mp3', '2': '/2dtmf.mp3', '3': '/3dtmf.mp3',
        '4': '/4dtmf.mp3', '5': '/5dtmf.mp3', '6': '/6dtmf.mp3',
        '7': '/7dtmf.mp3', '8': '/8dtmf.mp3', '9': '/9dtmf.mp3',
        '0': '/0dtmf.mp3', '*': '/stardtmf.mp3', '#': '/hashtagdtmf.mp3',
    };
    Object.entries(keyMap).forEach(([key, src]) => {
        const audio = new Audio(src);
        audio.preload = 'auto';
        dtmfAudioRefs.current[key] = audio;
    });
  }, []);

  const playDtmfSound = (key: string) => {
    const audio = dtmfAudioRefs.current[key];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  useEffect(() => {
    try {
      const savedCallerId = localStorage.getItem('callerId');
      const initialCallerId = savedCallerId || '+';
      setCallerId(initialCallerId);
      setTempCallerId(initialCallerId);

      const savedForwardingEnabled = localStorage.getItem('callForwardingEnabled') === 'true';
      const savedForwardingNumber = localStorage.getItem('forwardingNumber') || '';
      setIsCallForwardingEnabled(savedForwardingEnabled);
      setForwardingNumber(savedForwardingNumber);
      setIsTempCallForwardingEnabled(savedForwardingEnabled);
      setTempForwardingNumber(savedForwardingNumber);
      
      const savedBulkSendingEnabled = localStorage.getItem('bulkSendingEnabled') === 'true';
      setIsBulkSendingEnabled(savedBulkSendingEnabled);
      setIsTempBulkSendingEnabled(savedBulkSendingEnabled);

    } catch (error) {
      console.error("Failed to access localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (callerId) {
        localStorage.setItem('callerId', callerId);
      }
      localStorage.setItem('callForwardingEnabled', String(isCallForwardingEnabled));
      if (forwardingNumber) {
        localStorage.setItem('forwardingNumber', forwardingNumber);
      } else {
        localStorage.removeItem('forwardingNumber');
      }
      localStorage.setItem('bulkSendingEnabled', String(isBulkSendingEnabled));
    } catch (error) {
       console.error("Failed to save to localStorage:", error);
    }
  }, [callerId, isCallForwardingEnabled, forwardingNumber, isBulkSendingEnabled]);
  
    useEffect(() => {
        if (!isBulkSendingEnabled && activeTab === 'bulk') {
        setActiveTab('dialer');
        }
    }, [isBulkSendingEnabled, activeTab]);

  useEffect(() => {
    if (callStatus === 'connected') {
      clearInterval(callIntervalRef.current);
      ringoutAudioRef.current?.pause();
      if (ringoutAudioRef.current) ringoutAudioRef.current.currentTime = 0;

      callIntervalRef.current = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(callIntervalRef.current);
      if (callStatus !== 'calling') {
        ringoutAudioRef.current?.pause();
        if (ringoutAudioRef.current) ringoutAudioRef.current.currentTime = 0;
      }
    }
    return () => {
        clearInterval(callIntervalRef.current);
        clearTimeout(callSimulationTimeoutRef.current);
    };
  }, [callStatus]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (dtmfAudioRefs.current[event.key]) {
        playDtmfSound(event.key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+*#]/g, '');
    if (value.length > 16) {
      setNumber(value.slice(0, 16));
    } else {
      setNumber(value);
    }
  };

  const handleKeyPress = (digit: string) => {
    triggerHapticFeedback();
    playDtmfSound(digit);
    if (number.length < 16) {
        setNumber((prev) => prev + digit);
    }
  };
  
  const handleInCallKeyPress = (digit: string) => {
    triggerHapticFeedback();
    playDtmfSound(digit);
    setInCallDtmf(digit);
  
    let ivrMessage = '';
    switch (digit) {
      case '1': ivrMessage = 'IVR: Transferred to Sales.'; break;
      case '2': ivrMessage = 'IVR: Transferred to Support.'; break;
      case '3': ivrMessage = 'IVR: Your account balance is $100.00.'; break;
      case '4': ivrMessage = 'IVR: Returning to the main menu.'; break;
      case '0': ivrMessage = 'IVR: Connecting to an operator.'; break;
      default: ivrMessage = `IVR: Invalid option '${digit}'.`; break;
    }
  
    toast({ title: "IVR Response", description: ivrMessage });
  
    setTimeout(() => {
      if (callStatus === 'connected') {
        setInCallDtmf('');
      }
    }, 800);
  };

  const handleDelete = () => {
    triggerHapticFeedback();
    setNumber((prev) => prev.slice(0, -1));
  };

  const handlePressStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    longPressTimer.current = setTimeout(() => {
      setNumber('');
      triggerHapticFeedback([10, 50, 10]);
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
    triggerHapticFeedback(15);
    setCallStatus('calling');
    setShowInCallKeypad(false);
    setCallTimer(0);
    setInCallDtmf('');
    ringoutAudioRef.current?.play();
  };

  const handleEndCall = () => {
    triggerHapticFeedback(15);
    clearTimeout(callSimulationTimeoutRef.current);
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
      if (value.length <= 16) setTempCallerId(value);
  };

  const handleSaveCallerId = () => {
    setCallerId(tempCallerId);
    setShowCallerIdModal(false);
  };

  const handleOpenCallerIdModal = () => {
    setTempCallerId(callerId);
    setShowCallerIdModal(true);
  };

  const handleTempForwardingNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const digits = value.replace(/[^\d+]/g, '');
    if (digits.length > 0 && !digits.startsWith('+')) {
      value = `+${digits.replace(/\+/g, '')}`;
    } else if (digits.startsWith('+')) {
      value = '+' + digits.slice(1).replace(/\+/g, '');
    } else {
      value = digits;
    }
    if (value.length <= 16) setTempForwardingNumber(value);
  };
  
  const handleSaveFeatures = () => {
    setIsCallForwardingEnabled(isTempCallForwardingEnabled);
    setForwardingNumber(isTempCallForwardingEnabled ? tempForwardingNumber : '');
    setIsBulkSendingEnabled(isTempBulkSendingEnabled);
    setShowFeaturesModal(false);
  };
  
  const handleOpenFeaturesModal = () => {
    setIsTempCallForwardingEnabled(isCallForwardingEnabled);
    setTempForwardingNumber(forwardingNumber);
    setIsTempBulkSendingEnabled(isBulkSendingEnabled);
    setShowFeaturesModal(true);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    if (copyAudioRef.current) {
      copyAudioRef.current.currentTime = 0;
      copyAudioRef.current.play();
    }
    toast({ title: "Copied to clipboard", description: `${field} has been copied.` });
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };
  
  const toggleSipVisibility = () => setShowSipCredentials(prev => !prev);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };
  
  const InCallButton = ({ children, onClick, text, active, 'aria-label': ariaLabel }: { children: React.ReactNode, onClick?: () => void, text: string, active?: boolean, 'aria-label'?: string }) => (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        onClick={() => {
          triggerHapticFeedback();
          if(onClick) onClick();
        }}
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
    if (callStatus === 'connected') return inCallDtmf || formatTime(callTimer);
    if (callStatus === 'ended') return "Call Ended";
    if (callStatus === 'no-answer') return "No Answer";
    return "";
  };
  
  const sipCredentials = { username: 'user12345', password: 'Abcde12345@#', domain: 'sip.redarmor.net' };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dialer':
        return (
          <motion.div key="dialpad-view" role="tabpanel" variants={itemVariants} initial="hidden" animate="visible" exit="exit">
            <div className="relative mb-4">
              <Input
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
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.div>
        );
      case 'email': return <EmailSpoofScreen planName={planName} />;
      case 'sms': return <SmsSpoofScreen planName={planName} />;
      case 'bulk': return <BulkSpoofScreen planName={planName} />;
      default: return null;
    }
  }

  return (
    <>
      <audio ref={ringoutAudioRef} src="/ringout.mp3" preload="auto" loop className="hidden"></audio>
      <audio ref={copyAudioRef} src="/applepay.mp3" preload="auto" className="hidden"></audio>
      <div className="w-full max-w-sm mx-auto p-2 sm:p-4 flex flex-col bg-background">
        <AnimatePresence mode="wait">
        {callStatus === 'idle' ? (
          <motion.div key="dialer" className="flex flex-col h-full" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div variants={itemVariants} className="text-center">
                <h1 className="text-2xl font-bold text-foreground">Client Access</h1>
                <div className='flex justify-center items-center gap-2 mt-4 mb-4'>
                    <div role="tablist" className="flex justify-center gap-1 bg-muted p-1 rounded-lg">
                        {['dialer', 'email', 'sms', 'bulk'].map(tab => (
                            (tab !== 'bulk' || isBulkSendingEnabled) && (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={cn(
                                    "py-1.5 px-3 rounded-md text-sm font-semibold flex items-center gap-2 flex-1 justify-center transition-colors capitalize",
                                    activeTab === tab ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                                )}>
                                    {tab === 'dialer' && <Phone className="h-4 w-4"/>}
                                    {tab === 'email' && <Mail className="h-4 w-4"/>}
                                    {tab === 'sms' && <MessageSquare className="h-4 w-4"/>}
                                    {tab === 'bulk' && <Mails className="h-4 w-4"/>}
                                    {tab}
                                </button>
                            )
                        ))}
                    </div>
                    <button onClick={() => setShowSipModal(true)} className="p-2 bg-muted rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors">
                      <Contact className="h-5 w-5" />
                    </button>
                    <button onClick={handleOpenFeaturesModal} className="p-2 bg-muted rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors">
                      <Settings className="h-5 w-5" />
                    </button>
                </div>
            </motion.div>

            {activeTab === 'dialer' && (
              <motion.div variants={itemVariants} className="bg-card rounded-xl p-4 space-y-3 mb-4">
                {planName && (
                  <div className="flex justify-between items-center text-sm border-b pb-3 mb-3">
                      <span className="text-muted-foreground flex items-center gap-2"><Award className="h-4 w-4" /> Active Plan:</span>
                      <span className="text-primary font-bold">{planName}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Caller ID:</span>
                    <span className="text-foreground font-semibold">{callerId || "Not set"}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 group" onClick={handleOpenCallerIdModal}><SquarePen className="h-4 w-4 text-muted-foreground group-hover:text-primary" /></Button>
                </div>
                {isCallForwardingEnabled && forwardingNumber && (
                    <div className="flex justify-between items-center text-sm pt-3 border-t">
                        <span className="text-muted-foreground flex items-center gap-2"><PhoneForwarded className="h-4 w-4 text-green-500" /> Forwarding:</span>
                        <span className="text-green-500 font-bold">{forwardingNumber}</span>
                    </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-muted-foreground">Voice:</span>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 text-foreground font-semibold bg-muted px-3 py-1 rounded-md">
                              {selectedVoice}
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {['Disabled', 'Male 1', 'Male 2', 'Male 3', 'Female 1', 'Female 2', 'Female 3', 'Robot'].map(v => (
                            <DropdownMenuItem key={v} onSelect={() => setSelectedVoice(v)}>{v}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            )}
            <div className="flex-grow flex flex-col"><AnimatePresence mode="wait">{renderActiveView()}</AnimatePresence></div>
          </motion.div>
        ) : (
          <motion.div key="in-call" className="flex flex-col h-full items-center justify-between" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <div className="relative w-full flex-grow flex flex-col justify-between items-center p-6 bg-gradient-to-br from-gray-800 to-black text-white rounded-2xl shadow-2xl transform-gpu overflow-hidden">
                <div className="text-center pt-8">
                    <motion.h2 className="text-3xl font-bold" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{number}</motion.h2>
                    <motion.p className="text-lg text-white/70 mt-2 font-mono h-7">{renderCallStatus()}</motion.p>
                </div>
                <div className="w-full max-w-xs">
                    <AnimatePresence>
                      {showInCallKeypad ? (
                          <motion.div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
                            {keypad.map((key, i) => (
                              <motion.button key={i} onClick={() => handleInCallKeyPress(key.digit)} className="relative aspect-square rounded-full bg-white/10 hover:bg-white/20 text-white flex flex-col items-center justify-center">
                                <span className="text-2xl sm:text-3xl font-semibold">{key.digit}</span>
                              </motion.button>
                            ))}
                            <div/><div/>
                            <motion.button onClick={() => setShowInCallKeypad(false)} className="relative aspect-square rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"><ChevronDown className="w-6 h-6"/></motion.button>
                          </motion.div>
                      ) : (
                        <div className="grid grid-cols-3 gap-x-4 sm:gap-x-6 w-full max-w-xs mx-auto mb-8">
                            <InCallButton onClick={() => setIsMuted(!isMuted)} active={isMuted} text={isMuted ? 'Unmute' : 'Mute'}>{isMuted ? <MicOff className="w-6 h-6"/> : <Mic className="w-6 h-6"/>}</InCallButton>
                            <InCallButton onClick={() => setShowInCallKeypad(true)} text="Keypad"><Grid2x2 className="w-6 h-6"/></InCallButton>
                            <InCallButton onClick={() => setIsSpeaker(!isSpeaker)} active={isSpeaker} text="Speaker"><Volume2 className="w-6 h-6"/></InCallButton>
                        </div>
                      )}
                    </AnimatePresence>
                </div>
                <div className="flex justify-center w-full pb-8">
                  <motion.button onClick={handleEndCall} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg" whileTap={{ scale: 0.9 }}><PhoneOff className="w-8 h-8" /></motion.button>
                </div>
              </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      
      <Modal isOpen={showCallerIdModal} onClose={() => setShowCallerIdModal(false)} title="Edit Caller ID">
        <div className="space-y-6 pt-4">
            <div>
              <Label htmlFor="callerIdInput">Caller ID</Label>
              <p className='text-xs text-muted-foreground mb-2'>Enter the ID to display. Type 'random' for a random number.</p>
              <Input id="callerIdInput" inputMode='tel' value={tempCallerId} onChange={handleTempCallerIdChange} placeholder="e.g. 18001234567 or 'random'" className="pl-10" />
            </div>
            <Button onClick={handleSaveCallerId} className="w-full">Save</Button>
        </div>
      </Modal>

       <Modal isOpen={showFeaturesModal} onClose={() => setShowFeaturesModal(false)} title="Manage Features">
        <div className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div><Label>Call Forwarding</Label><p className='text-xs text-muted-foreground'>Forward incoming calls.</p></div>
                <Switch checked={isTempCallForwardingEnabled} onCheckedChange={setIsTempCallForwardingEnabled} className="data-[state=checked]:bg-green-500" />
              </div>
              <AnimatePresence>
                {isTempCallForwardingEnabled && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <Input value={tempForwardingNumber} onChange={handleTempForwardingNumberChange} placeholder="Enter forwarding number" className="pl-10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Bulk Messaging</Label><p className='text-xs text-muted-foreground'>Enable bulk email and SMS sending.</p></div>
              <Switch checked={isTempBulkSendingEnabled} onCheckedChange={setIsTempBulkSendingEnabled} className="data-[state=checked]:bg-green-500" />
            </div>
            <Button onClick={handleSaveFeatures} className="w-full">Save</Button>
        </div>
      </Modal>

      <Modal isOpen={showSipModal} onClose={() => setShowSipModal(false)} title="SIP Credentials">
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <Label>Show Credentials</Label>
              <Switch checked={showSipCredentials} onCheckedChange={toggleSipVisibility} className="data-[state=checked]:bg-green-500" />
          </div>
          {[ { label: 'Username', value: sipCredentials.username }, { label: 'Password', value: sipCredentials.password }, { label: 'Domain', value: sipCredentials.domain } ].map(({ label, value }) => (
            <div key={label}>
              <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input readOnly type="text" value={showSipCredentials ? value : '••••••••••••'} className={cn("font-mono", !showSipCredentials && "blur-[5px]")} />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(value, label)}><Copy className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
