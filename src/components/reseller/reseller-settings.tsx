
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brush, Globe, SlidersHorizontal, Image as ImageIcon, Palette, Type } from 'lucide-react';
import { Switch } from '../ui/switch';
import { plans } from '@/lib/data';

const resellerPlans = plans.filter(p => !p.priceOptions && p.name !== 'Silver Plan').map(p => ({
    ...p,
    basePrice: parseFloat(p.priceString.replace('$', '')),
}));

export function ResellerSettings() {
  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-glow">
      <CardHeader>
        <CardTitle>Reseller Settings</CardTitle>
        <CardDescription>
          Customize your white-labeled service to match your brand.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="branding" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="branding"><Brush className="w-4 h-4 mr-2" />Branding</TabsTrigger>
            <TabsTrigger value="domain"><Globe className="w-4 h-4 mr-2" />Domain</TabsTrigger>
            <TabsTrigger value="pricing"><SlidersHorizontal className="w-4 h-4 mr-2" />Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="branding" className="space-y-6">
            <div className="p-6 border rounded-lg bg-background/50">
                <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="brandName">Brand Name</Label>
                        <Input id="brandName" placeholder="Your Brand Name" defaultValue="REDArmor 2.0" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="tagline">Brand Tagline</Label>
                        <Input id="tagline" placeholder="Your brand tagline" defaultValue="The Premier Solution for Secure Communications" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="relative">
                             <Palette className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="primaryColor" type="color" defaultValue="#601DE2" className="p-1 h-10 pl-9" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="fontFamily">Font</Label>
                        <div className="relative">
                             <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="fontFamily" placeholder="e.g., Poppins" defaultValue="Poppins" className='pl-9' />
                        </div>
                    </div>
                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="logo">Brand Logo</Label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="logo" type="file" className="pl-9" />
                        </div>
                    </div>
                </div>
                 <div className="mt-6 flex justify-end">
                    <Button>Save Branding</Button>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="domain" className="space-y-6">
            <div className="p-6 border rounded-lg bg-background/50">
                <h3 className="text-lg font-semibold mb-4">Custom Domain</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Point your domain to our servers to provide a fully white-labeled experience.
                </p>
                <div className="space-y-2">
                    <Label htmlFor="customDomain">Your Domain</Label>
                    <Input id="customDomain" placeholder="e.g., my.service.com" />
                </div>
                <div className="mt-4 p-4 bg-muted rounded-md text-sm">
                    <p className="font-semibold">Instructions:</p>
                    <p className="text-muted-foreground">
                    1. Go to your domain registrar (e.g., GoDaddy, Namecheap).
                    </p>
                    <p className="text-muted-foreground">
                    2. Create a CNAME record for your desired subdomain.
                    </p>
                    <p className="text-muted-foreground">
                    3. Point it to: <code className="bg-background px-1.5 py-0.5 rounded-sm font-mono text-primary">proxy.redarmor.net</code>
                    </p>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button>Verify & Save Domain</Button>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="pricing" className="space-y-6">
             <div className="p-6 border rounded-lg bg-background/50">
                <h3 className="text-lg font-semibold mb-4">Manage Pricing</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Set your own prices for the plans you offer. Your profit is the difference between your price and our base price.
                </p>
                <div className="space-y-4">
                    {resellerPlans.map(plan => (
                        <div key={plan.name} className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 p-3 bg-muted/50 rounded-md">
                           <div className="md:col-span-3 flex items-center justify-between">
                             <Label htmlFor={`plan-toggle-${plan.name}`} className="font-semibold">{plan.name}</Label>
                             <Switch id={`plan-toggle-${plan.name}`} defaultChecked />
                           </div>
                           <div className="md:col-span-3">
                                <Label className="text-xs text-muted-foreground">Base Price</Label>
                                <Input type="text" readOnly value={`$${plan.basePrice.toFixed(2)}`} className="bg-background/50 mt-1" />
                           </div>
                           <div className="md:col-span-3">
                               <Label htmlFor={`price-${plan.name}`} className="text-xs text-muted-foreground">Your Price</Label>
                                <Input id={`price-${plan.name}`} type="number" placeholder="Your Price" defaultValue={plan.basePrice} className="mt-1"/>
                           </div>
                           <div className="md:col-span-3">
                               <Label className="text-xs text-muted-foreground">Your Profit</Label>
                               <Input type="text" readOnly value={`$${(plan.basePrice * 0.2).toFixed(2)}`} className="bg-background/50 mt-1 text-green-500 font-semibold" />
                           </div>
                        </div>
                    ))}
                </div>
                 <div className="mt-6 flex justify-end">
                    <Button>Save Pricing</Button>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
