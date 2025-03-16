"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white h-screen">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Anonymous Feedback = True Feedback
          </h1>
          <p className="m-3 md:mt-4 text-base md:text-lg">
            Here your identity remains secret.
          </p>
          <Link href="/dashboard">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant={"outline"}
            >
              Go to Dashboard
            </Button>
          </Link>
        </section>
        <Carousel
          plugins={[Autoplay({ delay: 1400 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                      <Mail className="flex-shrink-0" />
                      <div>
                        <p>{message.content}</p>
                        <p className="text-xs text-muted-foreground">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-800" />
          <CarouselNext className="bg-gray-800" />
        </Carousel>
      </main>
    </>
  );
}

export default page;
