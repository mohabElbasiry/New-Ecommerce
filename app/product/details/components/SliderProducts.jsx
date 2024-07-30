import ProductCard from '@/components/GlobalUi/ProductCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'

export default function SliderProducts() {
  return (
    <Carousel
    opts={{
      align: "start",
    }}
    className="w-full "
  >
    <CarouselContent>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
        <ProductCard />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>

  )
}
