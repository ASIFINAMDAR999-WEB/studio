
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Delete, Settings, ChevronDown, PhoneIncoming } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Modal } from '@/components/ui/modal';
import { cn } from '@/lib/utils';

/**
 * DialerScreen Component
 * This component provides a fully functional and animated dialer interface.
 * It appears after the user has successfully entered the access code.
 */
export function DialerScreen() {
  const [number, setNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Keypad button definitions
  const keypad = [
    { digit: '1', letters: '' }, { digit: '2', letters: 'ABC' }, { digit: '3', letters: 'DEF' },
    { digit: '4', letters: 'GHI' }, { digit: '5', letters: 'JKL' }, { digit: '6', letters: 'MNO' },
    { digit: '7', letters: 'PQRS' }, { digit: '8', letters: 'TUV' }, { digit: '9', letters: 'WXYZ' },
    { digit: '*', letters: '' }, { digit: '0', letters: '+' }, { digit: '#', letters: '' },
  ];

  /**
   * Handles button presses on the keypad.
   * Appends the pressed digit to the current number.
   */
  const handleKeyPress = (digit: string) => {
    if (number.length < 15) {
      setNumber(number + digit);
    }
  };

  /**
   * Handles the delete button action.
   * Removes the last digit from the number.
   */
  const handleDelete = () => {
    setNumber(number.slice(0, -1));
  };

  /**
   * Initiates a call.
   * On mobile, it uses the 'tel:' protocol.
   * On desktop, it shows a modal dialog.
   */
  const handleCall = () => {
    if (!number) return;
    setIsCalling(true);

    setTimeout(() => {
        // Check if running on a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `tel:${number}`;
      } else {
        setShowModal(true);
      }
      setNumber('');
      setIsCalling(false);
    }, 1500); // Simulate call initiation
  };

  // --- Animation Variants for Framer Motion ---
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.div
        className="w-full max-w-sm mx-auto p-4 flex flex-col h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Header Panels --- */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-4">
          {/* Caller ID Panel */}
          <div className="bg-card/60 dark:bg-card/40 backdrop-blur-sm rounded-lg p-3 flex justify-between items-center shadow-md">
            <div className="text-sm">
              <p className="text-muted-foreground">Caller ID</p>
              <p className="font-bold text-foreground">"random"</p>
            </div>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </div>
          {/* Voice Panel */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-card/60 dark:bg-card/40 backdrop-blur-sm rounded-lg p-3 flex justify-between items-center shadow-md cursor-pointer">
                <div className="text-sm">
                  <p className="text-muted-foreground">Voice</p>
                  <p className="font-bold text-foreground">Disabled</p>
                </div>
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Male</DropdownMenuItem>
              <DropdownMenuItem>Female</DropdownMenuItem>
              <DropdownMenuItem>Robot</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* --- Number Display --- */}
        <motion.div variants={itemVariants} className="relative mb-4">
          <div className="absolute inset-0 bg-primary/10 rounded-xl blur-lg opacity-50"></div>
          <div className="relative bg-black/20 dark:bg-white/5 backdrop-blur-lg rounded-xl h-20 flex items-center justify-end p-4 text-4xl font-light tracking-wider text-foreground">
            {number || <span className="text-muted-foreground/50">Enter number</span>}
          </div>
        </motion.div>

        {/* --- Keypad --- */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 flex-grow">
          {keypad.map((key, i) => (
            <motion.button
              key={i}
              onClick={() => handleKeyPress(key.digit)}
              className="relative aspect-square rounded-full bg-card/60 dark:bg-card/40 backdrop-blur-sm shadow-inner-lg text-foreground transition-transform duration-100 ease-out active:scale-90"
              style={{ boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            >
              <span className="text-3xl font-light">{key.digit}</span>
              <p className="text-xs text-muted-foreground tracking-widest">{key.letters}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* --- Action Buttons (Call & Delete) --- */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mt-4">
          <div /> {/* Spacer */}
          <motion.button
            onClick={handleCall}
            disabled={!number || isCalling}
            className={cn(
                'relative aspect-square rounded-full transition-all duration-300 flex items-center justify-center',
                isCalling ? 'bg-blue-500 animate-ringing' : 'bg-green-500 hover:bg-green-600',
                'disabled:bg-gray-500 disabled:cursor-not-allowed'
            )}
            whileTap={{ scale: isCalling ? 1 : 0.95 }}
          >
            {isCalling ? (
                <PhoneIncoming className="h-8 w-8 text-white"/>
            ) : (
                <Phone className="h-8 w-8 text-white"/>
            )}
          </motion.button>
          <motion.button
            onClick={handleDelete}
            className="flex items-center justify-center text-muted-foreground"
            whileTap={{ scale: 0.9 }}
          >
            <Delete className="h-7 w-7" />
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* --- Desktop Modal --- */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Desktop Calling Unavailable"
        description="To make calls, please visit this page on a mobile device. This feature uses your phone's native calling functionality."
      />
    </>
  );
}
