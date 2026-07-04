import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; }

export default function TermsOfServiceSection({ goBack, previousLabel }: Props) {
  const lastUpdated = "27 June 2026";

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
            📄 Legal
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">Terms of Service</h2>
          <p className="text-slate-400">Last updated: {lastUpdated}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8 text-slate-300 text-sm leading-relaxed">

          <section className="bg-white/3 border border-white/10 rounded-xl p-4">
            <p className="text-slate-400 text-xs leading-relaxed">
              The Cabin Crew Interview Guidebook platform is operated by <strong className="text-white">Elysium Living FZ-LLC</strong>, a company registered in the Ras Al Khaimah Economic Zone, United Arab Emirates (Licence No. 5034743). References to "we," "us," or "our" in these Terms refer to Elysium Living FZ-LLC.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">1. Acceptance of Terms</h3>
            <p>By accessing or using the Cabin Crew Interview Guidebook platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service. These Terms apply to all visitors, users, and others who access or use the Service.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">2. Description of Service</h3>
            <p>The Cabin Crew Interview Guidebook is an educational platform providing preparation resources, AI-powered mock interviews, AI-powered CV review tools, and expert question submission access for individuals seeking cabin crew positions at Middle Eastern airlines. The Service includes both free and premium paid features across two paid membership tiers: Standard and Premium. Interactive features including the Mock Interview and CV Review are powered by artificial intelligence (Anthropic's Claude API).</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">3. User Eligibility</h3>
            <p>You must be at least 18 years of age to use this Service. By using the Service, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">4. Paid Membership & Payments</h3>
            <p className="mb-3">Certain features of the Service require a paid membership. We offer two paid tiers: <strong className="text-white">Standard ($15/month)</strong> and <strong className="text-white">Premium ($25/month)</strong>. By purchasing a membership, you agree to the following:</p>
            <ul className="list-none space-y-2 pl-4 mb-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Paid access is granted upon successful payment processing via our third-party payment provider, Stripe.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Payments are processed in USD. Applicable taxes may apply based on your jurisdiction.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Memberships are non-transferable and for personal use only.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Refunds are available within 24 hours of purchase if you have not yet accessed any paid features. After 24 hours, or after accessing paid content, all sales are final. See EU consumer rights below.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> You may cancel your subscription at any time via the Stripe customer portal or by contacting support@cabincrewguidebook.com. Cancellation can also be managed through your Account page. Cancellation takes effect at the end of the current billing period. Access continues until that date.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> We reserve the right to modify paid features with at least 30 days' notice to active members.</li>
            </ul>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-blue-300 text-xs font-semibold mb-2">EU Consumer Rights — Right of Withdrawal</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have a statutory 14-day right of withdrawal from the date of purchase. However, by completing payment and accessing paid content, you explicitly request immediate access to digital content and acknowledge that you thereby waive your right of withdrawal in accordance with Article 16(m) of the EU Consumer Rights Directive (2011/83/EU). If you have not yet accessed any paid content, you may request a full refund within 14 days by contacting <a href="mailto:support@cabincrewguidebook.com" className="text-amber-400 hover:underline">support@cabincrewguidebook.com</a>. This does not affect your other statutory consumer rights.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">5. Content Disclaimer</h3>
            <p className="mb-3">The Service provides educational and preparation content, including content generated by artificial intelligence. You acknowledge and agree that:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> All content is for educational and preparation purposes only and does not constitute professional career advice.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> We do not guarantee employment outcomes or interview success.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> The Mock Interview, CV Review, and Mock Exam feedback features are powered by artificial intelligence (Anthropic's Claude API). AI-generated responses may contain inaccuracies, outdated information, or errors. Always verify information directly with the relevant airline.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> The Service is not affiliated with, endorsed by, or officially connected to Emirates, Etihad Airways, Qatar Airways, flydubai, Air Arabia, or any other airline.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> All rejection analysis, recruitment process descriptions, and candidate experience content on this platform is based on publicly available candidate accounts and community reports, and does not represent confirmed policies, internal procedures, or official statements of any airline.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Interactive AI features depend on third-party services (Anthropic's API). In the event of third-party service interruption, modification, or discontinuation, certain features may become temporarily or permanently unavailable. We will endeavour to communicate any significant disruptions to paid members with reasonable notice.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">6. User Conduct</h3>
            <p className="mb-3">When using the Service, including the expert question submission feature, you agree not to:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Submit content that is offensive, discriminatory, harassing, or harmful to others.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Share your paid membership login credentials or provide access to unauthorised users.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Reproduce, distribute, or resell any content from the Service without written permission.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Submit spam, advertisements, or solicitations through any Service feature.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Impersonate airline recruiters, crew members, or other users.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Attempt to reverse-engineer, scrape, or systematically extract content from the Service.</li>
            </ul>
            <p className="mt-3">Violation of these standards may result in immediate termination of your membership without refund.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">7. Intellectual Property</h3>
            <p>All content on the Service, including text, graphics, guides, interview questions, and AI-generated materials produced within the Service, is the intellectual property of Elysium Living FZ-LLC, operating as Cabin Crew Interview Guidebook. You may not copy, reproduce, distribute, or create derivative works without our express written consent. Your personal CV content submitted for review remains your own property at all times.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">8. Privacy & Data</h3>
            <p>Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to the collection and use of your information as described in our Privacy Policy. CV content submitted for review is processed in real time via Anthropic's API and is not stored on our servers beyond the duration of your session.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">9. Disclaimers & Limitation of Liability</h3>
            <p className="mb-3">The Service is provided on an "as is" and "as available" basis without warranties of any kind. To the fullest extent permitted by applicable law:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Our total liability shall not exceed the amount you paid for your membership in the 12 months preceding the claim.</li>
            </ul>
            <p className="mt-3 text-slate-500 text-xs">Nothing in this clause limits your statutory rights as a consumer under applicable local law, including rights that cannot be excluded by contract.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">10. Governing Law & Jurisdiction</h3>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising under these Terms shall be subject to the jurisdiction of the courts of Ras Al Khaimah, UAE.</p>
            <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-blue-300 text-xs leading-relaxed">
                <strong>EU/UK Consumer Rights:</strong> If you are a consumer resident in the European Economic Area or United Kingdom, the above jurisdiction clause does not affect your right to bring proceedings in the courts of your country of residence, or to rely on any mandatory consumer protection laws applicable in your country. Nothing in these Terms is intended to limit your statutory rights.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">11. Changes to Terms</h3>
            <p>We reserve the right to modify these Terms at any time. We will notify active paid members of material changes at least 30 days in advance by email and by updating the "Last updated" date above. Your continued use of the Service after the effective date of changes constitutes acceptance of the new Terms. If you do not agree to material changes, you may cancel your subscription before they take effect.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">12. Contact</h3>
            <p>For questions about these Terms, cancellation requests, or refund enquiries, please contact us at <a href="mailto:support@cabincrewguidebook.com" className="text-amber-400 hover:underline">support@cabincrewguidebook.com</a>. We aim to respond within 2 business days.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
