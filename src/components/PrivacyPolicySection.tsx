import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; }

export default function PrivacyPolicySection({ goBack, previousLabel }: Props) {
  const lastUpdated = "21 June 2026";

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
            🔒 Legal
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">Privacy Policy</h2>
          <p className="text-slate-400">Last updated: {lastUpdated}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8 text-slate-300 text-sm leading-relaxed">

          <section className="bg-white/3 border border-white/10 rounded-xl p-4">
            <p className="text-slate-400 text-xs leading-relaxed">
              This Privacy Policy is issued by <strong className="text-white">Elysium Living FZ-LLC</strong>, registered in the Ras Al Khaimah Economic Zone, United Arab Emirates (Licence No. 5034743), operating as Cabin Crew Interview Guidebook.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">1. Introduction</h3>
            <p>Cabin Crew Interview Guidebook ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. We comply with applicable data protection laws, including UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection and, where applicable, the EU General Data Protection Regulation (GDPR).</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">2. Information We Collect</h3>
            <div className="space-y-4">
              <div>
                <p className="text-amber-400 font-semibold mb-2">Information you provide directly:</p>
                <ul className="list-none space-y-1 pl-4">
                  <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Name and email address when you register</li>
                  <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> CV content submitted for review (processed in real-time, not stored)</li>
                  <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Forum posts and questions you submit</li>
                  <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Payment information (processed entirely by our payment provider — we never see your card details)</li>
                </ul>
              </div>
              <div>
                <p className="text-amber-400 font-semibold mb-2">Information collected automatically:</p>
                <ul className="list-none space-y-1 pl-4">
                  <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Browser type and version</li>
                  <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Pages visited and time spent on the platform</li>
                  <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> General geographic location (country level only)</li>
                  <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Device type (mobile or desktop)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">3. How We Use Your Information</h3>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> To provide and improve the Service</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> To verify Premium membership and grant access to gated content</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> To display your forum posts to other Premium members</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> To analyse usage patterns and improve user experience</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> To communicate important updates about the Service</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">4. Technology Processing & Third Parties</h3>
            <p className="mb-3">Our interactive features are powered by third-party technology. When you use the Mock Interview or CV Review features:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Your input is transmitted to Anthropic's servers for processing</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Anthropic's Privacy Policy applies to this processing</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> We do not store your CV content or interview conversations on our servers</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Payment processing is handled by our payment provider. We receive only confirmation of successful payment and never access your card or banking details.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> User account data is stored securely in our database hosted in Ireland (EU).</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">5. Cookies</h3>
            <p className="mb-3">We use cookies and similar tracking technologies to enhance your experience. These include:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span><span><strong className="text-white">Essential cookies:</strong> Required for the platform to function (e.g., maintaining your login session)</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span><span><strong className="text-white">Analytics cookies:</strong> Help us understand how users interact with the platform (only with your consent)</span></li>
            </ul>
            <p className="mt-3">You can control cookie preferences through our cookie banner or your browser settings. Disabling essential cookies may affect platform functionality.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">6. Data Retention</h3>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Account data (name, email, membership tier) is retained while your account is active</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Forum posts are retained while your Premium membership is active and for 30 days after cancellation</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> CV content and interview sessions are not retained beyond your session</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Payment records are retained for 7 years for tax and legal compliance</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Analytics data is retained for 24 months</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">7. Your Rights</h3>
            <p className="mb-3">Regardless of your location, you have the following rights regarding your personal data:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Right to access the personal data we hold about you</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Right to correct inaccurate personal data</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Right to request deletion of your personal data</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Right to object to processing of your personal data</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Right to data portability</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us at <a href="mailto:support@cabincrewguidebook.com" className="text-amber-400 hover:underline">support@cabincrewguidebook.com</a>. We will respond within 30 days.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">8. EU Users & GDPR</h3>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
              <p className="text-blue-300 text-xs font-semibold mb-1">This section applies to users located in the European Economic Area (EEA), United Kingdom, or Switzerland.</p>
            </div>
            <p className="mb-3">If you are based in the EU, UK, or Switzerland, the General Data Protection Regulation (GDPR) applies to how we handle your data. In addition to the rights listed in Section 7, you also have:</p>
            <ul className="list-none space-y-2 pl-4 mb-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Right to restrict processing of your data</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Right to withdraw consent at any time (where processing is based on consent)</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Right to lodge a complaint with your local data protection supervisory authority</li>
            </ul>
            <p className="text-amber-400 font-semibold mb-2">Legal basis for processing your data:</p>
            <ul className="list-none space-y-2 pl-4 mb-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span><span><strong className="text-white">Contract:</strong> Processing your account data to provide the Service you signed up for</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span><span><strong className="text-white">Legitimate interests:</strong> Improving the platform and preventing fraud</span></li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span><span><strong className="text-white">Consent:</strong> Analytics cookies and any marketing communications</span></li>
            </ul>
            <p className="text-amber-400 font-semibold mb-2">International data transfers:</p>
            <p>Your data may be transferred to and processed in countries outside the EEA, including the United Arab Emirates (where our company is registered) and the United States (where Anthropic's servers are located for interactive feature processing). Our user database is hosted in Ireland (EU). We ensure appropriate safeguards are in place for any transfers outside the EEA.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">9. Data Security</h3>
            <p>We implement industry-standard security measures including HTTPS encryption, secure API key management, and access controls. However, no method of transmission over the internet is 100% secure. We encourage you not to share sensitive personal information unnecessarily on the platform.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">10. Children's Privacy</h3>
            <p>The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected information from a minor, please contact us immediately.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">11. Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Your continued use of the Service after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">12. Contact Us</h3>
            <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:support@cabincrewguidebook.com" className="text-amber-400 hover:underline">support@cabincrewguidebook.com</a>. We are committed to resolving any privacy concerns promptly.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
