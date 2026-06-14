import type { LucideIcon } from "lucide-react";
import { Clock, HelpCircle, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

export type ContactMethod = {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: string;
  href: string;
  color: string;
};

export type OfficeInfoItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export const MARKETING_CONTACT = {
  primaryEmail: "contact@hiringjourney.com",
  helloEmail: "hello@hiringjourney.com",
  supportEmail: "support@hiringjourney.com",
  partnersEmail: "partners@hiringjourney.com",
  mediaEmail: "media@hiringjourney.com",
  phoneDisplay: "+91-8660-158001",
  phoneTel: "+918660158001",
  location: "India (Remote First)",
  businessHours: "Mon - Fri, 9 AM - 6 PM IST",
} as const;

export const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    title: "General Inquiries",
    description: "For general questions and information",
    contact: MARKETING_CONTACT.primaryEmail,
    href: `mailto:${MARKETING_CONTACT.primaryEmail}`,
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: HelpCircle,
    title: "Support",
    description: "Technical support and assistance",
    contact: MARKETING_CONTACT.supportEmail,
    href: `mailto:${MARKETING_CONTACT.supportEmail}`,
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageSquare,
    title: "Partnerships",
    description: "Business partnerships and collaborations",
    contact: MARKETING_CONTACT.partnersEmail,
    href: `mailto:${MARKETING_CONTACT.partnersEmail}`,
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Mail,
    title: "Media",
    description: "Press inquiries and media requests",
    contact: MARKETING_CONTACT.mediaEmail,
    href: `mailto:${MARKETING_CONTACT.mediaEmail}`,
    color: "from-orange-500 to-red-500",
  },
];

export const OFFICE_INFO: OfficeInfoItem[] = [
  { icon: MapPin, label: "Location", value: MARKETING_CONTACT.location },
  { icon: Clock, label: "Business Hours", value: MARKETING_CONTACT.businessHours },
  { icon: Phone, label: "Phone", value: MARKETING_CONTACT.phoneDisplay },
];
