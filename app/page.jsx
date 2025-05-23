import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURES, STEPS, TESTIMONIALS } from "@/lib/landing";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col pt-16">
      <section className="mt-20 pb-12 space-y-10 md:space-y-20 px-5">
        <div className="container mx-auto px-6 md:px-6 text-center">
          <Badge variant={"outline"} className={"text-teal-600 bg-teal-100"}>
            Smart Splits, Simple Settles
          </Badge>
          <h1 className="gradient-title mx-auto max-w-4xl text-4xl font-bold md:text-7xl my-6">
            Effortlessly track, split, and settle with friends.
          </h1>
          <p className="mx-auto my-6 max-w-[700px] text-grey-500 md:text-xl/relaxed">
            Splitzy makes splitting expenses simple, organized, and fair. Enjoy
            hassle-free tracking, clear summaries, and settle up with friends in
            seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size={"lg"}
              className={"bg-teal-500 hover:bg-teal-600"}
            >
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant={"outline"}
              asChild
              size={"lg"}
              className={"border-teal-500 text-teal-500 hover:bg-teal-100"}
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>
        <div className="container mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl">
          <div className="gradient p-1 aspect-[16/9]">
            <Image
              src={"/hero.png"}
              width={1280}
              height={720}
              alt="Banner"
              className="rounded-lg mx-auto"
              priority
            ></Image>
          </div>
        </div>
      </section>
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 md:px-6 text-center">
          <Badge variant={"outline"} className={"text-teal-600 bg-teal-100"}>
            Features
          </Badge>
          <h1 className="gradient-title mt-4 text-3xl md:text-4xl">
            Complete Solution for Splitting Expenses
          </h1>
          <p className="mx-auto my-6 max-w-[700px] text-grey-500 md:text-xl/relaxed">
            Easily track and split expenses for roommates, trips, or events.
            Keep everyone updated and avoid confusion with a simple, transparent
            way to manage shared costs.
          </p>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ title, bg, color, Icon, description }) => (
              <Card
                key={title}
                className={
                  "flex flex-col items-center space-y-4 p-6 text-center"
                }
              >
                <div className={`rounded-full p-3 ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`}></Icon>
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6 md:px-6 text-center">
          <Badge variant={"outline"} className={"text-teal-700 bg-teal-100"}>
            How It Works
          </Badge>
          <h1 className="gradient-title mt-4 text-3xl md:text-4xl">
            Simple Steps to Smarter Splitting
          </h1>
          <p className="mx-auto my-6 max-w-[700px] text-grey-500 md:text-xl/relaxed">
            Here’s a quick look at how you can start managing group
            expenses—making it easy to stay organized, keep things fair, and
            settle up without the hassle.
          </p>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
            {STEPS.map(({ title, label, description }) => (
              <Card
                key={title}
                className={
                  "flex flex-col items-center space-y-4 p-6 text-center"
                }
              >
                <div
                  className={
                    "flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-500"
                  }
                >
                  {label}
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className=" bg-gray-50 py-20">
        <div className="container mx-auto px-6 md:px-6 text-center">
          <Badge variant={"outline"} className={"text-teal-700 bg-teal-100"}>
            Testimonals
          </Badge>
          <h1 className="gradient-title mt-4 text-3xl md:text-4xl">
            What Our Users Say
          </h1>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(({ image, name, quote, role }) => (
              <Card key={name} className={"p-6"}>
                <CardContent className={"space-y-4 p-6"}>
                  <p className="text-gray-500">{quote}</p>
                </CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={`${image}`} alt={name}></AvatarImage>
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground">{role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 gradient">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white">
            Ready to Simplify Your Splitting?
          </h2>
          <p className="mx-auto max-w-[600px] text-teal-100 md:text-xl/relaxed">
            Joined thousands of users who are already enjoying the benefits of
            Splitzy. Sign up today and experience the difference!
          </p>
          <Button
              asChild
              size={"lg"}
              className={"bg-teal-700 hover:bg-teal-800"}
            >
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </div>
      </section>

      <footer className="border-t bg-gray-50 py-12 text-center text-sm text-muted-foreground">
        Made by Anshu Jha as a part of the BCA major project. All rights reserved.
      </footer>
    </div>
  );
}
