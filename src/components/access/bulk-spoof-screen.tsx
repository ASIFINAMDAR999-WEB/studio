'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Loader2, Award, Paperclip, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BulkSpoofScreenProps {
  planName: string;
}

function BulkEmailForm({ planName }: { planName: string }) {
    const [fromName, setFromName] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setAttachment(e.target.files[0]);
        } else {
          setAttachment(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('fromName', fromName);
        formData.append('fromEmail', fromEmail);
        formData.append('subject', subject);
        formData.append('message', message);
        // Here you would also handle recipients for the backend
        // For example: formData.append('recipients', recipients);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        // Simulate sending to multiple recipients.
        // In a real app, the backend would handle the loop.
        const recipientList = recipients.split('\n').filter(r => r.trim() !== '');

        // For UI simulation, we just show a pending state and then success.
        try {
            // Fake delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            toast({
                title: "Bulk Job Submitted",
                description: `Your email is being sent to ${recipientList.length} recipients.`,
            });
            // Clear the form on success
            setFromName('');
            setFromEmail('');
            setRecipients('');
            setSubject('');
            setMessage('');
            setAttachment(null);
            const fileInput = document.getElementById('bulk-attachment') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to submit bulk email job.",
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isFormInvalid = !fromName || !fromEmail || !recipients || !subject || !message;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="bulk-from-name">From Name</Label>
                    <Input id="bulk-from-name" placeholder="e.g., Marketing Dept" value={fromName} onChange={(e) => setFromName(e.target.value)} disabled={isLoading} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bulk-from-email">From Email (Reply-To)</Label>
                    <Input id="bulk-from-email" type="text" placeholder="e.g., news@example.com" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} disabled={isLoading} required />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bulk-email-recipients">Recipients</Label>
                <Textarea id="bulk-email-recipients" placeholder="One email address per line" className="min-h-[100px]" value={recipients} onChange={(e) => setRecipients(e.target.value)} disabled={isLoading} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bulk-subject">Subject</Label>
                <Input id="bulk-subject" placeholder="Our weekly newsletter" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={isLoading} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bulk-email-message">Message</Label>
                <Textarea id="bulk-email-message" placeholder="Type your bulk message here..." className="min-h-[120px]" value={message} onChange={(e) => setMessage(e.target.value)} disabled={isLoading} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bulk-attachment">Attachment (Optional)</Label>
                <div className="relative">
                    <Paperclip className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="bulk-attachment" type="file" onChange={handleFileChange} disabled={isLoading} className="pl-9" />
                </div>
            </div>
            <Button type="submit" className="w-full group" disabled={isLoading || isFormInvalid}>
                {isLoading ? ( <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting... </> ) : ( <> Send Bulk Email <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /> </> )}
            </Button>
        </form>
    );
}

function BulkSmsForm({ planName }: { planName: string }) {
    const [fromNumber, setFromNumber] = useState('');
    const [recipients, setRecipients] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const recipientList = recipients.split('\n').filter(r => r.trim() !== '');
        // Simulate API call
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "Success",
            description: `Your bulk SMS job for ${recipientList.length} recipients has been submitted.`,
          });
          setFromNumber('');
          setRecipients('');
          setMessage('');
        }, 2000);
    };

    const isFormInvalid = !fromNumber || !recipients || !message;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
             <div className="space-y-2">
                <Label htmlFor="bulk-from-number">From (Sender ID)</Label>
                <Input id="bulk-from-number" placeholder="Number or text (e.g. 'PROMO')" value={fromNumber} onChange={(e) => setFromNumber(e.target.value)} disabled={isLoading} type="text" required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bulk-sms-recipients">Recipients</Label>
                <Textarea id="bulk-sms-recipients" placeholder="One phone number per line" className="min-h-[100px]" value={recipients} onChange={(e) => setRecipients(e.target.value)} disabled={isLoading} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bulk-sms-message">Message</Label>
                <Textarea id="bulk-sms-message" placeholder="Type your bulk SMS here..." className="min-h-[120px]" value={message} onChange={(e) => setMessage(e.target.value)} disabled={isLoading} required/>
            </div>
            <Button type="submit" className="w-full group" disabled={isLoading || isFormInvalid}>
                {isLoading ? ( <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting... </> ) : ( <> Send Bulk SMS <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /> </> )}
            </Button>
        </form>
    );
}

export function BulkSpoofScreen({ planName }: BulkSpoofScreenProps) {
  return (
    <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
    >
        <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
            <CardTitle className="text-xl text-center">Bulk Messaging Tool</CardTitle>
            {planName && (
                <CardDescription className="text-center pt-2">
                    <div className="flex justify-center items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-primary" />
                        Active Plan:
                        <span className="text-primary font-bold">{planName}</span>
                    </div>
                </CardDescription>
            )}
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="bulk-email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="bulk-email"><Mail className="w-4 h-4 mr-2" />Bulk Email</TabsTrigger>
                    <TabsTrigger value="bulk-sms"><MessageSquare className="w-4 h-4 mr-2" />Bulk SMS</TabsTrigger>
                </TabsList>
                <TabsContent value="bulk-email">
                    <BulkEmailForm planName={planName} />
                </TabsContent>
                <TabsContent value="bulk-sms">
                    <BulkSmsForm planName={planName} />
                </TabsContent>
            </Tabs>
        </CardContent>
        </Card>
    </motion.div>
  );
}
