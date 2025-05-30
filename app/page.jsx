import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURES, STEPS, TESTIMONIALS, FAQS, STATS } from "@/lib/landing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 pt-30">
      {/* HERO */}
      <section className="relative flex flex-col md:flex-row items-center py-10 px-8 md:px-20 gap-10 md:gap-0">
        <div className="w-full md:w-2/3 flex flex-col items-start z-10">
          <Badge variant="outline" className="text-teal-700 bg-teal-100 mb-4">
            Effortless Group Splitting
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
            Split Expenses. <br />
            <span className="text-teal-600">Stay Friends.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
            No more awkward reminders or messy spreadsheets. Splitzy keeps your
            group finances organized, fair, and stress-free.
          </p>
          <div className="flex gap-4">
            <Button
              asChild
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 shadow-lg"
            >
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
            >
              <Link href="#faq">FAQs</Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:flex w-1/3 justify-end">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-teal-100">
            <Image
              src="/hero.png"
              width={600}
              height={400}
              alt="Banner"
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-200/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <span className="text-3xl font-bold text-teal-700">
                {stat.value}
              </span>
              <span className="text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="py-20 bg-gradient-to-br from-white via-teal-50 to-white"
      >
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="text-teal-700 bg-teal-100 mb-3">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built for Real Life, Not Just Math
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Splitzy is packed with practical tools to keep your group finances
              simple and transparent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(({ title, bg, color, Icon, description }) => (
              <Card
                key={title}
                className="flex flex-col items-start gap-4 p-8 shadow hover:shadow-lg transition"
              >
                <div className={`rounded-lg p-3 ${bg}`}>
                  <Icon className={`h-7 w-7 ${color}`} />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <Badge variant="outline" className="text-teal-700 bg-teal-100 mb-3">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Three Steps to Zero Stress
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Create a group, add expenses, and settle up. That’s it!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map(({ title, label, description }) => (
              <Card
                key={title}
                className="flex flex-col items-center gap-4 p-8 bg-white/80 shadow-md border-0"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-teal-100 text-2xl font-bold text-teal-600 mb-2">
                  {label}
                </div>
                <h4 className="text-lg font-semibold">{title}</h4>
                <p className="text-gray-500 text-center">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section
        id="plans"
        className="py-20 bg-gradient-to-br from-teal-50 via-white to-teal-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-teal-700 bg-teal-100 mb-3">
              Plans
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Simple & Free for Everyone
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              All features are available to everyone at no cost. No payment or
              credit card required.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
            <Card className="flex-1 p-8 flex flex-col items-center border-2 border-teal-600 shadow-xl max-w-md mx-auto md:mx-0">
              <div className="mb-2 text-xl font-bold">Free</div>
              <ul className="mb-6 space-y-2 text-gray-700 text-center">
                <li>Unlimited groups</li>
                <li>Expense tracking</li>
                <li>Monthly AI Insights on E-mail</li>
                <li>Balance Reminders</li>
                <li>All features included</li>
              </ul>
              <Button
                size="lg"
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                <Link href="/dashboard">Start Now</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <Badge variant="outline" className="text-teal-700 bg-teal-100 mb-3">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Users Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TESTIMONIALS.map(({ image, name, quote, role }) => (
              <Card
                key={name}
                className="p-8 flex flex-col gap-6 shadow hover:shadow-lg transition"
              >
                <p className="text-gray-600 italic">"{quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <Avatar>
                    <AvatarImage src={image} alt={name} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{name}</div>
                    <div className="text-xs text-gray-400">{role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section
        id="faq"
        className="py-20 bg-gradient-to-br from-white via-teal-50 to-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-teal-700 bg-teal-100 mb-3">
              FAQs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" defaultValue="item-0" collapsible>
              {FAQS.map((faq, idx) => (
                <AccordionItem key={faq.question} value={`item-${idx}`}>
                  <AccordionTrigger
                    className="
                text-lg md:text-xl font-semibold text-gray-800
                hover:text-teal-700
                data-[state=open]:text-teal-700
                transition-colors
                py-4
              "
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="
                bg-teal-50 rounded-md px-6 py-4
                text-base md:text-lg text-gray-700
                leading-relaxed
                mb-2
                border-l-4 border-teal-300
                shadow-sm
              "
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-teal-600 to-teal-400 text-white flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl px-10 py-14 flex flex-col items-center text-center md:mx-10">
          <Badge variant="outline" className="bg-teal-100 text-teal-700 mb-4">
            Final Step
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-teal-700">
            Ready to Simplify Your Splitting?
          </h2>
          <p className="mb-8 max-w-md text-lg text-teal-900">
            Join thousands of users who trust Splitzy for fair, easy, and fast
            group expense management.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-teal-600 text-white font-bold hover:bg-teal-700 shadow-lg"
          >
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-gray-50 py-8 text-center text-sm text-gray-400 px-10">
        Made by Anshu Jha as part of the BCA major project. All rights reserved.
      </footer>
    </div>
  );
}
