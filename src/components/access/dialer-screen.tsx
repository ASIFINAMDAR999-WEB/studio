
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Settings, ChevronDown, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Modal } from '@/components/ui/modal';
import { cn } from '@/lib/utils';
import { keypad } from '@/lib/data';

/**
 * DialerScreen Component
 * This component provides a fully functional and animated dialer interface.
 * It appears after the user has successfully entered the access code.
 */
export function DialerScreen() {
  const [number, setNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Ref to manage the long-press timer for the delete button.
  const longPressTimer = useRef<NodeJS.Timeout>();

  // Keypad button definitions are now imported from lib/data.ts

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
   * A single click removes the last digit.
   */
  const handleDelete = () => {
    setNumber(number.slice(0, -1));
  };

  /**
   * Handles the start of a press on the delete button (for long-press).
   * Sets a timer to clear the entire number after 700ms.
   */
  const handlePressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setNumber('');
    }, 700);
  };
  
  /**
   * Handles the end of a press on the delete button.
   * Clears the long-press timer to prevent it from firing on a short click.
   */
  const handlePressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
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
        className="w-full max-w-sm mx-auto p-4 flex flex-col h-full bg-background"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Make a call</h1>
            <div className="flex justify-center gap-2 mt-4 mb-6">
                <button className="bg-muted text-foreground py-2 px-4 rounded-lg text-sm font-semibold">Dialpad</button>
                <button className="text-muted-foreground py-2 px-4 rounded-lg text-sm font-semibold">Call history</button>
            </div>
        </motion.div>

        {/* --- Settings Area --- */}
        <motion.div variants={itemVariants} className="bg-card rounded-xl p-4 space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Caller ID: <span className="text-foreground font-semibold">random</span></span>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Voice:</span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 text-foreground font-semibold bg-muted px-3 py-1 rounded-md">
                        Disabled
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuItem>Male</DropdownMenuItem>
                <DropdownMenuItem>Female</DropdownMenuItem>
                <DropdownMenuItem>Robot</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* --- Number Display --- */}
        <motion.div variants={itemVariants} className="relative mb-4">
          <div className="bg-card rounded-xl h-14 flex items-center justify-center p-4 text-lg font-light tracking-wider text-foreground">
            {number || <span className="text-muted-foreground/80">Enter phone number</span>}
          </div>
        </motion.div>

        {/* --- Keypad --- */}
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

          {/* --- Action Buttons (Spacer, Call & Delete) --- */}
          <div /> {/* Spacer */}
          <motion.button
            onClick={handleCall}
            disabled={!number || isCalling}
            className={cn(
                'relative aspect-[3/2] rounded-xl transition-all duration-300 flex items-center justify-center',
                isCalling ? 'bg-blue-500' : 'bg-card',
                'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            whileTap={{ scale: isCalling ? 1 : 0.95 }}
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
            className="flex items-center justify-center text-muted-foreground bg-card rounded-xl"
            whileTap={{ scale: 0.95 }}
            disabled={!number}
          >
            <X className="h-6 w-6" />
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
