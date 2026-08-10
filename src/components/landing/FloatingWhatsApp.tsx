import { motion } from "motion/react";
import { WhatsAppIcon } from "./WhatsAppIcon";

const MESSAGE = "Olá! Vim pelo site e gostaria de saber mais sobre os serviços.";
const HREF = `https://wa.me/5521977072215?text=${encodeURIComponent(MESSAGE)}`;

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      className="fixed bottom-5 right-5 z-[190] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}
