import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are all products at Rex-Pro Nutrition 100% authentic?',
      a: 'Yes, absolutely. We source all our products directly from brand-authorized importers and manufacturers. Every product tub/jar has a scratchable QR verification code that you can verify on the brand official website.'
    },
    {
      q: 'How long does shipping take to my city?',
      a: 'For orders within Gujarat (Surat, Ahmedabad, Vadodara, Kosamba), delivery usually takes 1-2 business days. For the rest of India, delivery takes 3-5 business days. Free shipping is provided on all orders above ₹999.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Cash on Delivery (COD) as well as all online payments via Razorpay — including UPI (GPay, PhonePe, Paytm), Credit Cards, Debit Cards, and Net Banking.'
    },
    {
      q: 'Can I get expert guidance on which supplement to choose?',
      a: 'Yes! You can contact us directly on WhatsApp (+91 9327708205) or visit our Kosamba store. Our fitness experts will evaluate your fitness goals and budget to suggest the ideal supplement stack.'
    },
    {
      q: 'What is your return policy?',
      a: 'We offer a 7-day return policy for sealed, unopened products in original packaging if received damaged or incorrect. Please inspect your package upon delivery.'
    },
    {
      q: 'Do you deliver across India?',
      a: 'Yes, we provide Pan-India delivery via reliable courier partners like BlueDart, Delhivery, and DTDC.'
    }
  ];

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div className="section-label">Help Center</div>
          <h1 className="heading-xl">FREQUENTLY ASKED QUESTIONS</h1>
          <p style={{ color: 'var(--gray-text)', fontSize: 16, marginTop: 'var(--space-md)' }}>
            Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, feel free to contact us.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: 'var(--black-card)',
                  border: '1px solid var(--gray-border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    padding: 'var(--space-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    color: isOpen ? 'var(--gold)' : 'var(--white)',
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <HelpCircle size={18} color="var(--gold)" />
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isOpen && (
                  <div style={{ padding: '0 var(--space-lg) var(--space-lg)', color: 'var(--white-muted)', fontSize: 14, lineHeight: 1.8 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
