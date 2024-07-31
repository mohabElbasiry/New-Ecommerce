import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import React from 'react'

export default function SliderImages() {

    return (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/3 aspect-square">
                <div className="p-1 relative aspect-square ">
                <Image src={"/girl.jpg"} alt={"Slider image"} className="aspect-square object-contain bg-slate-500 rounded-2xl" fill sizes='15vw' />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
  )
}
