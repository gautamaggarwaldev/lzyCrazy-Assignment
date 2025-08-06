
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Input } from '../ui/input';

interface PropertyDetailsFormProps {
  category: string;
  subcategory: string;
  onSubmit: (details: any) => void;
}

const propertyTypes = ['Flats / Apartments', 'Independent / Builder Floors', 'Farm House', 'House & Villa'];
const bhkOptions = ['1', '2', '3', '4', '4+'];
const bathroomOptions = ['1', '2', '3', '4', '4+'];
const furnishingOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
const projectStatusOptions = ['New Launch', 'Ready to Move', 'Under Construction'];
const listedByOptions = ['Builder', 'Dealer', 'Owner'];


export function PropertyDetailsForm({ category, subcategory, onSubmit }: PropertyDetailsFormProps) {
  const router = useRouter();
  const [details, setDetails] = useState({
    type: '',
    bhk: '',
    bathrooms: '',
    furnishing: '',
    projectStatus: '',
    listedBy: '',
    superBuiltupArea: '',
    carpetArea: '',
    maintenance: '',
    totalFloors: '',
    floorNo: '',
  });

  const handleSelect = (field: keyof typeof details, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleChange = (field: keyof typeof details, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        </Button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline">POST YOUR AD</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 pb-6 border-b">
            <h2 className="font-semibold text-sm text-muted-foreground mb-1">SELECTED CATEGORY</h2>
            <div className="flex justify-between items-center">
                <p>{category} / {subcategory}</p>
                <Link href="/sell" className="text-primary font-semibold text-sm hover:underline">Change</Link>
            </div>
          </div>

          <h2 className="text-lg font-bold mb-4">INCLUDE SOME DETAILS</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="font-semibold text-sm">Type *</label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map(type => (
                  <Button key={type} type="button" variant={details.type === type ? 'default' : 'outline'} onClick={() => handleSelect('type', type)}>{type}</Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm">BHK</label>
              <div className="flex flex-wrap gap-2">
                {bhkOptions.map(bhk => (
                  <Button key={bhk} type="button" variant={details.bhk === bhk ? 'default' : 'outline'} onClick={() => handleSelect('bhk', bhk)}>{bhk}</Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm">Bathrooms</label>
              <div className="flex flex-wrap gap-2">
                {bathroomOptions.map(b => (
                  <Button key={b} type="button" variant={details.bathrooms === b ? 'default' : 'outline'} onClick={() => handleSelect('bathrooms', b)}>{b}</Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm">Furnishing</label>
              <div className="flex flex-wrap gap-2">
                {furnishingOptions.map(f => (
                  <Button key={f} type="button" variant={details.furnishing === f ? 'default' : 'outline'} onClick={() => handleSelect('furnishing', f)}>{f}</Button>
                ))}
              </div>
            </div>

             <div className="space-y-3">
              <label className="font-semibold text-sm">Project Status</label>
              <div className="flex flex-wrap gap-2">
                {projectStatusOptions.map(status => (
                  <Button key={status} type="button" variant={details.projectStatus === status ? 'default' : 'outline'} onClick={() => handleSelect('projectStatus', status)}>{status}</Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm">Listed by</label>
              <div className="flex flex-wrap gap-2">
                {listedByOptions.map(l => (
                  <Button key={l} type="button" variant={details.listedBy === l ? 'default' : 'outline'} onClick={() => handleSelect('listedBy', l)}>{l}</Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="superBuiltupArea">Super Builtup area sqft *</label>
              <Input id="superBuiltupArea" value={details.superBuiltupArea} onChange={(e) => handleChange('superBuiltupArea', e.target.value)} required />
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="carpetArea">Carpet Area sqft *</label>
              <Input id="carpetArea" value={details.carpetArea} onChange={(e) => handleChange('carpetArea', e.target.value)} required />
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="maintenance">Maintenance (Monthly)</label>
              <Input id="maintenance" value={details.maintenance} onChange={(e) => handleChange('maintenance', e.target.value)} />
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="totalFloors">Total Floors</label>
              <Input id="totalFloors" value={details.totalFloors} onChange={(e) => handleChange('totalFloors', e.target.value)} />
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="floorNo">Floor No</label>
              <Input id="floorNo" value={details.floorNo} onChange={(e) => handleChange('floorNo', e.target.value)} />
            </div>
            
            <Button type="submit" size="lg" disabled={!details.type || !details.superBuiltupArea || !details.carpetArea}>Next</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
