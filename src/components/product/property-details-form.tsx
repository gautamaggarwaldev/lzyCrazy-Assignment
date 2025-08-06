
"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Camera, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '../ui/badge';

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
const carParkingOptions = ['0', '1', '2', '3', '3+'];
const facingOptions = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];


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
    carParking: '',
    facing: '',
    projectName: '',
    adTitle: '',
    description: '',
    price: '',
    photos: [] as string[],
    coverPhotoIndex: 0,
  });

  const draggedItemIndex = useRef<number | null>(null);
  const draggedOverItemIndex = useRef<number | null>(null);

  const handleSelect = (field: keyof typeof details, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleChange = (field: keyof typeof details, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (rawValue) {
        const numberValue = parseInt(rawValue, 10);
        const formattedValue = numberValue.toLocaleString('en-IN');
        setDetails(prev => ({ ...prev, price: formattedValue }));
    } else {
        setDetails(prev => ({ ...prev, price: '' }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPhotos = files.map(file => URL.createObjectURL(file));
      setDetails(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos].slice(0, 20)}));
    }
  };

  const setCoverPhoto = (index: number) => {
    setDetails(prev => ({ ...prev, coverPhotoIndex: index }));
  };

  const handleDragSort = () => {
    if (draggedItemIndex.current === null || draggedOverItemIndex.current === null) return;
    
    setDetails(prev => {
        const newPhotos = [...prev.photos];
        const draggedItem = newPhotos.splice(draggedItemIndex.current!, 1)[0];
        newPhotos.splice(draggedOverItemIndex.current!, 0, draggedItem);

        let newCoverIndex = prev.coverPhotoIndex;
        const originalCoverUrl = prev.photos[prev.coverPhotoIndex];

        if (draggedItemIndex.current === prev.coverPhotoIndex) {
            newCoverIndex = draggedOverItemIndex.current!;
        } else {
            const newIndexForOriginalCover = newPhotos.findIndex(p => p === originalCoverUrl);
            if(newIndexForOriginalCover !== -1) {
                newCoverIndex = newIndexForOriginalCover;
            }
        }
        
        draggedItemIndex.current = null;
        draggedOverItemIndex.current = null;

        return { ...prev, photos: newPhotos, coverPhotoIndex: newCoverIndex };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const unformattedPrice = details.price.replace(/,/g, '');
    onSubmit({...details, price: unformattedPrice });
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
            
            <div className="space-y-3">
              <label className="font-semibold text-sm">Car Parking</label>
              <div className="flex flex-wrap gap-2">
                {carParkingOptions.map(c => (
                  <Button key={c} type="button" variant={details.carParking === c ? 'default' : 'outline'} onClick={() => handleSelect('carParking', c)}>{c}</Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="facing">Facing</label>
               <Select onValueChange={(value) => handleSelect('facing', value)} value={details.facing}>
                <SelectTrigger id="facing">
                  <SelectValue placeholder="Select Facing" />
                </SelectTrigger>
                <SelectContent>
                  {facingOptions.map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="projectName">Project Name</label>
              <Input id="projectName" value={details.projectName} onChange={(e) => handleChange('projectName', e.target.value)} maxLength={70} />
               <p className="text-xs text-muted-foreground text-right">{details.projectName.length} / 70</p>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="adTitle">Ad title *</label>
              <Input id="adTitle" value={details.adTitle} onChange={(e) => handleChange('adTitle', e.target.value)} required maxLength={70} />
              <p className="text-xs text-muted-foreground">Mention the key features of your item (e.g. brand, model, age, type)</p>
              <p className="text-xs text-muted-foreground text-right">{details.adTitle.length} / 70</p>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="description">Description *</label>
              <Textarea id="description" value={details.description} onChange={(e) => handleChange('description', e.target.value)} required maxLength={4096} rows={6} />
               <p className="text-xs text-muted-foreground">Include condition, features, and reason for selling</p>
               <p className="text-xs text-muted-foreground text-right">{details.description.length} / 4096</p>
            </div>
            
            <div className="border-t pt-8 space-y-8">
                <div className="space-y-3">
                  <h2 className="text-lg font-bold">SET A PRICE</h2>
                  <label className="font-semibold text-sm" htmlFor="price">Price *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                    <Input id="price" type="text" value={details.price} onChange={handlePriceChange} required className="pl-8" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-bold">UPLOAD UP TO 20 PHOTOS</h2>
                   <p className="text-sm text-muted-foreground">Drag and drop to reorder photos. The first photo is the main cover image.</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    <label htmlFor="photo-upload" className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted">
                        <Camera className="w-8 h-8 mb-2" />
                        <span className="text-sm text-center">Add Photo</span>
                    </label>
                    <input id="photo-upload" type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    
                    {details.photos.map((photo, index) => (
                      <div 
                        key={photo} 
                        className="aspect-square border rounded-lg overflow-hidden relative group cursor-grab"
                        draggable
                        onDragStart={() => (draggedItemIndex.current = index)}
                        onDragEnter={() => (draggedOverItemIndex.current = index)}
                        onDragEnd={handleDragSort}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <img src={photo} alt={`upload preview ${index}`} className="w-full h-full object-cover" />
                         <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <GripVertical className="text-white bg-black/30 rounded-full p-1 h-6 w-6" />
                        </div>
                        {details.coverPhotoIndex === index ? (
                            <Badge variant="default" className="absolute bottom-1 left-1">Cover</Badge>
                        ) : (
                            <Button 
                                size="sm" 
                                variant="secondary"
                                className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => setCoverPhoto(index)}
                            >
                                Set Cover
                            </Button>
                        )}
                      </div>
                    ))}
                    
                    {Array.from({ length: Math.max(0, 19 - details.photos.length) }).map((_, index) => (
                       <div key={index} className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50">
                          <Camera className="w-8 h-8 text-muted-foreground/50" />
                       </div>
                    ))}

                  </div>
                </div>
            </div>

            <Button type="submit" size="lg" disabled={!details.type || !details.superBuiltupArea || !details.carpetArea || !details.adTitle || !details.description || !details.price}>Next</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
