import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import FadeIn from '../components/FadeIn';
import { ArrowUpRight, Mail, Phone, Download, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setStatusMsg(null);

    try {
      const formData = new FormData(formRef.current);
      const senderName = String(formData.get('user_name') || '');
      const senderEmail = String(formData.get('user_email') || '');
      const message = String(formData.get('message') || '');

      await emailjs.send(
        'service_msth7bw',
        'template_c7prlr3',
        {
          user_name: senderName,
          from_name: senderName,
          name: senderName,
          user_email: senderEmail,
          from_email: senderEmail,
          reply_to: senderEmail,
          email: senderEmail,
          to_email: 'abdulrahmanlawal175@gmail.com',
          to_name: 'Abdulrahman Lawal',
          message,
        },
        { publicKey: '9Yoow2Np7Y7x1uQAI' }
      );
      setStatusMsg({ type: 'success', text: 'Message sent successfully!' });
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatusMsg({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  const links = [
    { name: 'GitHub', url: 'https://github.com/officiallblur' },
    { name: 'Funbox Movies', url: 'https://funbox-blue.vercel.app' },
  ];

  return (
    <footer
      id="contact"
      className="relative z-20 bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-12 pt-20 pb-12 border-t border-[#D7E2EA]/10"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        <FadeIn delay={0} y={30} className="w-full flex flex-col items-center text-center mb-14">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-medium px-4 py-1.5 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 mb-6">
            Get In Touch
          </span>
          <h2 className="hero-heading text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
            Contact Me
          </h2>
          <p className="text-[#D7E2EA]/70 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl">
            Have a project in mind or looking for a passionate Software Engineer for frontend or
            fullstack development? Reach out and let&apos;s build something incredible together.
          </p>
        </FadeIn>

        {/* Contact Grid: Direct Info + EmailJS Form */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 mb-20">
          {/* Left: Direct Contact Details */}
          <FadeIn
            delay={0.1}
            y={30}
            className="lg:col-span-2 flex flex-col justify-between rounded-[32px] border border-[#D7E2EA]/15 bg-[#121212] p-6 sm:p-8"
          >
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#D7E2EA] mb-2">
                  Abdulrahman Lawal
                </h3>
                <p className="text-xs sm:text-sm uppercase tracking-widest text-[#B600A8] font-medium">
                  Software Engineer • ICT Engineer
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-2">
                <a
                  href="mailto:abdulrahmanlawal175@gmail.com"
                  className="flex items-center gap-3.5 text-sm sm:text-base text-[#D7E2EA]/85 hover:text-white transition-colors break-all"
                >
                  <span className="p-3 rounded-full bg-[#D7E2EA]/10 text-[#D7E2EA]">
                    <Mail className="w-4 h-4" />
                  </span>
                  abdulrahmanlawal175@gmail.com
                </a>

                <a
                  href="tel:08082091715"
                  className="flex items-center gap-3.5 text-sm sm:text-base text-[#D7E2EA]/85 hover:text-white transition-colors"
                >
                  <span className="p-3 rounded-full bg-[#D7E2EA]/10 text-[#D7E2EA]">
                    <Phone className="w-4 h-4" />
                  </span>
                  08082091715
                </a>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#D7E2EA]/10">
              <a
                href="/Abdulrahman-Lawal-CV.pdf"
                download="Abdulrahman-Lawal-CV.pdf"
                className="w-full rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm py-3.5 px-6 inline-flex items-center justify-center gap-2 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Resume (PDF)
              </a>
            </div>
          </FadeIn>

          {/* Right: Live EmailJS Contact Form */}
          <FadeIn
            delay={0.2}
            y={30}
            className="lg:col-span-3 rounded-[32px] border border-[#D7E2EA]/15 bg-[#121212] p-6 sm:p-8"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className="w-full rounded-2xl bg-[#0C0C0C] border border-[#D7E2EA]/20 px-5 py-4 text-sm sm:text-base text-[#D7E2EA] placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8] transition-colors"
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                  className="w-full rounded-2xl bg-[#0C0C0C] border border-[#D7E2EA]/20 px-5 py-4 text-sm sm:text-base text-[#D7E2EA] placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8] transition-colors"
                />
              </div>
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                required
                className="w-full rounded-2xl bg-[#0C0C0C] border border-[#D7E2EA]/20 px-5 py-4 text-sm sm:text-base text-[#D7E2EA] placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                  className="rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm px-10 py-4 inline-flex items-center gap-2.5 cursor-pointer disabled:opacity-50 hover:scale-[1.02] transition-transform"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Sending...' : 'Send Message'}
                </button>

                {statusMsg && (
                  <div
                    className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium ${statusMsg.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                  >
                    {statusMsg.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {statusMsg.text}
                  </div>
                )}
              </div>
            </form>
          </FadeIn>
        </div>

        {/* Bottom Bar: Copyright & Portfolio Links */}
        <div className="w-full flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-[#D7E2EA]/10 text-xs sm:text-sm uppercase tracking-wider text-[#D7E2EA]/60 font-light">
          <div>
            &copy; {new Date().getFullYear()} Abdulrahman Lawal | All Rights Reserved
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D7E2EA] transition-colors inline-flex items-center gap-1"
              >
                {link.name}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
