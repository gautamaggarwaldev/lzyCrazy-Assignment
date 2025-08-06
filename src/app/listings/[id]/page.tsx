import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Mail, MapPin, User } from 'lucide-react';
import { FavoriteButton } from '@/components/product/favorite-button';

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative">
                      <Image
                        src={img}
                        alt={`${product.title} image ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHints[index % product.imageHints.length]}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-16" />
              <CarouselNext className="mr-16" />
            </Carousel>
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-3xl font-headline mb-4">{product.title}</CardTitle>
            <p className="text-3xl font-bold text-accent mb-4">${product.price.toLocaleString()}</p>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              {product.location}
            </div>
            <Separator className="my-6" />
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <CardDescription className="text-base leading-relaxed whitespace-pre-wrap">
              {product.description}
            </CardDescription>
            <Separator className="my-6" />
            <h3 className="text-xl font-semibold mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
                {product.keywords.map(keyword => (
                    <Badge key={keyword} variant="secondary">{keyword}</Badge>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 space-y-6">
         <Card>
            <CardHeader>
                <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <User className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="font-medium">{product.seller.name}</span>
                </div>
                 <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-muted-foreground" />
                    <a href={`mailto:${product.seller.contact}`} className="text-primary hover:underline">
                        Contact Seller
                    </a>
                </div>
            </CardContent>
        </Card>
        <FavoriteButton productId={product.id} />
      </div>
    </div>
  );
}
