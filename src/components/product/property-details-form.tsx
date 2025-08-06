
"use client";

import { useState, useRef, useEffect } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from 'lucide-react';

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
const states = [ "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"];

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
    state: '',
    name: '',
    phone: '',
    profilePhoto: '',
  });
  
  const [floorErrors, setFloorErrors] = useState({
    totalFloors: '',
    floorNo: '',
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const draggedItemIndex = useRef<number | null>(null);
  const draggedOverItemIndex = useRef<number | null>(null);

  const handleSelect = (field: keyof typeof details, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === 'totalFloors' || id === 'floorNo') {
      const numValue = parseInt(value, 10);
      if (numValue > 200) {
        setFloorErrors(prev => ({...prev, [id]: 'Maximum 200 floors allowed.'}));
      } else {
        setFloorErrors(prev => ({...prev, [id]: ''}));
      }
    }

    setDetails(prev => ({ ...prev, [id]: value }));
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
  
  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setDetails(prev => ({...prev, profilePhoto: URL.createObjectURL(file)}));
      }
  }

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
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
                <ArrowLeft />
            </Button>
            <h1 className="text-2xl font-bold font-headline text-center flex-grow">POST YOUR AD</h1>
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
              <Input id="superBuiltupArea" value={details.superBuiltupArea} onChange={handleChange} required />
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="carpetArea">Carpet Area sqft *</label>
              <Input id="carpetArea" value={details.carpetArea} onChange={handleChange} required />
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="maintenance">Maintenance (Monthly)</label>
              <Input id="maintenance" value={details.maintenance} onChange={handleChange} />
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="totalFloors">Total Floors</label>
              <Input id="totalFloors" type="number" max="200" value={details.totalFloors} onChange={handleChange} />
              {floorErrors.totalFloors && <p className="text-sm text-destructive">{floorErrors.totalFloors}</p>}
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="floorNo">Floor No</label>
              <Input id="floorNo" type="number" max="200" value={details.floorNo} onChange={handleChange} />
              {floorErrors.floorNo && <p className="text-sm text-destructive">{floorErrors.floorNo}</p>}
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
              <Input id="projectName" value={details.projectName} onChange={handleChange} maxLength={70} />
               <p className="text-xs text-muted-foreground text-right">{details.projectName.length} / 70}</p>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="adTitle">Ad title *</label>
              <Input id="adTitle" value={details.adTitle} onChange={handleChange} required maxLength={70} />
              <p className="text-xs text-muted-foreground">Mention the key features of your item (e.g. brand, model, age, type)</p>
              <p className="text-xs text-muted-foreground text-right">{details.adTitle.length} / 70}</p>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-sm" htmlFor="description">Description *</label>
              <Textarea id="description" value={details.description} onChange={handleChange} required maxLength={4096} rows={6} />
               <p className="text-xs text-muted-foreground">Include condition, features, and reason for selling</p>
               <p className="text-xs text-muted-foreground text-right">{details.description.length} / 4096}</p>
            </div>
            
            <div className="border-t pt-8 space-y-8">
                <div className="space-y-3">
                  <h2 className="text-lg font-bold">SET A PRICE</h2>
                  <label className="font-semibold text-sm" htmlFor="price">Price *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">INR</span>
                    <Input id="price" type="text" value={details.price} onChange={handlePriceChange} required className="pl-12" />
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
                    
                    {Array.from({ length: Math.max(0, 5 - details.photos.length -1) }).map((_, index) => (
                       <div key={index} className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50">
                          <Camera className="w-8 h-8 text-muted-foreground/50" />
                       </div>
                    ))}

                  </div>
                </div>
            </div>

            <div className="border-t pt-8 space-y-8">
                <h2 className="text-lg font-bold">CONFIRM YOUR LOCATION</h2>
                <Tabs defaultValue="list" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="current">Current Location</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list">
                        <div className="space-y-3 pt-4">
                            <label className="font-semibold text-sm" htmlFor="state">State *</label>
                            <Select onValueChange={(value) => handleSelect('state', value)} value={details.state}>
                                <SelectTrigger id="state">
                                <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                                <SelectContent>
                                {states.map(s => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            {/* You might want to add city/locality dropdowns here that populate based on state */}
                        </div>
                    </TabsContent>
                    <TabsContent value="current">
                        <div className="pt-4 text-center text-muted-foreground">
                            <p>Using your current location...</p>
                            {/* Logic to get current location would go here */}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            
            <div className="border-t pt-8 space-y-8">
                 <h2 className="text-lg font-bold">REVIEW YOUR DETAILS</h2>
                 <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={details.profilePhoto} />
                            <AvatarFallback>
                                <User className="w-12 h-12" />
                            </AvatarFallback>
                        </Avatar>
                        <label htmlFor="profile-photo-upload" className="absolute bottom-0 right-0 bg-background rounded-full p-1 border cursor-pointer">
                            <Camera className="w-4 h-4" />
                        </label>
                        <input id="profile-photo-upload" type="file" accept="image/*" className="hidden" onChange={handleProfilePhotoUpload} />
                    </div>
                    <div className="space-y-3 w-full">
                        <label className="font-semibold text-sm" htmlFor="name">Name</label>
                        <Input id="name" value={details.name} onChange={handleChange} maxLength={30} />
                        <p className="text-xs text-muted-foreground text-right">{details.name.length} / 30}</p>
                    </div>
                 </div>
            </div>

            <div className="border-t pt-8 space-y-8">
                 <h2 className="text-lg font-bold">Let's verify your account</h2>
                 <p className="text-sm text-muted-foreground">We will send you a confirmation code by sms on the next step.</p>
                 <div className="space-y-3">
                    <label className="font-semibold text-sm" htmlFor="phone">Mobile Phone Number *</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">+91</span>
                        <Input id="phone" type="tel" value={details.phone} onChange={handleChange} required className="pl-10" />
                    </div>
                </div>
            </div>


            <Button type="submit" size="lg" disabled={!details.type || !details.superBuiltupArea || !details.carpetArea || !details.adTitle || !details.description || !details.price || !!floorErrors.totalFloors || !!floorErrors.floorNo}>Post now</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
